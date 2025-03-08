import { Button } from "@headlessui/react"

export default function BasicButton({
  value,
  handleClick
}: {
  value: string
  handleClick(): void
}) {
  return (
    <Button
      aria-label={value}
      className="inline-block w-20 text-white bg-green-600 border-green-600 text-sm leading-9 font-bold border-1 text-shadow-0 text-shadow-0 text-shadow-1 text-shadow-075c43 letter-spacing-1 opacity-100 transition-opacity transition-03s hover:opacity-80 cursor-pointer"
      // className={css({
      //   display: "inline-block",
      //   width: "80px",
      //   fontSize: "14px",
      //   lineHeight: "32px",
      //   color: "#fff",
      //   background: "#087e5b",
      //   border: "1px solid #087e5b",
      //   textShadow: "0px 0px 1px #075c43",
      //   letterSpacing: 1,
      //   fontWeight: 700,
      //   opacity: 1,
      //   transition: "opacity",
      //   transitionDuration: "0.3s",
      //   _hover: {
      //     opacity: 0.8
      //   }
      // })}
      onClick={handleClick}
    >
      {value}
    </Button>
  )
}
