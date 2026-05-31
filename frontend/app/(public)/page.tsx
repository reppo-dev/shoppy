import Link from "next/link";
import { getToken } from "../action/token";

const Homepage = async () => {
  const token = await getToken();

  return (
    <main className="min-h-screen px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="space-y-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
              Shoppy
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Welcome to Shoppy Store
            </h1>
            <p className="mx-auto max-w-2xl text-lg sm:text-xl">
              Discover the best products at unbeatable prices. From the latest
              trends to everyday essentials — everything you need, all in one
              place.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                Browse Store
              </Link>
              {!token ? (
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold transition hover:bg-slate-800"
                >
                  Sign Up Free
                </Link>
              ) : (
                <Link
                  href="/profile"
                  className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold transition hover:bg-slate-800"
                >
                  My Account
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
