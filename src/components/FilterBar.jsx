export default function FilterBar({ search, setSearch, filter, setFilter }) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search tenant..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="delayed">Delayed</option>
        <option value="green">On Time</option>
        <option value="orange">Upcoming</option>
        <option value="red">Due Soon</option>
      </select>
    </div>
  );
}
