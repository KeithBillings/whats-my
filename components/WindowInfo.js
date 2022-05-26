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

	function setScreenInfo() {
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
		setScreenInfo();

		window.addEventListener("resize", () => {
			setScreenInfo();
		});
	}, []);

	return (
		<div className="window-info">
			<WindowInfoRow name={"window.screen.height"} value={windowHeight} />
			<WindowInfoRow name={"window.screen.width"} value={windowWidth} />
			<WindowInfoRow name={"window.screen.availHeight"} value={windowAvailHeight} />
			<WindowInfoRow name={"window.screen.availWidth"} value={windowAvailWidth} />
			<WindowInfoRow name={"window.devicePixelRatio"} value={windowDevicePixelRatio} />
			<WindowInfoRow name={"window.screen.pixelDepth"} value={windowDevicePixelDepth} />
			<WindowInfoRow name={"window.screen.colorDepth"} value={windowColorDepth} />
			<WindowInfoRow name={"window.screen.orientation.type"} value={windowScreenOrientation} />
		</div>
	);
}
