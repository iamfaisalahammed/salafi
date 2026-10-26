// Pure helpers for the Qibla Finder. No DOM / React access except getScreenAngle().

// Kaaba, Masjid al-Haram, Makkah (WGS84, decimal degrees)
export const KAABA = {
  latitude: 21.4225241,
  longitude: 39.8261818,
};

export const EARTH_RADIUS_KM = 6371.0088;
export const NEAR_KAABA_KM = 0.1;
export const ALIGNMENT_TOLERANCE_DEG = 5;
export const MAX_IOS_COMPASS_ACCURACY_DEG = 30;

// Below this, the screen is facing too far downward to read a compass.
const MIN_SCREEN_UP_COMPONENT = -0.5;
// Vertical component of the screen's "up" axis: below LOW the phone counts as
// held flat, above HIGH as held upright; in between the two are blended.
const FLAT_LIMIT = 0.6;
const UPRIGHT_LIMIT = 0.85;
const MIN_HORIZONTAL = 0.2;

export const toRadians = (degree) => (degree * Math.PI) / 180;
export const toDegrees = (radian) => (radian * 180) / Math.PI;
export const normalizeAngle = (angle) => ((angle % 360) + 360) % 360;

// Signed shortest rotation from `from` to `to`, in the range [-180, 180)
export const shortestAngleDelta = (from, to) =>
  ((normalizeAngle(to) - normalizeAngle(from) + 540) % 360) - 180;

// Moves `previous` (an unwrapped angle) toward `target` along the shortest path.
export const smoothAngle = (previous, target, factor = 0.3) =>
  previous + shortestAngleDelta(previous, target) * factor;

export const isValidCoordinate = (latitude, longitude) =>
  Number.isFinite(latitude) &&
  Number.isFinite(longitude) &&
  Math.abs(latitude) <= 90 &&
  Math.abs(longitude) <= 180;

// Great-circle distance (haversine), km
export const getDistanceKm = (latitude, longitude) => {
  const lat1 = toRadians(latitude);
  const lat2 = toRadians(KAABA.latitude);
  const dLat = lat2 - lat1;
  const dLon = toRadians(KAABA.longitude - longitude);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
};

// Initial great-circle bearing from the user to the Kaaba, degrees clockwise
// from TRUE north. Returns null when the direction is undefined or meaningless
// (invalid input, standing at the Kaaba, or at its exact antipode).
export const getQiblaBearing = (latitude, longitude) => {
  if (!isValidCoordinate(latitude, longitude)) return null;
  if (getDistanceKm(latitude, longitude) < NEAR_KAABA_KM) return null;

  const lat = toRadians(latitude);
  const kaabaLat = toRadians(KAABA.latitude);
  const dLon = toRadians(KAABA.longitude - longitude);

  const y = Math.sin(dLon);
  const x = Math.cos(lat) * Math.tan(kaabaLat) - Math.sin(lat) * Math.cos(dLon);

  if (Math.abs(x) < 1e-12 && Math.abs(y) < 1e-12) return null;

  return normalizeAngle(toDegrees(Math.atan2(y, x)));
};

export const calculateQibla = (latitude, longitude) => ({
  bearing: getQiblaBearing(latitude, longitude),
  distanceKm: isValidCoordinate(latitude, longitude)
    ? getDistanceKm(latitude, longitude)
    : null,
});

const DIRECTIONS = [
  "উত্তর",
  "উত্তর-পূর্ব",
  "পূর্ব",
  "দক্ষিণ-পূর্ব",
  "দক্ষিণ",
  "দক্ষিণ-পশ্চিম",
  "পশ্চিম",
  "উত্তর-পশ্চিম",
];

export const getDirection = (bearing) =>
  DIRECTIONS[Math.round(normalizeAngle(bearing) / 45) % 8];

// Angle of the screen (0, 90, 180, 270). Falls back to the legacy iOS API.
export const getScreenAngle = () => {
  if (typeof window === "undefined") return 0;

  const modern = window.screen?.orientation?.angle;
  if (typeof modern === "number") return normalizeAngle(modern);

  if (typeof window.orientation === "number") {
    return normalizeAngle(window.orientation);
  }

  return 0;
};

