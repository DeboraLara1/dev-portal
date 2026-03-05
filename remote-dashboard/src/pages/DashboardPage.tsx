import { StatsCard } from "../components/StatsCard";
import { ActivityItem } from "../components/RecentActivity";
import { useDashboard } from "../hooks/useDashboard";
import type { Build } from "../types";

const buildStatusStyle: Record<
  Build["status"],
  { label: string; dotClass: string; badgeClass: string }
> = {
  success: {
    label: "ok",
    dotClass: "bg-green-500",
    badgeClass: "bg-green-50 text-green-700",
  },
  failed: {
    label: "falhou",
    dotClass: "bg-red-500",
    badgeClass: "bg-red-50 text-red-600",
  },
  running: {
    label: "rodando",
    dotClass: "bg-blue-500",
    badgeClass: "bg-blue-50 text-blue-600",
  },
};

export default function DashboardPage() {
  const { filteredStats: stats, activities, builds, loading, error } = useDashboard();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-black text-4xl tracking-tight leading-none text-[#0c0c0f]">
            Dashboard
          </h2>
        </div>
      </div>

      {loading && (
        <div className="flex items-center gap-3 py-4">
          <div className="w-4 h-4 rounded-full border-2 border-violet-600 border-t-transparent animate-spin" />
          <span className="font-mono text-sm text-stone-400">Carregando da API...</span>
        </div>
      )}

      {error && (
        <div className="rounded-xl bg-red-50 border border-red-100 px-4 py-3">
          <p className="font-mono text-sm text-red-600">{error}</p>
          <p className="font-mono text-xs text-red-400 mt-1">
            Inicie com: <code className="bg-red-100 px-1 rounded">npm run api</code>
          </p>
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <StatsCard key={stat.id} stat={stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 rounded-2xl bg-white overflow-hidden border border-zinc-100">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h3 className="font-black text-base text-[#0c0c0f]">
              Atividade Recente
            </h3>
            <p className="font-mono text-xs mt-0.5 text-stone-400">
              últimas {activities.length} ações
            </p>
          </div>
          <div className="px-5">
            {activities.map((activity) => (
              <ActivityItem key={activity.id} activity={activity} />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 rounded-2xl bg-white overflow-hidden border border-zinc-100">
          <div className="px-5 py-4 border-b border-zinc-100">
            <h3 className="font-black text-base text-[#0c0c0f]">
              Builds Recentes
            </h3>
            <p className="font-mono text-xs mt-0.5 text-stone-400">
              pipeline CI/CD
            </p>
          </div>
          <div>
            {builds.map((build, i) => {
              const s = buildStatusStyle[build.status];
              const isLast = i === builds.length - 1;
              return (
                <div
                  key={build.id}
                  className={`px-5 py-3 flex items-center gap-3 ${
                    isLast ? "" : "border-b border-stone-50"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dotClass}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-mono text-xs font-semibold truncate text-[#0c0c0f]">
                      {build.module}
                    </p>
                    <p className="font-mono truncate text-[10px] text-stone-400">
                      {build.branch}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span
                      className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${s.badgeClass}`}
                    >
                      {s.label}
                    </span>
                    <p className="font-mono mt-0.5 text-[10px] text-zinc-300">
                      {build.duration !== "—" ? build.duration : build.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
