import clsx from "clsx"

export default function StateSummary({
  state
}: {
  state: { from: string; to: string; state: string }
}) {
  const tableBaseClass = "border-border dark:border-border-dark"
  const thClass = clsx(
    "bg-tableHeader dark:bg-tableHeader-dark border-l border-t",
    "leading-[34px] font-[500]",
    tableBaseClass
  )
  const tdClass = clsx("border-l border-t leading-[20px] p-1.5", tableBaseClass)

  return (
    <div className="mb-5">
      <table
        className={clsx(
          "table-fixed w-full text-center text-sm",
          tableBaseClass
        )}
      >
        <thead>
          <tr>
            <th className={clsx(thClass, "w-[35%]")}>발송지</th>
            <th className={thClass}>도착지</th>
            <th className={thClass}>배달결과</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className={tdClass}>{state.from}</td>
            <td className={tdClass}>{state.to}</td>
            <td className={tdClass}>{state.state}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
