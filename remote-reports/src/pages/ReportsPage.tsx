import { useReports } from "../hooks/useReports";
import { DailyChart } from "../components/DailyChart";
import type { Report } from "../types";

const statusStyle: Record<
  Report["status"],
  { label: string; dotClass: string; badgeClass: string }
> = {
  healthy: {
    label: "Saudável",
    dotClass: "bg-green-500",
    badgeClass: "bg-green-50 text-green-700",
  },
  warning: {
    label: "Atenção",
    dotClass: "bg-amber-500",
    badgeClass: "bg-amber-50 text-amber-700",
  },
  critical: {
    label: "Crítico",
    dotClass: "bg-red-500",
    badgeClass: "bg-red-50 text-red-600",
  },
};

const statusLabels: Record<string, string> = {
  healthy: "Saudável",
  warning: "Atenção",
  critical: "Crítico",
};

export default function ReportsPage() {
  const {
    paginatedReports,
    filteredReports,
    loading,
    error,
    statusFilter,
    handleStatusFilter,
    totalPages,
    currentPage,
    setPage,
  } = useReports();

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="font-black text-4xl tracking-tight leading-none text-[#0c0c0f]">
            Relatórios
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

      {!loading && !error && <DailyChart />}

      <div className="flex items-center gap-2 flex-wrap">
        <span className="font-mono text-xs text-stone-400">Filtrar:</span>

        {statusFilter !== "all" ? (
          <span className="flex items-center gap-1.5 pl-3 pr-2 py-1 rounded-full border border-violet-300 bg-violet-50 font-mono text-xs text-violet-700">
            {statusLabels[statusFilter]}
            <button
              onClick={() => handleStatusFilter("all")}
              className="flex items-center justify-center w-3.5 h-3.5 rounded-full hover:bg-violet-200 transition-colors text-violet-500"
            >
              ×
            </button>
          </span>
        ) : (
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value as "all" | "healthy" | "warning" | "critical")}
              className="appearance-none pl-3 pr-7 py-1 rounded-full border border-stone-200 font-mono text-xs text-stone-600 bg-white outline-none cursor-pointer hover:border-stone-300 transition-colors"
            >
              <option value="all">Status</option>
              <option value="healthy">Saudável</option>
              <option value="warning">Atenção</option>
              <option value="critical">Crítico</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 text-[10px]">▼</span>
          </div>
        )}

        {statusFilter !== "all" && (
          <button
            onClick={() => handleStatusFilter("all")}
            className="font-mono text-xs text-violet-600 hover:underline ml-1"
          >
            Limpar filtro
          </button>
        )}
      </div>

      <div className="rounded-2xl overflow-hidden border border-zinc-100">
        <table className="w-full bg-white">
          <thead>
            <tr className="border-b border-zinc-100 bg-stone-50">
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                SPRINT
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                SQUAD
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                PERÍODO
              </th>
              <th className="text-right px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                DEPLOYS OK
              </th>
              <th className="text-right px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                ISSUES
              </th>
              <th className="text-right px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                CYCLE TIME
              </th>
              <th className="text-left px-5 py-3 font-mono text-xs font-semibold text-stone-400">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.length > 0 ? (
              paginatedReports.map((report, index) => {
                const s = statusStyle[report.status];
                const successRate = Math.round(
                  (report.deploysOk / report.deploysTotal) * 100,
                );
                const isLast = index === paginatedReports.length - 1;
                return (
                  <tr
                    key={report.id}
                    className={`transition-colors hover:bg-stone-50 ${
                      isLast ? "" : "border-b border-zinc-100"
                    }`}
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-bold text-[#0c0c0f]">
                        {report.sprint}
                      </p>
                      <p className="font-mono mt-0.5 text-[11px] text-stone-400">
                        {report.title.split("—")[1]?.trim()}
                      </p>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-semibold text-stone-500">
                        {report.squad}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs text-stone-400">
                        {report.period}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-black text-sm text-[#0c0c0f]">
                        {successRate}%
                      </span>
                      <p className="font-mono text-[10px] text-zinc-300">
                        {report.deploysOk}/{report.deploysTotal}
                      </p>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-black text-sm text-[#0c0c0f]">
                        {report.issuesClosed}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className="font-mono text-xs text-stone-500">
                        {report.avgCycleTime}
                      </span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dotClass}`}
                        />
                        <span
                          className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${s.badgeClass}`}
                        >
                          {s.label}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="px-5 py-12 text-center">
                  <p className="font-mono text-sm text-stone-400">
                    nenhum relatório encontrado
                  </p>
                </td>
              </tr>
            )}
          </tbody>
          {filteredReports.length > 0 && (
            <tfoot>
              <tr className="border-t border-zinc-100 bg-stone-50">
                <td colSpan={7} className="px-5 py-2.5">
                  <div className="flex items-center justify-end gap-4">
                    <span className="font-mono text-xs text-stone-400">
                      {(currentPage - 1) * 10 + 1}–
                      {Math.min(currentPage * 10, filteredReports.length)} de{" "}
                      {filteredReports.length} itens
                    </span>
                    <span className="font-mono text-xs text-stone-400">
                      Página {currentPage}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setPage(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                          currentPage === 1
                            ? "text-zinc-300 cursor-not-allowed"
                            : "text-stone-500 cursor-pointer"
                        }`}
                      >
                        ‹
                      </button>
                      <button
                        onClick={() => setPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`w-7 h-7 rounded flex items-center justify-center transition-all ${
                          currentPage === totalPages
                            ? "text-zinc-300 cursor-not-allowed"
                            : "text-stone-500 cursor-pointer"
                        }`}
                      >
                        ›
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </div>
  );
}
