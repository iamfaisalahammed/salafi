import { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaDownload,
  FaMagnifyingGlass,
  FaArrowUpRightFromSquare,
  FaHeart,
  FaRegHeart,
  FaXmark,
  FaTableCellsLarge,
  FaList,
} from "react-icons/fa6";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };
const FAV_KEY = "hikmah-favorite-books";
const ALL = "সব";
const FAV = "প্রিয়";

// Google Drive লিংক থেকে ফাইল আইডি বের করার ফাংশন
const getDriveFileId = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") return null;

  const value = fileUrl.trim();

  if (/^[a-zA-Z0-9_-]{20,}$/.test(value)) return value;

  try {
    const url = new URL(value);

    if (
      url.hostname !== "drive.google.com" &&
      url.hostname !== "docs.google.com"
    ) {
      return null;
    }

    const fileId =
      url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
      url.pathname.match(/\/document\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
      url.pathname.match(/\/spreadsheets\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
      url.pathname.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/)?.[1] ||
      url.searchParams.get("id");

    return fileId && /^[a-zA-Z0-9_-]+$/.test(fileId) ? fileId : null;
  } catch {
    return null;
  }
};

const getPreviewUrl = (fileId) =>
  `https://drive.google.com/file/d/${fileId}/preview`;

const getDownloadUrl = (fileId) =>
  `https://drive.google.com/uc?export=download&id=${fileId}`;

