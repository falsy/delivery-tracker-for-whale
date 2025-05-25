import clsx from "clsx"

export default function StateList({
  progresses
}: {
  progresses: {
    state: { name: string }
    time: string
    location: string
    description: string
  }[]
}) {
  const tableBaseClass =
    "border-border dark:border-border-dark border-b border-r"
  const thClass = clsx(
    "bg-tableHeader dark:bg-tableHeader-dark border-l border-t",
    "leading-[34px] font-[500]",
    tableBaseClass
  )
  const tdClass = clsx("border-l border-t leading-[20px] p-1.5", tableBaseClass)

  return (
    <div className="mb-5 rounded-lg overflow-hidden border-1 border-border dark:border-border-dark dark:text-white/85 text-black">
      <table
        className={clsx(
          "table-fixed w-full text-center text-sm",
          "rounded-lg overflow-hidden border-1 border-border dark:border-border-dark",
          tableBaseClass
        )}
      >
        <thead>
          <tr>
            <th className={clsx(thClass, "w-[35%]")}>단계/시간</th>
            <th className={thClass}>위치/현황</th>
          </tr>
        </thead>
        <tbody>
          {progresses.map((progress, i) => (
            <tr key={i}>
              <td className={tdClass}>
                <p>[{progress.state.name}]</p>
                <p>{progress.time}</p>
              </td>
              <td className={tdClass}>
                <p>[{progress.location}]</p>
                <p>{progress.description}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
