import { useState, useEffect } from "react";
import WindowSizesRow from "./WindowSizesRow";

export default function WindowSizes() {
	const [windowHeight, setWindowHeight] = useState("Loading...");
	const [windowWidth, setWindowWidth] = useState("Loading...");
	const [windowAvailHeight, setWindowAvailHeight] = useState("Loading...");
	const [windowAvailWidth, setWindowAvailWidth] = useState("Loading...");
	const [windowDevicePixelRatio, setWindowDevicePixelRatio] = useState("Loading...");
	const [windowDevicePixelDepth, setWindowDevicePixelDepth] = useState("Loading...");
	const [windowColorDepth, setWindowColorDepth] = useState("Loading...");
	const [windowScreenOrientation, setWindowScreenOrientation] = useState("Loading...");

	function setScreenSizes() {
		setWindowHeight(window.screen.height);
		setWindowWidth(window.screen.width);
		setWindowAvailHeight(window.screen.availHeight);
		setWindowAvailWidth(window.screen.availWidth);
		setWindowDevicePixelRatio(window.devicePixelRatio);
		setWindowDevicePixelDepth(window.screen.pixelDepth);
		setWindowColorDepth(window.screen.colorDepth);
		setWindowScreenOrientation(window.screen.orientation.type);
	}

	useEffect(() => {
		setScreenSizes();

		window.addEventListener("resize", () => {
			setScreenSizes();
		});
	}, []);

	return (
		<div className="window-sizes">
			<WindowSizesRow name={"window.screen.height"} value={windowHeight} />
			<WindowSizesRow name={"window.screen.width"} value={windowWidth} />
			<WindowSizesRow name={"window.screen.availHeight"} value={windowAvailHeight} />
			<WindowSizesRow name={"window.screen.availWidth"} value={windowAvailWidth} />
			<WindowSizesRow name={"window.devicePixelRatio"} value={windowDevicePixelRatio} />
			<WindowSizesRow name={"window.screen.pixelDepth"} value={windowDevicePixelDepth} />
			<WindowSizesRow name={"window.screen.colorDepth"} value={windowColorDepth} />
			<WindowSizesRow name={"window.screen.orientation.type"} value={windowScreenOrientation} />
		</div>
	);
}
