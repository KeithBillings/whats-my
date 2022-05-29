import { useState, useEffect } from "react";

import CopyButton from "../components/CopyButton";
import WindowInfo from "../components/WindowInfo";
import ExternalLinks from "../components/ExternalLinks";

export default function Home() {
	const [whatsMyData, setWhatsMyData] = useState();

	return (
		<div className="home-page">
			<h1 className="home-page__title">What&apos;s My...</h1>
			<CopyButton whatsMyData={whatsMyData} />
			<WindowInfo setWhatsMyData={setWhatsMyData} />
			<ExternalLinks />
		</div>
	);
}
