export default function StateSummary({
  state
}: {
  state: { from: string; to: string; state: string }
}) {
  return (
    <div className="mb-5">
      <table className="table-fixed w-full text-center border-r border-b border-border dark:border-border-dark text-sm border-spacing-0 text-black dark:text-white">
        <thead>
          <tr>
            <th className="bg-tableHeader dark:bg-tableHeader-dark leading-[34px] border-l border-t border-border dark:border-border-dark w-[35%] font-[500]">
              발송지
            </th>
            <th className="bg-tableHeader dark:bg-tableHeader-dark leading-[34px] border-l border-t border-border dark:border-border-dark font-[500]">
              도착지
            </th>
            <th className="bg-tableHeader dark:bg-tableHeader-dark leading-[34px] border-l border-t border-border dark:border-border-dark font-[500]">
              배달결과
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-l border-t border-border dark:border-border-dark leading-[20px] p-1.5">
              {state.from}
            </td>
            <td className="border-l border-t border-border dark:border-border-dark leading-[20px] p-1.5">
              {state.to}
            </td>
            <td className="border-l border-t border-border dark:border-border-dark leading-[20px] p-1.5">
              {state.state}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
