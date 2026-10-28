import { useEffect, useState } from "react";
import {
  FaGlobe,
  FaArrowUpRightFromSquare,
  FaBookOpen,
  FaBookQuran,
  FaMosque,
  FaKaaba,
  FaScroll,
  FaFeatherPointed,
  FaGraduationCap,
  FaUserGraduate,
  FaCirclePlay,
  FaYoutube,
  FaMobileScreenButton,
  FaHeadphones,
  FaScaleBalanced,
  FaHandsPraying,
  FaClock,
  FaPeopleGroup,
  FaNewspaper,
  FaMagnifyingGlass,
  FaCircleQuestion,
  FaCalendarDays,
  FaCompass,
  FaHandHoldingHeart,
  FaMoon,
  FaLanguage,
  FaChildren,
  FaPersonDress,
  FaBullhorn,
  FaBookOpenReader,
} from "react-icons/fa6";

// Order matters: specific rules first
const ICON_RULES = [
  // Your listed resources (exact names)
  { match: /audioquran|quranicaudio/i, icon: FaHeadphones },
  { match: /hisnul|হিসনুল/i, icon: FaHandsPraying },
  { match: /islamqa|islam qa/i, icon: FaCircleQuestion },
  { match: /islamhouse/i, icon: FaMosque },
  { match: /hadithbd/i, icon: FaBookOpenReader },
  { match: /ihadith|ihadis/i, icon: FaFeatherPointed },
  { match: /sunnah/i, icon: FaScroll },
  { match: /quran\.com/i, icon: FaBookQuran },

  // Audio / Video / App
  { match: /অডিও|audio|podcast|পডকাস্ট|শুনুন|listen|mp3/i, icon: FaHeadphones },
  { match: /youtube|ইউটিউব/i, icon: FaYoutube },
  { match: /ভিডিও|video|লেকচার|lecture|বক্তব্য|ওয়াজ|মাহফিল|খুতবা|khutbah/i, icon: FaCirclePlay },
  { match: /অ্যাপ|এপ|\bapp\b|android|\bios\b|মোবাইল|muslim pro/i, icon: FaMobileScreenButton },

  // Dua / Dhikr
  { match: /দোয়া|দুআ|\bdua\b|যিকির|জিকির|adhkar|dhikr|মাসনুন/i, icon: FaHandsPraying },

  // Q&A / Fatwa
  { match: /প্রশ্নোত্তর|প্রশ্ন|জিজ্ঞাসা|q&a|q & a|ফতোয়া|ফাতওয়া|fatwa|ifta/i, icon: FaCircleQuestion },
  { match: /fiqh|ফিকহ|ফিকাহ|মাসআলা|মাসায়েল/i, icon: FaScaleBalanced },

  // Tools
  { match: /সালাতের সময়|নামাজের সময়|সময়সূচি|prayer time|waqt|salah time/i, icon: FaClock },
  { match: /কিবলা|qibla|কম্পাস/i, icon: FaCompass },
  { match: /ক্যালেন্ডার|calendar|হিজরি|hijri/i, icon: FaCalendarDays },
  { match: /যাকাত|zakat|সদকা|sadaqah|donate|charity/i, icon: FaHandHoldingHeart },
  { match: /রমজান|রমযান|ramadan|ramadhan|সিয়াম|রোজা/i, icon: FaMoon },

  // Hadith / Seerah / Quran
  { match: /হাদিস|হাদীস|hadith|সুন্নাহ|bukhari|বুখারি|sahih muslim|তিরমিজি|আবু দাউদ/i, icon: FaScroll },
  { match: /সিরাত|সীরাত|সিরাহ|seerah|sirah|ইতিহাস|history/i, icon: FaKaaba },
  { match: /অনুবাদ|translation|ভাষা|language/i, icon: FaLanguage },
  { match: /কুরআন|কোরআন|quran|qur'an|tafsir|তাফসীর|তাফসির/i, icon: FaBookQuran },

  // Learning
  { match: /শিশু|কিডস|kids|children/i, icon: FaChildren },
  { match: /নারী|বোন|women|sisters/i, icon: FaPersonDress },
  { match: /আলেম|শাইখ|শায়খ|sheikh|shaykh|scholar/i, icon: FaUserGraduate },
  { match: /কোর্স|course|academy|একাডেমি|institute|ইনস্টিটিউট|university|বিশ্ববিদ্যালয়|মাদরাসা|madrasa|yaqeen|bayyinah/i, icon: FaGraduationCap },
  { match: /লাইব্রেরি|library|বই|ebook|e-book|pdf|কিতাব|kitab|book|শামেলা|shamela/i, icon: FaBookOpenReader },

  // Community / Others
  { match: /দাওয়াহ|দাওয়াত|dawah|da'wah/i, icon: FaBullhorn },
  { match: /কমিউনিটি|community|ফোরাম|forum/i, icon: FaPeopleGroup },
  { match: /মসজিদ|mosque|masjid|ইসলামিক সেন্টার|foundation|ফাউন্ডেশন/i, icon: FaMosque },
  { match: /খবর|সংবাদ|news|ব্লগ|blog|article|প্রবন্ধ/i, icon: FaNewspaper },
  { match: /অনুসন্ধান|search|খুঁজ/i, icon: FaMagnifyingGlass },
];

// Match by name first, then fall back to description
const getResourceIcon = (resource) => {
  const byName = ICON_RULES.find((rule) => rule.match.test(resource.name || ""));
  if (byName) return byName.icon;

  const byDescription = ICON_RULES.find((rule) =>
    rule.match.test(resource.description || "")
  );
  return byDescription ? byDescription.icon : FaGlobe;
};

const Resources = () => {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retry, setRetry] = useState(0);

  // Load resources
  useEffect(() => {
    const controller = new AbortController();

    const fetchResources = async () => {
      setLoading(true);
      setError(false);

      try {
        const response = await fetch("/data/resources.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load resources");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid resources data");
        }

        setResources(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchResources();

    return () => controller.abort();
  }, [retry]);

  return (
    <section
      id="resources"
      className="relative overflow-hidden bg-[#081b22] px-3 py-10 text-slate-100 sm:px-6 sm:py-14 lg:py-16"
    >
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-emerald-400/[0.06] blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <div className="mb-6 sm:mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-300/15 bg-emerald-400/[0.07] px-3 py-1.5 text-xs font-semibold text-emerald-300 sm:text-sm">
            <FaGlobe className="shrink-0" />
            <span style={{ fontFamily: "'Hind Siliguri', sans-serif" }}>
              ইসলামিক রিসোর্স ডিরেক্টরি
            </span>
          </div>

          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div className="min-w-0">
              <h2
                className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl lg:text-4xl"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                ইসলামিক ওয়েবসাইট
                <span className="text-[#d6aa62]"> ও রিসোর্স</span>
              </h2>

              <p
                className="mt-2 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                উপকারী ইসলামিক ওয়েবসাইট ও জ্ঞানচর্চার প্ল্যাটফর্ম
                এক জায়গায় খুঁজে নিন। আপনার প্রয়োজনীয় রিসোর্সে
                যেতে শুধু নামের ওপর ক্লিক করুন।
              </p>
            </div>

            {/* Resource Count */}
            {!loading && !error && resources.length > 0 && (
              <span
                className="w-fit shrink-0 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-300"
                style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
              >
                মোট{" "}
                <span className="font-bold text-[#d6aa62]">
                  {resources.length}
                </span>
                টি রিসোর্স
              </span>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-x-4 sm:gap-y-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="flex animate-pulse items-start gap-3 rounded-xl border border-white/[0.07] bg-[#10252d] p-3.5 sm:p-4"
              >
                <div className="h-7 w-7 shrink-0 rounded-md bg-white/[0.07]" />

                <div className="min-w-0 flex-1 space-y-2 pt-1">
                  <div className="h-4 w-2/5 rounded bg-white/[0.08]" />
                  <div className="h-3 w-full rounded bg-white/[0.05]" />
                  <div className="h-3 w-4/5 rounded bg-white/[0.05]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-300/15 bg-[#10252d] px-4 py-10 text-center sm:px-5">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-red-400/10 text-red-300">
              <FaBookOpen className="text-xl" />
            </div>

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              রিসোর্স লোড করা যায়নি
            </h3>

            <p
              className="mt-2 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।
            </p>

            <button
              type="button"
              onClick={() => setRetry((previous) => previous + 1)}
              className="mt-5 min-h-10 rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-[#081b22] transition-colors hover:bg-emerald-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && resources.length === 0 && (
          <div className="rounded-2xl border border-white/[0.07] bg-[#10252d] px-4 py-10 text-center sm:px-5">
            <FaBookOpen className="mx-auto text-3xl text-slate-500" />

            <h3
              className="mt-4 font-semibold text-white"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              এখনো কোনো রিসোর্স নেই
            </h3>

            <p
              className="mt-2 text-sm leading-6 text-slate-400"
              style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
            >
              নতুন রিসোর্স যোগ হলে এখানে দেখতে পাবেন।
            </p>
          </div>
        )}

        {/* Resource List */}
        {!loading && !error && resources.length > 0 && (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {resources.map((resource, index) => {
              const ResourceIcon = getResourceIcon(resource);

              const content = (
                <>
                  {/* Resource Icon (icon only) */}
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-[#d6aa62] transition-transform duration-200 group-hover:scale-110 sm:h-9 sm:w-9">
                    <ResourceIcon className="text-2xl sm:text-[1.7rem]" />
                  </div>

                  {/* Resource Information */}
                  <div className="min-w-0 flex-1">
                    <h3
                      className="break-words text-sm font-semibold leading-6 text-slate-100 transition-colors group-hover:text-emerald-300 sm:text-base"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {resource.name}
                    </h3>

                    <p
                      className="mt-1 whitespace-pre-line break-words text-[13px] leading-6 text-slate-400 sm:text-sm sm:leading-7"
                      style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
                    >
                      {resource.description ||
                        "এই রিসোর্স সম্পর্কে জানুন।"}
                    </p>
                  </div>

                  {/* External Link */}
                  {resource.link && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition-colors group-hover:bg-emerald-400/10 group-hover:text-[#d6aa62]">
                      <FaArrowUpRightFromSquare className="text-xs" />
                    </div>
                  )}
                </>
              );

              const className =
                "group flex min-w-0 items-start gap-3 rounded-xl border border-white/[0.07] bg-[#10252d] p-3.5 transition-colors duration-200 hover:border-emerald-300/25 hover:bg-[#142d35] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400 sm:gap-4 sm:rounded-2xl sm:p-4";

              return resource.link ? (
                <a
                  key={resource.id ?? resource.link}
                  href={resource.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${resource.name} ওয়েবসাইট খুলুন`}
                  className={className}
                >
                  {content}
                </a>
              ) : (
                <div
                  key={resource.id ?? `${resource.name}-${index}`}
                  className={className}
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}

        {/* Footer Note */}
        {!loading && !error && resources.length > 0 && (
          <p
            className="mt-5 flex items-start gap-2 border-t border-white/[0.08] pt-4 text-xs leading-6 text-slate-400 sm:mt-6"
            style={{ fontFamily: "'Hind Siliguri', sans-serif" }}
          >
            <FaGlobe className="mt-1 shrink-0 text-emerald-300" />

            <span>
              বাইরের ওয়েবসাইটে যেতে রিসোর্সের নামের ওপর ক্লিক করুন।
            </span>
          </p>
        )}
      </div>
    </section>
  );
};

export default Resources;