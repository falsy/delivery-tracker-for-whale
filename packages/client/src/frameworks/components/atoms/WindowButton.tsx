import clsx from "clsx"
import { Button } from "@headlessui/react"

export default function WinodwButton({ url }: { url: string }) {
  const handleClickNewWindowTracker = () => {
    window.open(url, "", "resizable=yes,scrollbars=yes,width=900,height=700")
  }

  return (
    <Button
      aria-label="new-window-button"
      className={clsx([
        "w-[30%] min-w-[60px] h-10 bg-[#f5f5f5] text-sm font-weight-[500] cursor-pointer",
        "border-[1px] border-solid border-[#ddd]",
        "transition-all duration-300 hover:bg-[#eaeaea] hover:opacity-80",
        "dark:bg-[rgb(44,44,44)] dark:text-[#ddd] dark:border-[rgb(85,85,85)] dark:hover:bg-[rgb(30,30,30)]"
      ])}
      onClick={handleClickNewWindowTracker}
    >
      새창
    </Button>
  )
}
