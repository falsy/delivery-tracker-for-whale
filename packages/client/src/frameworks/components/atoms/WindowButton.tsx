import clsx from "clsx"
import { Button } from "@headlessui/react"

export default function WindowButton({ url }: { url: string }) {
  const handleClickNewWindowTracker = () => {
    window.open(url, "", "resizable=yes,scrollbars=yes,width=900,height=700")
  }

  return (
    <Button
      aria-label="new-window-button"
      className={clsx([
        "w-[30%] min-w-[60px] h-10 bg-buttonBG text-sm font-weight-[500] cursor-pointer",
        "border-[1px] border-border border-l-0",
        "transition-all duration-300 hover:bg-[#eaeaea] hover:opacity-80",
        "text-black dark:text-white",
        "dark:bg-buttonBG-dark dark:border-border-dark dark:hover:bg-[rgb(30,30,30)]"
      ])}
      onClick={handleClickNewWindowTracker}
    >
      새창
    </Button>
  )
}
