function SearchBar({ filters, setFilters }) {
  return (
    <div className="search-bar">
      <input
        placeholder="Search by name"
        value={filters.name}
        onChange={(e) => setFilters({ ...filters, name: e.target.value })}
      />
      <input
        placeholder="Category"
        value={filters.category}
        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={filters.minPrice}
        onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={filters.maxPrice}
        onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
      />
    </div>
  );
}

export default SearchBar;