// Compass heading (degrees clockwise from north) of the direction the user is
// facing, from W3C alpha/beta/gamma. Uses the full rotation matrix, so there is
// no singularity when the phone lies flat, and it follows the screen rotation.
// Flat phone  -> azimuth of the top of the screen.
// Upright     -> azimuth of the back of the phone (where the user is facing).
// Returns { status: "ok" | "tilted", heading }.
export const computeEulerHeading = (alpha, beta, gamma, screenAngle = 0) => {
  const a = toRadians(alpha);
  const b = toRadians(beta);
  const g = toRadians(gamma);

  const cA = Math.cos(a);
  const sA = Math.sin(a);
  const cB = Math.cos(b);
  const sB = Math.sin(b);
  const cG = Math.cos(g);
  const sG = Math.sin(g);

  // Device axes expressed in the earth frame (x = east, y = north, z = up):
  // columns of R = Rz(alpha) * Rx(beta) * Ry(gamma).
  const m11 = cA * cG - sA * sB * sG;
  const m21 = sA * cG + cA * sB * sG;
  const m31 = -cB * sG;
  const m12 = -sA * cB;
  const m22 = cA * cB;
  const m32 = sB;
  const m13 = cA * sG + sA * sB * cG;
  const m23 = sA * sG - cA * sB * cG;
  const m33 = cB * cG;

  // Screen facing the ground: a compass reading is not meaningful.
  if (m33 < MIN_SCREEN_UP_COMPONENT) return { status: "tilted", heading: null };

  const quarter = Math.round(normalizeAngle(screenAngle) / 90) % 4;
  const [upEast, upNorth, upVertical] = [
    [m12, m22, m32], //   0: top of screen = device +y
    [m11, m21, m31], //  90: top of screen = device +x
    [-m12, -m22, -m32], // 180: top of screen = device -y
    [-m11, -m21, -m31], // 270: top of screen = device -x
  ][quarter];

  const backEast = -m13;
  const backNorth = -m23;

  const upMagnitude = Math.hypot(upEast, upNorth);
  const backMagnitude = Math.hypot(backEast, backNorth);

  const t = Math.min(
    1,
    Math.max(0, (upVertical - FLAT_LIMIT) / (UPRIGHT_LIMIT - FLAT_LIMIT))
  );

  if (
    (t < 1 && upMagnitude < MIN_HORIZONTAL) ||
    (t > 0 && backMagnitude < MIN_HORIZONTAL)
  ) {
    return { status: "tilted", heading: null };
  }

  let east = 0;
  let north = 0;

  if (t < 1) {
    east += ((1 - t) * upEast) / upMagnitude;
    north += ((1 - t) * upNorth) / upMagnitude;
  }
  if (t > 0) {
    east += (t * backEast) / backMagnitude;
    north += (t * backNorth) / backMagnitude;
  }

  if (Math.hypot(east, north) < 1e-6) return { status: "tilted", heading: null };

  return {
    status: "ok",
    heading: normalizeAngle(toDegrees(Math.atan2(east, north))),
  };
};

// Turns one deviceorientation / deviceorientationabsolute event into a result:
// { status, heading } where status is one of
//   "ok"           heading is valid
//   "tilted"       device pose does not allow a reading
//   "uncalibrated" iOS reports the compass as uncalibrated / too inaccurate
//   "no-absolute"  event carries angles that are NOT referenced to north
//   "no-data"      event has no usable numbers (e.g. desktop browsers)
export const readHeadingFromEvent = (event, screenAngle, isAbsoluteEventType) => {
  if (
    typeof event.webkitCompassHeading === "number" &&
    Number.isFinite(event.webkitCompassHeading)
  ) {
    const accuracy = event.webkitCompassAccuracy;

    if (
      typeof accuracy === "number" &&
      (accuracy < 0 || accuracy > MAX_IOS_COMPASS_ACCURACY_DEG)
    ) {
      return { status: "uncalibrated", heading: null };
    }

    return {
      status: "ok",
      heading: normalizeAngle(event.webkitCompassHeading + screenAngle),
    };
  }

  const { alpha, beta, gamma } = event;

  if (![alpha, beta, gamma].every((value) => Number.isFinite(value))) {
    return { status: "no-data", heading: null };
  }

  if (!isAbsoluteEventType && event.absolute !== true) {
    return { status: "no-absolute", heading: null };
  }

  return computeEulerHeading(alpha, beta, gamma, screenAngle);
};
