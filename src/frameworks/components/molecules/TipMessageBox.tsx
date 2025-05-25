import { Button } from "@headlessui/react"

export default function TipMessageBox({
  resetTrackers
}: {
  resetTrackers: () => void
}) {
  return (
    <section className="px-5 text-xs text-gray-700 dark:text-gray-300">
      <p className="leading-[18px]">
        * 서비스가 정상 동작하지 않을 경우 아래의 <strong>[초기화]</strong>를
        진행해 주세요.
      </p>
      <p>
        <Button
          aria-label="reset-button"
          className="block text-primary font-bold py-0.5 text-xs cursor-pointer"
          onClick={resetTrackers}
        >
          [초기화]
        </Button>
      </p>
    </section>
  )
}
