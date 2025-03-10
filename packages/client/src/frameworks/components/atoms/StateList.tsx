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
  return (
    <table className="table-fixed w-full text-center border-r border-b border-border dark:border-border-dark text-sm border-spacing-0 text-black dark:text-white">
      <thead>
        <tr>
          <th className="bg-tableHeader dark:bg-tableHeader-dark leading-[34px] border-l border-t border-border dark:border-border-dark font-[500] w-[35%]">
            단계/시간
          </th>
          <th className="bg-tableHeader dark:bg-tableHeader-dark leading-[34px] border-l border-t border-border dark:border-border-dark font-[500]">
            위치/현황
          </th>
        </tr>
      </thead>
      <tbody>
        {progresses.map((progress, i) => {
          return (
            <tr key={i}>
              <td className="border-l border-t border-border dark:border-border-dark leading-[20px] p-1.5">
                <p>[{progress.state.name}]</p>
                <p>{progress.time}</p>
              </td>
              <td className="border-l border-t border-border dark:border-border-dark leading-[20px] p-1.5">
                <p>[{progress.location}]</p>
                <p>{progress.description}</p>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
