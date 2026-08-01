export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 md:p-24 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-slate-100">
      <div className="z-10 max-w-5xl w-full items-center justify-between text-sm flex flex-col md:flex-row mb-12">
        <p className="flex w-full justify-center border-b border-slate-800 bg-slate-900/30 pb-6 pt-8 backdrop-blur-2xl md:static md:w-auto md:rounded-xl md:border md:bg-slate-850 md:p-4 text-slate-300">
          FlyRank AI Frontend Engineering Internship
        </p>
        <div className="flex h-24 w-full items-end justify-center md:static md:h-auto md:w-auto bg-none mt-4 md:mt-0">
          <span className="flex place-items-center gap-2 p-2 border border-green-500/30 bg-green-500/10 text-green-400 rounded-lg text-xs font-semibold uppercase tracking-wider">
            ● Phase 1 Setup Completed
          </span>
        </div>
      </div>

      <div className="relative flex flex-col place-items-center text-center mb-8 max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-violet-500 mb-6 py-2">
          frontend-ai-capstone
        </h1>
        <p className="text-md md:text-xl text-slate-300 leading-relaxed max-w-2xl">
          The foundation of an AI-assisted, state-of-the-art frontend capstone application. Built with Next.js 15, React 19, and Tailwind CSS.
        </p>
      </div>

      <div className="grid text-center lg:max-w-5xl lg:w-full lg:grid-cols-4 lg:text-left gap-6 mt-12 w-full">
        <div className="group rounded-xl border border-slate-800/80 bg-slate-950/20 px-5 py-6 transition-all hover:border-indigo-500/50 hover:bg-indigo-950/20 duration-300">
          <h2 className="mb-3 text-xl font-bold text-slate-200 group-hover:text-indigo-400">
            README.md{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-slate-400 leading-relaxed">
            Read the project overview, objectives, roadmap, and instructions.
          </p>
        </div>

        <div className="group rounded-xl border border-slate-800/80 bg-slate-950/20 px-5 py-6 transition-all hover:border-indigo-500/50 hover:bg-indigo-950/20 duration-300">
          <h2 className="mb-3 text-xl font-bold text-slate-200 group-hover:text-indigo-400">
            CLAUDE.md{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-slate-400 leading-relaxed">
            Explore coding standards, TypeScript rules, and AI guidance.
          </p>
        </div>

        <div className="group rounded-xl border border-slate-800/80 bg-slate-950/20 px-5 py-6 transition-all hover:border-indigo-500/50 hover:bg-indigo-950/20 duration-300">
          <h2 className="mb-3 text-xl font-bold text-slate-200 group-hover:text-indigo-400">
            LICENSE{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-slate-400 leading-relaxed">
            Permissive MIT license governing project use and modification.
          </p>
        </div>

        <div className="group rounded-xl border border-slate-800/80 bg-slate-950/20 px-5 py-6 transition-all hover:border-indigo-500/50 hover:bg-indigo-950/20 duration-300">
          <h2 className="mb-3 text-xl font-bold text-slate-200 group-hover:text-indigo-400">
            .gitignore{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 text-sm text-slate-400 leading-relaxed">
            Strict exclusion guidelines for node_modules, logs, and OS caches.
          </p>
        </div>
      </div>
    </main>
  );
}
