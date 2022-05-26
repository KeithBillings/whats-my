import WindowInfo from "../components/WindowInfo";
import ExternalLinks from "../components/ExternalLinks";

export default function Home() {
	return (
		<div className="home-page">
			<h1 className="home-page__title">What&apos;s My...</h1>
			<WindowInfo />
			<ExternalLinks />
		</div>
	);
}
