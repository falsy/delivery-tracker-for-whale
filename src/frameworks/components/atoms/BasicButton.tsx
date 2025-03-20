import clsx from "clsx"
import { Button } from "@headlessui/react"

export default function BasicButton({
  value,
  onClick
}: {
  value: string
  onClick(): void
}) {
  return (
    <Button
      aria-label={value}
      className={clsx([
        "inline-block w-20 bg-primary cursor-pointer",
        "text-white text-sm h-9 font-weight-[500]",
        "transition-opacity transition-03s hover:opacity-80"
      ])}
      onClick={onClick}
    >
      {value}
    </Button>
  )
}
