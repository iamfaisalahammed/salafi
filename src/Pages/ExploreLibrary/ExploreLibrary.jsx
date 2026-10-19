import { useEffect, useMemo, useState } from "react";
import {
  FaBookOpen,
  FaDownload,
  FaMagnifyingGlass,
  FaRegFilePdf,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

const categories = [
  "সকল বই",
  "কুরআন ও তাফসির",
  "হাদিস",
  "ইসলামিক জ্ঞান",
  "ইসলামি আকিদা",
];

const getDriveFileId = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") {
    return null;
  }

  const value = fileUrl.trim();

  // Google Drive File ID সরাসরি দেওয়া থাকলেও কাজ করবে।
  if (/^[a-zA-Z0-9_-]{20,}$/.test(value)) {
    return value;
  }

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
  const [category, setCategory] = useState("সকল বই");
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
      const bookCategory = book.category || "";

      const matchesSearch =
        title.includes(searchTerm) ||
        author.includes(searchTerm) ||
        bookCategory.toLocaleLowerCase().includes(searchTerm);

      const matchesCategory =
        category === "সকল বই" || bookCategory === category;

      return matchesSearch && matchesCategory;
    });
  }, [books, search, category]);

  const getPreviewUrl = (fileId) =>
    `https://drive.google.com/file/d/${fileId}/preview`;

  const getDownloadUrl = (fileId) =>
    `https://drive.google.com/uc?export=download&id=${fileId}`;

  const resetFilters = () => {
    setSearch("");
    setCategory("সকল বই");
  };

  return (
    <section className="min-h-screen bg-white px-4 py-10 text-gray-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex rounded-2xl bg-green-50 p-4 text-green-700">
            <FaBookOpen className="text-3xl" />
          </div>

          <h1 className="mb-3 text-2xl font-bold sm:text-3xl md:text-4xl">
            ইসলামিক বইয়ের লাইব্রেরি
          </h1>

          <p className="mx-auto max-w-2xl text-sm leading-7 text-gray-600 sm:text-base">
            কুরআন, হাদিস, তাফসির ও ইসলামিক জ্ঞানের বই পড়ুন
            এবং PDF সংগ্রহ করুন।
          </p>

          {!loading && !error && (
            <p className="mt-5 text-sm text-gray-500" aria-live="polite">
              মোট {filteredBooks.length}টি বই পাওয়া গেছে
            </p>
          )}
        </div>

        {/* Search */}
        <div className="mx-auto mb-6 max-w-xl">
          <label htmlFor="book-search" className="sr-only">
            বই খুঁজুন
          </label>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 transition focus-within:border-green-600 focus-within:ring-2 focus-within:ring-green-100">
            <FaMagnifyingGlass
              className="shrink-0 text-gray-400"
              aria-hidden="true"
            />

            <input
              id="book-search"
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="বইয়ের নাম, লেখক বা বিষয় দিয়ে খুঁজুন..."
              className="w-full bg-transparent text-sm outline-none"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="shrink-0 text-sm text-gray-500 hover:text-green-700"
                aria-label="সার্চ মুছুন"
              >
                মুছুন
              </button>
            )}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              aria-pressed={category === item}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                category === item
                  ? "border-green-700 bg-green-700 text-white"
                  : "border-gray-200 bg-white text-gray-700 hover:border-green-600 hover:text-green-700"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading ? (
          <div className="py-16 text-center" role="status">
            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-green-100 border-t-green-700" />
            <p className="text-sm text-gray-500">বইয়ের তালিকা লোড হচ্ছে...</p>
          </div>
        ) : error ? (
          /* Error */
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-12 text-center">
            <FaBookOpen className="mx-auto mb-4 text-4xl text-red-400" />

            <h2 className="text-lg font-semibold text-gray-900">
              বই লোড করা যায়নি
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              public/data/book.json ফাইলের অবস্থান ও JSON ফরম্যাট পরীক্ষা করুন।
            </p>

            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800"
            >
              আবার চেষ্টা করুন
            </button>
          </div>
        ) : filteredBooks.length > 0 ? (
          /* Book Cards */
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredBooks.map((book) => {
              const fileId = getDriveFileId(book.fileId);
              const isConfigured = Boolean(fileId);

              return (
                <article
                  key={book.id}
                  className="flex flex-col rounded-2xl border border-gray-200 bg-white p-4 transition hover:border-green-300 hover:shadow-md sm:p-5"
                >
                  {/* Book Cover */}
                  <div className="mb-4 flex h-40 items-center justify-center rounded-xl bg-green-50">
                    <div className="px-3 text-center text-green-700">
                      <FaRegFilePdf
                        className="mx-auto mb-3 text-5xl"
                        aria-hidden="true"
                      />
                      <span className="text-xs font-semibold tracking-widest">
                        PDF BOOK
                      </span>
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="flex-1">
                    <span className="inline-block rounded-full bg-green-50 px-3 py-1 text-xs text-green-800">
                      {book.category || "অন্যান্য"}
                    </span>

                    <h2 className="mt-3 text-lg font-bold leading-7">
                      {book.title || "নামহীন বই"}
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
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
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg bg-green-700 px-2 py-3 text-sm font-medium text-white transition hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          <FaArrowUpRightFromSquare aria-hidden="true" />
                          পড়ুন
                        </a>

                        <a
                          href={getDownloadUrl(fileId)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex min-w-0 items-center justify-center gap-2 rounded-lg border border-gray-200 px-2 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                        >
                          <FaDownload aria-hidden="true" />
                          ডাউনলোড
                        </a>
                      </>
                    ) : (
                      <p className="col-span-2 rounded-lg bg-gray-50 px-3 py-3 text-center text-sm text-gray-500">
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
          <div className="rounded-2xl border border-dashed border-gray-300 px-4 py-16 text-center">
            <FaBookOpen
              className="mx-auto mb-4 text-4xl text-gray-300"
              aria-hidden="true"
            />

            <h2 className="text-lg font-semibold">
              কোনো বই পাওয়া যায়নি
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              অন্য কোনো নাম দিয়ে খুঁজে দেখুন অথবা ক্যাটাগরি পরিবর্তন করুন।
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-4 rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-800"
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