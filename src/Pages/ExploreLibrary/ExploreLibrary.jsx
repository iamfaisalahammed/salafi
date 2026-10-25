import { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaDownload,
  FaMagnifyingGlass,
  FaRegFilePdf,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const FONT = { fontFamily: "'Hind Siliguri', sans-serif" };

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

    return fileId && /^[a-zA-Z0-9_-]+$/.test(fileId)
      ? fileId
      : null;
  } catch {
    return null;
  }
};

const ExploreLibrary = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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

  const filteredBooks = useMemo(() => {
    const searchTerm = search.trim().toLocaleLowerCase();

    return books.filter((book) => {
      const title = (book.title || "").toLocaleLowerCase();
      const author = (book.author || "").toLocaleLowerCase();
      const category = (book.category || "").toLocaleLowerCase();

      return (
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        category.includes(searchTerm)
      );
    });
  }, [books, search]);

  const getPreviewUrl = (fileId) =>
    `https://drive.google.com/file/d/${fileId}/preview`;

  const getDownloadUrl = (fileId) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`;

  const resetFilters = () => setSearch("");

  return (
    <section
      className="min-h-screen bg-[#081b22] px-4 py-8 text-slate-100 sm:px-6 sm:py-10 lg:px-8"
      style={FONT}
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl border border-emerald-400/15 bg-emerald-400/10 p-3.5 text-emerald-400">
            <FaBookOpen className="text-2xl" />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">
            ইসলামিক বইয়ের লাইব্রেরি
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
            কুরআন, হাদিস, তাফসির ও ইসলামিক জ্ঞানের বই পড়ুন
            এবং PDF সংগ্রহ করুন।
          </p>

          {!loading && !error && (
            <p
              className="mt-4 text-sm text-emerald-400"
              aria-live="polite"
            >
              মোট {filteredBooks.length}টি বই পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mx-auto mb-7 max-w-xl">
          <label htmlFor="book-search" className="sr-only">
            বই খুঁজুন
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-slate-700 bg-[#10252d] px-4 py-3 transition focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/15">
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
                className="shrink-0 text-xs text-slate-400 transition hover:text-emerald-400"
                aria-label="সার্চ মুছুন"
              >
                মুছুন
              </button>
            )}
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-16 text-center" role="status">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-emerald-400/15 border-t-emerald-400" />
            <p className="text-sm text-slate-400">
              বইয়ের তালিকা লোড হচ্ছে...
            </p>
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
              className="mt-5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#081b22] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : filteredBooks.length > 0 ? (
          /* Book List */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book, index) => {
              const fileId = getDriveFileId(book.fileId);
              const isConfigured = Boolean(fileId);

              return (
                <article
                  key={book.id ?? `${book.title}-${index}`}
                  className="flex flex-col rounded-2xl border border-slate-700/80 bg-[#10252d] p-4 transition duration-200 hover:border-emerald-500/40 sm:p-5"
                >
                  {/* Book Cover */}
                  <div className="mb-4 flex h-36 items-center justify-center rounded-xl border border-emerald-400/10 bg-[#0b2027]">
                    <div className="px-3 text-center text-emerald-400">
                      <FaRegFilePdf
                        className="mx-auto mb-3 text-4xl"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold tracking-widest">
                        PDF BOOK
                      </span>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1">
                    <span className="inline-block rounded-full border border-emerald-400/15 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                      {book.category || "অন্যান্য"}
                    </span>

                    <h2 className="mt-3 text-base font-semibold leading-7 text-white sm:text-lg">
                      {book.title || "নামহীন বই"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {book.author || "লেখকের নাম উল্লেখ নেই"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 grid grid-cols-2 gap-2">
                    {isConfigured ? (
                      <>
                        <a
                          href={getPreviewUrl(fileId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-emerald-500 px-2 py-2.5 text-sm font-semibold text-[#081b22] transition hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          <FaArrowUpRightFromSquare
                            aria-hidden="true"
                            className="shrink-0"
                          />
                          পড়ুন
                        </a>

                        <a
                          href={getDownloadUrl(fileId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-slate-600 px-2 py-2.5 text-sm font-medium text-slate-200 transition hover:border-emerald-500/50 hover:bg-emerald-500/5 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                        >
                          <FaDownload
                            aria-hidden="true"
                            className="shrink-0"
                          />
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
              className="mt-5 rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-[#081b22] transition hover:bg-emerald-400"
            >
              সব বই দেখুন
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreLibrary;