import { useState, useEffect } from "react";
import WindowInfoRow from "./WindowInfoRow";

export default function WindowInfo() {
	const [windowHeight, setWindowHeight] = useState("Loading...");
	const [windowWidth, setWindowWidth] = useState("Loading...");
	const [windowAvailHeight, setWindowAvailHeight] = useState("Loading...");
	const [windowAvailWidth, setWindowAvailWidth] = useState("Loading...");
	const [windowDevicePixelRatio, setWindowDevicePixelRatio] = useState("Loading...");
	const [windowDevicePixelDepth, setWindowDevicePixelDepth] = useState("Loading...");
	const [windowColorDepth, setWindowColorDepth] = useState("Loading...");
	const [windowScreenOrientation, setWindowScreenOrientation] = useState("Loading...");

	const [scrollHeight, setScrollHeight] = useState("Loading...");
	const [scrollWidth, setScrollWidth] = useState("Loading...");
	const [clientHeight, setClientHeight] = useState("Loading...");
	const [clientWidth, setClientWidth] = useState("Loading...");

	function setScreenInfo() {
		setWindowHeight(window.screen.height);
		setWindowWidth(window.screen.width);
		setWindowAvailHeight(window.screen.availHeight);
		setWindowAvailWidth(window.screen.availWidth);
		setWindowDevicePixelRatio(window.devicePixelRatio);
		setWindowDevicePixelDepth(window.screen.pixelDepth);
		setWindowColorDepth(window.screen.colorDepth);
		setWindowScreenOrientation(window.screen.orientation.type);

		setScrollHeight(document.querySelector("body").scrollHeight);
		setScrollWidth(document.querySelector("body").scrollWidth);
		setClientHeight(document.querySelector("body").clientHeight);
		setClientWidth(document.querySelector("body").clientWidth);
	}

	useEffect(() => {
		window.addEventListener("load", () => {
			setScreenInfo();
		});

		window.addEventListener("resize", () => {
			setScreenInfo();
		});
	}, []);

	return (
		<div className="window-info">
			<section>
				<h3 className="window-info__section-title">Window</h3>

				<WindowInfoRow name={"window.screen.height"} value={windowHeight} />
				<WindowInfoRow name={"window.screen.width"} value={windowWidth} />
				<WindowInfoRow name={"window.screen.availHeight"} value={windowAvailHeight} />
				<WindowInfoRow name={"window.screen.availWidth"} value={windowAvailWidth} />
				<WindowInfoRow name={"window.devicePixelRatio"} value={windowDevicePixelRatio} />
				<WindowInfoRow name={"window.screen.pixelDepth"} value={windowDevicePixelDepth} />
				<WindowInfoRow name={"window.screen.colorDepth"} value={windowColorDepth} />
				<WindowInfoRow name={"window.screen.orientation.type"} value={windowScreenOrientation} />
			</section>

			<section>
				<h3 className="window-info__section-title">Body</h3>
				<WindowInfoRow name={"body.scrollHeight"} value={scrollHeight} />
				<WindowInfoRow name={"body.scrollWidth"} value={scrollWidth} />
				<WindowInfoRow name={"body.clientHeight"} value={clientHeight} />
				<WindowInfoRow name={"body.clientWidth"} value={clientWidth} />
			</section>
		</div>
	);
}
