export default function LabelInput({
  label,
  changeLabel
}: {
  label: string
  changeLabel: (label: string) => void
}) {
  return (
    <div className="flex">
      <input
        className="flex-1 w-full text-sm leading-[20px] p-1.5 pl-1 border-0 bg-transparent placeholder:text-xs dark:text-white"
        type="text"
        value={label}
        onChange={(e) => changeLabel(e.target.value)}
        placeholder="메모"
      />
    </div>
  )
}
