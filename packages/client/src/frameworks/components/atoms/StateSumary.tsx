export default function StateSummary({
  state
}: {
  state: { from: string; to: string; state: string }
}) {
  return (
    <div className="mb-5">
      <table className="table-fixed w-full text-center border-r border-b border-gray-300 dark:border-gray-700 text-sm border-spacing-0">
        <thead>
          <tr>
            <th className="bg-gray-100 dark:bg-gray-800 leading-[34px] border-l border-t border-gray-300 dark:border-gray-700 w-[35%]">
              발송지
            </th>
            <th className="bg-gray-100 dark:bg-gray-800 leading-[34px] border-l border-t border-gray-300 dark:border-gray-700">
              도착지
            </th>
            <th className="bg-gray-100 dark:bg-gray-800 leading-[34px] border-l border-t border-gray-300 dark:border-gray-700">
              배달결과
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border-l border-t border-gray-300 dark:border-gray-700 leading-[20px] p-1.5">
              {state.from}
            </td>
            <td className="border-l border-t border-gray-300 dark:border-gray-700 leading-[20px] p-1.5">
              {state.to}
            </td>
            <td className="border-l border-t border-gray-300 dark:border-gray-700 leading-[20px] p-1.5">
              {state.state}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
