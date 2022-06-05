import { createContext, useState } from "react";

// Components
import Head from "next/head";

// Styles
import "../styles/globals.scss";

// Creating Context for the seachbar
const SearchQueryContext = createContext();

function MyApp({ Component, pageProps }) {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<Head>
				<title>What&apos;s My...</title>
				<meta name="What's My..." content="Find out information about your browser" />
			</Head>
			{/* Feeding search results to the rest of the App */}
			<SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
				<Component {...pageProps} />
			</SearchQueryContext.Provider>
		</>
	);
}

export { SearchQueryContext };
export default MyApp;
