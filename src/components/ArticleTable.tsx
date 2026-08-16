/* Markdown-style table rendered from structured data (headers + rows).
   No locale state: caller passes locale-aware headers/rows. */
export function ArticleTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse text-[13px] leading-[1.55] text-[#33495a]">
        <thead>
          <tr>
            {headers.map((h) => (
              <th
                key={h}
                className="border-b-2 border-[#1d5472] bg-[#142641] px-3 py-2 text-left font-semibold text-[#e8f3f5]"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={i % 2 === 1 ? "bg-[#f2f7f6]" : undefined}>
              {r.map((c, j) => (
                <td key={j} className="border-b border-[#c9d8d2] px-3 py-2 align-top">
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
