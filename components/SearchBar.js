import { useContext } from "react";
import { SearchQueryContext } from "../pages/_app";

export default function SearchBar() {
	const { setSearchQuery } = useContext(SearchQueryContext);

	function handleChange(event) {
		const searchQuery = event.target.value;
		setSearchQuery(searchQuery);
	}

	return (
		<div className="search-bar">
			<input type={"text"} placeholder="Search" onChange={handleChange} />
		</div>
	);
}
