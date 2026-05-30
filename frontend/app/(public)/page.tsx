import Link from "next/link";

const Homepage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-12">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-10 shadow-xl shadow-slate-950/20 backdrop-blur-xl">
          <div className="space-y-8 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-400">
              ProStore
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Launch your product store with confidence.
            </h1>
            <p className="mx-auto max-w-2xl text-slate-300 sm:text-lg">
              Create and manage products effortlessly, upload images instantly,
              and keep your catalog running smoothly with a clean admin
              experience.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full bg-emerald-400 px-8 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-300"
              >
                View products
              </Link>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center rounded-full border border-slate-700 px-8 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-800"
              >
                Sign up free
              </Link>
            </div>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-center">
              <p className="text-sm text-slate-400">Fast uploads</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                Instant image handling
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-center">
              <p className="text-sm text-slate-400">Product management</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                Simple category control
              </p>
            </div>
            <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-center">
              <p className="text-sm text-slate-400">Modern UI</p>
              <p className="mt-3 text-2xl font-semibold text-white">
                Clean admin experience
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Homepage;
