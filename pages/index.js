import { useState, useEffect } from "react";

import CopyButton from "../components/CopyButton";
import SearchBar from "../components/SearchBar";
import WindowInfo from "../components/WindowInfo";
import ExternalLinks from "../components/ExternalLinks";

export default function Home() {
	const [whatsMyData, setWhatsMyData] = useState();

	return (
		<div className="home-page">
			<h1 className="home-page__title">What&apos;s My...</h1>
			<SearchBar />
			<CopyButton whatsMyData={whatsMyData} />
			<WindowInfo setWhatsMyData={setWhatsMyData} />
			<ExternalLinks />
		</div>
	);
}
