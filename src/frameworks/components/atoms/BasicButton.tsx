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
        "inline-block w-20 cursor-pointer",
        "bg-buttonBG border border-border dark:bg-buttonBG-dark dark:border-border-dark text-black dark:text-white",
        "text-sm h-10 font-weight-[500]",
        "transition-opacity transition-03s hover:opacity-80"
      ])}
      onClick={onClick}
    >
      {value}
    </Button>
  )
}
