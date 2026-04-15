function Search({ query, setQuery }) {
  return (
    <input
      className="border border-gray/5 px-2 py-3 rounded-lg text-sm w-full bg-gray/5 focus:border focus:border-gray/20 outline-0"
      type="search"
      name="Search"
      placeholder="search events..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

export default Search;
