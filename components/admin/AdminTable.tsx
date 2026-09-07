import EmptyState from "@/components/common/EmptyState";

export interface AdminTableColumn<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  rows: T[];
  rowKey: (row: T) => string;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function AdminTable<T>({
  columns,
  rows,
  rowKey,
  emptyTitle = "Nothing here yet",
  emptyDescription,
}: AdminTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-xl border border-[var(--border)] bg-white">
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-[var(--border)] bg-[var(--off-white)]">
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-left px-4 py-3 font-semibold text-[var(--navy)] whitespace-nowrap ${col.className || ""}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={rowKey(row)} className="border-b border-[var(--border)] last:border-0 hover:bg-[var(--off-white)]/60">
              {columns.map((col) => (
                <td key={col.key} className={`px-4 py-3 align-middle ${col.className || ""}`}>
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
