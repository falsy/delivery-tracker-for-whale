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
        placeholder="배송에 대한 간단한 메모를 적을 수 있어요."
      />
    </div>
  )
}
