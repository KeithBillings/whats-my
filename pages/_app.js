import { createContext, useState } from "react";

import Head from "next/head";

import "../styles/globals.scss";

const SearchQueryContext = createContext();

function MyApp({ Component, pageProps }) {
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<>
			<Head>
				<title>What&apos;s My...</title>
				<meta name="What's My..." content="Find out information about your browser" />
			</Head>
			<SearchQueryContext.Provider value={{ searchQuery, setSearchQuery }}>
				<Component {...pageProps} />
			</SearchQueryContext.Provider>
		</>
	);
}

export { SearchQueryContext };
export default MyApp;