// localStorage থেকে প্রিয় বইয়ের তালিকা পড়া
const loadFavorites = () => {
  try {
    const saved = JSON.parse(localStorage.getItem(FAV_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
};

const ExploreLibrary = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(ALL);
  const [sortBy, setSortBy] = useState("default");
  const [view, setView] = useState("grid");
  const [favorites, setFavorites] = useState(loadFavorites);
  const [reading, setReading] = useState(null); // মডালে খোলা বই
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // বই লোড
  useEffect(() => {
    const controller = new AbortController();

    const loadBooks = async () => {
      try {
        const response = await fetch("/data/books.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("বইয়ের তথ্য লোড করা যায়নি");
        }

        const data = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("বইয়ের JSON ফরম্যাট সঠিক নয়");
        }

        setBooks(data);
        setError(false);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Books loading error:", err);
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    loadBooks();

    return () => controller.abort();
  }, []);

  // প্রিয় বই সেভ
  useEffect(() => {
    try {
      localStorage.setItem(FAV_KEY, JSON.stringify(favorites));
    } catch {
      // localStorage বন্ধ থাকলে কিছু করার নেই
    }
  }, [favorites]);

  // মডাল খোলা থাকলে Esc দিয়ে বন্ধ + স্ক্রল লক
  useEffect(() => {
    if (!reading) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setReading(null);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [reading]);

  // প্রতিটি বইয়ে key ও fileId যোগ করা
  const normalizedBooks = useMemo(
    () =>
      books.map((book, index) => ({
        ...book,
        _key: String(book.id ?? book.fileId ?? `${book.title}-${index}`),
        _fileId: getDriveFileId(book.fileId),
      })),
    [books]
  );

  // ক্যাটাগরি ও প্রতিটির সংখ্যা
  const categories = useMemo(() => {
    const counts = {};
    normalizedBooks.forEach((book) => {
      const name = book.category || "অন্যান্য";
      counts[name] = (counts[name] || 0) + 1;
    });
    return Object.entries(counts);
  }, [normalizedBooks]);

  const filteredBooks = useMemo(() => {
    const searchTerm = search.trim().toLocaleLowerCase();

    const result = normalizedBooks.filter((book) => {
      const title = (book.title || "").toLocaleLowerCase();
      const author = (book.author || "").toLocaleLowerCase();
      const bookCategory = book.category || "অন্যান্য";

      const matchesSearch =
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        bookCategory.toLocaleLowerCase().includes(searchTerm);

      const matchesCategory =
        category === ALL
          ? true
          : category === FAV
          ? favorites.includes(book._key)
          : bookCategory === category;

      return matchesSearch && matchesCategory;
    });

    if (sortBy === "title") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || "", "bn"));
    } else if (sortBy === "author") {
      result.sort((a, b) =>
        (a.author || "").localeCompare(b.author || "", "bn")
      );
    }

    return result;
  }, [normalizedBooks, search, category, sortBy, favorites]);

  const toggleFavorite = (key) => {
    setFavorites((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setCategory(ALL);
  };

  const isList = view === "list";

  // ক্যাটাগরি চিপের স্টাইল
  const chipClass = (active) =>
    `shrink-0 rounded-full border px-4 py-1.5 text-sm transition focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]/40 ${
      active
        ? "border-[#dfbd7b] bg-[#dfbd7b] font-semibold text-[#081b22]"
        : "border-slate-700 bg-[#10252d] text-slate-300 hover:border-[#dfbd7b]/50 hover:text-[#dfbd7b]"
    }`;

  return (
    <section
      className="min-h-screen bg-[#081b22] px-4 py-8 text-slate-100 sm:px-6 sm:py-10 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 p-3.5 text-[#dfbd7b]">
            <FaBookOpen className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামিক বইয়ের লাইব্রেরি
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            কুরআন, হাদিস, তাফসির ও ইসলামিক জ্ঞানের বই পড়ুন এবং PDF সংগ্রহ
            করুন।
          </p>

          {!loading && !error && (
            <p className="mt-4 text-sm text-[#dfbd7b]" aria-live="polite">
              মোট {filteredBooks.length}টি বই পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mx-auto mb-5 max-w-2xl">
          <label htmlFor="book-search" className="sr-only">
            বই খুঁজুন
          </label>

          <div className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#10252d] px-4 py-3.5 shadow-lg shadow-black/10 transition focus-within:border-[#dfbd7b] focus-within:ring-2 focus-within:ring-[#dfbd7b]/20">
            <FaMagnifyingGlass
              className="shrink-0 text-slate-500"
              aria-hidden="true"
            />

            <input
              id="book-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
              className="w-full bg-transparent text-sm text-white outline-none placeholder:text-slate-500"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="shrink-0 text-xs text-slate-400 transition hover:text-[#dfbd7b]"
                aria-label="সার্চ মুছুন"
              >
                মুছুন
              </button>
            )}
          </div>
        </div>

        {/* Category chips */}
        {!loading && !error && (
          <div className="mb-5 flex gap-2 overflow-x-auto pb-2">
            <button
              type="button"
              onClick={() => setCategory(ALL)}
              className={chipClass(category === ALL)}
            >
              সব ({normalizedBooks.length})
            </button>

            <button
              type="button"
              onClick={() => setCategory(FAV)}
              className={chipClass(category === FAV)}
            >
              ♥ প্রিয় ({favorites.length})
            </button>

            {categories.map(([name, count]) => (
              <button
                key={name}
                type="button"
                onClick={() => setCategory(name)}
                className={chipClass(category === name)}
              >
                {name} ({count})
              </button>
            ))}
          </div>
        )}

        {/* Sort + View toggle */}
        {!loading && !error && (
          <div className="mb-6 flex items-center justify-between gap-3">
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              aria-label="সাজানোর ধরন"
              className="rounded-xl border border-slate-700 bg-[#10252d] px-3 py-2 text-sm text-slate-200 outline-none transition focus:border-[#dfbd7b]"
            >
              <option value="default">ডিফল্ট ক্রম</option>
              <option value="title">নাম অনুযায়ী</option>
              <option value="author">লেখক অনুযায়ী</option>
            </select>

            <div className="flex rounded-xl border border-slate-700 bg-[#10252d] p-1">
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-label="গ্রিড ভিউ"
                className={`rounded-lg px-3 py-1.5 transition ${
                  !isList
                    ? "bg-[#dfbd7b] text-[#081b22]"
                    : "text-slate-400 hover:text-[#dfbd7b]"
                }`}
              >
                <FaTableCellsLarge />
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-label="লিস্ট ভিউ"
                className={`rounded-lg px-3 py-1.5 transition ${
                  isList
                    ? "bg-[#dfbd7b] text-[#081b22]"
                    : "text-slate-400 hover:text-[#dfbd7b]"
                }`}
              >
                <FaList />
              </button>
            </div>
          </div>
        )}

        {/* Loading skeleton */}
        {loading ? (
          <div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            role="status"
            aria-label="বইয়ের তালিকা লোড হচ্ছে"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse rounded-2xl border border-slate-700/60 bg-[#10252d] p-4"
              >
                <div className="mb-4 h-36 rounded-xl bg-[#0b2027]" />
                <div className="mb-3 h-4 w-1/3 rounded bg-[#0b2027]" />
                <div className="mb-2 h-5 w-4/5 rounded bg-[#0b2027]" />
                <div className="h-4 w-1/2 rounded bg-[#0b2027]" />
              </div>
            ))}
          </div>
        ) : error ? (
          /* Error */
          <div className="rounded-2xl border border-red-400/20 bg-[#10252d] px-4 py-12 text-center">
            <FaBookOpen className="mx-auto mb-4 text-4xl text-red-400" />

            <h2 className="text-lg font-semibold text-white">
              বই লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              public/data/books.json ফাইলের অবস্থান ও JSON ফরম্যাট পরীক্ষা করুন।
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-5 rounded-lg bg-[#dfbd7b] px-4 py-2 text-sm font-semibold text-[#081b22] transition hover:bg-[#e8cd96] focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : filteredBooks.length > 0 ? (
          /* Book List */
                   /* Book List */
          <div
            className={
              isList
                ? "flex flex-col gap-2.5"
                : "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }
          >
            {filteredBooks.map((book, index) => {
              const fileId = book._fileId;
              const isFav = favorites.includes(book._key);
              const firstLetter = (book.title || "?").trim().charAt(0);

              /* ---------- লিস্ট ভিউ: কমপ্যাক্ট সিরিয়াল রো ---------- */
              if (isList) {
                return (
                  <article
                    key={book._key}
                    className="flex items-center gap-3 rounded-xl border border-slate-700/80 bg-[#10252d] p-2.5 transition duration-200 hover:border-[#dfbd7b]/50 sm:gap-4 sm:p-3"
                  >
                    {/* সিরিয়াল নম্বর */}
                    <span className="w-6 shrink-0 text-center text-xs font-semibold text-[#dfbd7b]/70 sm:w-8 sm:text-sm">
                      {(index + 1).toLocaleString("bn-BD")}
                    </span>

                    {/* ছোট কভার */}
                    <div className="flex h-14 w-11 shrink-0 items-center justify-center rounded-lg border border-[#dfbd7b]/15 bg-gradient-to-br from-[#dfbd7b]/20 via-[#0b2027] to-[#0b2027] sm:h-16 sm:w-12">
                      <span className="text-xl font-bold text-[#dfbd7b]">
                        {firstLetter}
                      </span>
                    </div>

                    {/* নাম, লেখক, ক্যাটাগরি */}
                    <div className="min-w-0 flex-1">
                      <h2 className="line-clamp-2 text-sm font-semibold leading-5 text-white sm:text-base">
                        {book.title || "নামহীন বই"}
                      </h2>
                      <p className="mt-0.5 truncate text-xs text-slate-400">
                        {book.author || "লেখকের নাম উল্লেখ নেই"}
                      </p>
                      <span className="mt-1 inline-block max-w-full truncate rounded-full bg-[#dfbd7b]/10 px-2 py-0.5 text-[10px] text-[#dfbd7b]">
                        {book.category || "অন্যান্য"}
                      </span>
                    </div>

                    {/* আইকন অ্যাকশন */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => toggleFavorite(book._key)}
                        aria-label={isFav ? "প্রিয় থেকে সরান" : "প্রিয়তে যোগ করুন"}
                        aria-pressed={isFav}
                        className="rounded-lg p-2 text-sm text-[#dfbd7b] transition hover:bg-[#dfbd7b]/10 focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                      >
                        {isFav ? <FaHeart /> : <FaRegHeart />}
                      </button>

                      {fileId ? (
                        <>
                          <a
                            href={getDownloadUrl(fileId)}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="ডাউনলোড"
                            className="rounded-lg border border-slate-600 p-2 text-sm text-slate-300 transition hover:border-[#dfbd7b]/60 hover:text-[#dfbd7b] focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                          >
                            <FaDownload />
                          </a>

                          <button
                            type="button"
                            onClick={() => setReading(book)}
                            aria-label="পড়ুন"
                            className="rounded-lg bg-[#dfbd7b] p-2 text-sm text-[#081b22] transition hover:bg-[#e8cd96] focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                          >
                            <FaBookOpen />
                          </button>
                        </>
                      ) : (
                        <span className="px-1 text-[10px] text-slate-500">
                          PDF নেই
                        </span>
                      )}
                    </div>
                  </article>
                );
              }

              /* ---------- গ্রিড ভিউ: কার্ড ---------- */
              return (
                <article
                  key={book._key}
                  className="group relative flex flex-col rounded-2xl border border-slate-700/80 bg-[#10252d] p-4 transition duration-300 hover:-translate-y-0.5 hover:border-[#dfbd7b]/50 hover:shadow-xl hover:shadow-black/20 sm:p-5"
                >
                  <button
                    type="button"
                    onClick={() => toggleFavorite(book._key)}
                    aria-label={isFav ? "প্রিয় থেকে সরান" : "প্রিয়তে যোগ করুন"}
                    aria-pressed={isFav}
                    className="absolute right-3 top-3 z-10 rounded-full bg-[#081b22]/70 p-2 text-sm text-[#dfbd7b] backdrop-blur transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                  >
                    {isFav ? <FaHeart /> : <FaRegHeart />}
                  </button>

                  <div className="mb-4 flex h-36 items-center justify-center rounded-xl border border-[#dfbd7b]/15 bg-gradient-to-br from-[#dfbd7b]/20 via-[#0b2027] to-[#0b2027]">
                    <span className="text-6xl font-bold text-[#dfbd7b]">
                      {firstLetter}
                    </span>
                  </div>

                  <div className="flex-1">
                    <span className="inline-block rounded-full border border-[#dfbd7b]/20 bg-[#dfbd7b]/10 px-3 py-1 text-xs text-[#dfbd7b]">
                      {book.category || "অন্যান্য"}
                    </span>

                    <h2 className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg">
                      {book.title || "নামহীন বই"}
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-slate-400">
                      {book.author || "লেখকের নাম উল্লেখ নেই"}
                    </p>
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {fileId ? (
                      <>
                        <button
                          type="button"
                          onClick={() => setReading(book)}
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-[#dfbd7b] px-2 py-2.5 text-sm font-semibold text-[#081b22] transition hover:bg-[#e8cd96] focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                        >
                          <FaBookOpen aria-hidden="true" className="shrink-0" />
                          পড়ুন
                        </button>

                        <a
                          href={getDownloadUrl(fileId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-slate-600 px-2 py-2.5 text-sm font-medium text-slate-200 transition hover:border-[#dfbd7b]/60 hover:bg-[#dfbd7b]/5 hover:text-[#dfbd7b] focus:outline-none focus:ring-2 focus:ring-[#dfbd7b]"
                        >
                          <FaDownload aria-hidden="true" className="shrink-0" />
                          ডাউনলোড
                        </a>
                      </>
                    ) : (
                      <p className="col-span-2 rounded-lg bg-[#0b2027] px-3 py-2.5 text-center text-sm text-slate-500">
                        PDF লিংক পাওয়া যায়নি
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-slate-700 px-4 py-14 text-center">
            <FaBookOpen
              className="mx-auto mb-4 text-4xl text-slate-600"
              aria-hidden="true"
            />

            <h2 className="text-lg font-semibold text-white">
              কোনো বই পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-400">
              অন্য কোনো নাম দিয়ে খুঁজে দেখুন।
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-5 rounded-lg bg-[#dfbd7b] px-4 py-2 text-sm font-semibold text-[#081b22] transition hover:bg-[#e8cd96]"
            >
              সব বই দেখুন
            </button>
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {reading && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-[#081b22]/95 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={reading.title}
          onClick={() => setReading(null)}
        >
          <div
            className="mx-auto flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#dfbd7b]/20 bg-[#10252d] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-700/80 px-4 py-3">
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-white">
                  {reading.title}
                </h3>
                <p className="truncate text-xs text-slate-400">
                  {reading.author}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={getPreviewUrl(reading._fileId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="নতুন ট্যাবে খুলুন"
                  className="rounded-lg border border-slate-600 p-2.5 text-sm text-slate-300 transition hover:border-[#dfbd7b]/60 hover:text-[#dfbd7b]"
                >
                  <FaArrowUpRightFromSquare />
                </a>

                <a
                  href={getDownloadUrl(reading._fileId)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ডাউনলোড"
                  className="rounded-lg border border-slate-600 p-2.5 text-sm text-slate-300 transition hover:border-[#dfbd7b]/60 hover:text-[#dfbd7b]"
                >
                  <FaDownload />
                </a>

                <button
                  type="button"
                  onClick={() => setReading(null)}
                  aria-label="বন্ধ করুন"
                  className="rounded-lg bg-[#dfbd7b] p-2.5 text-sm text-[#081b22] transition hover:bg-[#e8cd96]"
                >
                  <FaXmark />
                </button>
              </div>
            </div>

            <iframe
              src={getPreviewUrl(reading._fileId)}
              title={reading.title}
              className="h-full w-full flex-1 bg-white"
              allow="autoplay"
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ExploreLibrary;