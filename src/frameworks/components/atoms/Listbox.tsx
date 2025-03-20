import clsx from "clsx"
import {
  Listbox as HUIListbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions
} from "@headlessui/react"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

interface IListboxItem {
  id: string
  name: string
}

export default function Listbox({
  list,
  selected,
  onChange
}: {
  list: Array<IListboxItem>
  selected: IListboxItem
  onChange: (selected: IListboxItem) => void
}) {
  return (
    <HUIListbox value={selected} onChange={onChange}>
      <ListboxButton
        data-testid="carrier-select-box"
        className={clsx(
          "relative w-full text-left text-sm font-medium border border-border dark:border-border-dark dark:text-white bg-transparent py-2 pl-3 pr-8 z-10",
          "cursor-pointer"
        )}
      >
        {selected.name}
        <ChevronDownIcon
          className="group pointer-events-none absolute top-2.5 right-2.5 size-4"
          aria-hidden="true"
        />
      </ListboxButton>
      <ListboxOptions
        anchor="bottom"
        transition
        className={clsx(
          "w-[var(--button-width)] rounded-lg border p-1 [--anchor-gap:4px] focus:outline-none",
          "transition duration-100 ease-in data-[leave]:data-[closed]:opacity-0",
          "border border-border dark:border-border-dark dark:text-white bg-listBG dark:bg-listBG-dark shadow-md rounded-md",
          "z-10"
        )}
      >
        {list.map((item) => (
          <ListboxOption
            key={item.id}
            value={item}
            className={clsx(
              "group flex cursor-pointer text-sm items-center gap-2 rounded-lg py-2 px-3 select-none",
              "hover:bg-listBG-hover dark:hover:bg-listBG-hover-dark",
              "data-[focus]:bg-listBG-hover dark:data-[focus]:bg-listBG-hover-dark"
            )}
          >
            {item.name}
          </ListboxOption>
        ))}
      </ListboxOptions>
    </HUIListbox>
  )
}
