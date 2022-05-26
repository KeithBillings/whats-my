import Head from "next/head";

import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>What&apos;s My...</title>
				<meta name="What's My..." content="Find out information about your browser" />
			</Head>
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
