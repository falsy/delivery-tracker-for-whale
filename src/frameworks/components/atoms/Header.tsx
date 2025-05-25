export default function Header({ title }: { title: string }) {
  return (
    <header className="flex items-center h-[50px] px-5 bg-sectionBG dark:bg-sectionBG-dark dark:text-white shadow-custom dark:shadow-custom-dark">
      <h1 className="text-base font-normal">{title}</h1>
    </header>
  )
}
