import WindowSizes from "../components/WindowSizes";
import ExternalLinks from "../components/ExternalLinks";

export default function Home() {
	return (
		<div className="home-page">
			<h1 className="home-page__title">What&apos;s My...</h1>
			<WindowSizes />
			<ExternalLinks />
		</div>
	);
}
