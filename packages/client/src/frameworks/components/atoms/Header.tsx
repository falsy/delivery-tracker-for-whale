export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center h-[50px] px-5 shadow-md bg-sectionBG dark:bg-sectionBG-dark dark:text-white">
      <h1 className="text-base font-normal">{title}</h1>
    </header>
  )
}
