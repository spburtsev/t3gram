import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon";

export default function SearchBox() {
  return (
    <form className="relative flex flex-1" action="#" method="GET">
      <label htmlFor="search-field" className="sr-only">
        Search
      </label>
      <MagnifyingGlassIcon
        className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-base-content"
        aria-hidden="true"
      />
      <input
        id="search-field"
        className="input-ghost block h-full w-full border-0 bg-base-200 py-0 pl-8 pr-0 focus:ring-0 sm:text-sm"
        placeholder="Search..."
        type="search"
        name="search"
      />
    </form>
  );
}
