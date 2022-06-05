import { useContext } from "react";

// Data
import { SearchQueryContext } from "../pages/_app";

// Renders a search bar that will feed its value throughout the app for various functionality via a useContext hook.
export default function SearchBar() {
	const { setSearchQuery } = useContext(SearchQueryContext);

	// Set value to state within the context
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
