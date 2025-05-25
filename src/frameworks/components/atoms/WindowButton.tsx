import clsx from "clsx"
import { Button } from "@headlessui/react"

export default function WindowButton({ url }: { url: string }) {
  const handleClickNewWindowTracker = () => {
    window.open(
      url,
      "",
      "resizable=yes,scrollbars=yes,width=900,height=700,location=no,menubar=no,toolbar=no,status=no"
    )
  }

  return (
    <Button
      aria-label="new-window-button"
      className={clsx([
        "w-20 h-10 bg-buttonBG text-sm font-[500] cursor-pointer",
        "border-[1px] border-border",
        "transition-all duration-300 hover:bg-[#eaeaea] hover:opacity-80",
        "text-black dark:text-white",
        "dark:bg-buttonBG-dark dark:border-border-dark dark:hover:bg-[rgb(30,30,30)]",
        "rounded-4xl"
      ])}
      onClick={handleClickNewWindowTracker}
    >
      새창
    </Button>
  )
}
