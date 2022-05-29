import { useState, useEffect } from "react";
import WindowInfoRow from "./WindowInfoRow";

export default function WindowInfo({ setWhatsMyData }) {
	const [windowHeight, setWindowHeight] = useState("Loading...");
	const [windowWidth, setWindowWidth] = useState("Loading...");
	const [windowAvailHeight, setWindowAvailHeight] = useState("Loading...");
	const [windowAvailWidth, setWindowAvailWidth] = useState("Loading...");
	const [windowDevicePixelRatio, setWindowDevicePixelRatio] = useState("Loading...");
	const [windowDevicePixelDepth, setWindowDevicePixelDepth] = useState("Loading...");
	const [windowColorDepth, setWindowColorDepth] = useState("Loading...");
	// const [windowScreenOrientation, setWindowScreenOrientation] = useState("Loading...");

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

		// const orientation = (screen.orientation || {}).type || screen.mozOrientation || screen.msOrientation;
		// if (orientation) {
		// 	setWindowScreenOrientation(window.screen.orientation.type);
		// } else {
		// 	setWindowScreenOrientation("The orientation API isn't supported in this browser.");
		// }

		setScrollHeight(document.querySelector("body").scrollHeight);
		setScrollWidth(document.querySelector("body").scrollWidth);
		setClientHeight(document.querySelector("body").clientHeight);
		setClientWidth(document.querySelector("body").clientWidth);
	}

	useEffect(() => {
		setScreenInfo();

		window.addEventListener("resize", () => {
			setScreenInfo();
		});
	}, []);

	useEffect(() => {
		const data = {
			windowHeight,
			windowWidth,
			windowAvailHeight,
			windowAvailWidth,
			windowDevicePixelRatio,
			windowDevicePixelDepth,
			windowColorDepth,
			scrollHeight,
			scrollWidth,
			clientHeight,
			clientWidth,
		};

		setWhatsMyData(data);
	}, [clientHeight, clientWidth, scrollHeight, scrollWidth, setWhatsMyData, windowAvailHeight, windowAvailWidth, windowColorDepth, windowDevicePixelDepth, windowDevicePixelRatio, windowHeight, windowWidth]);

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
				{/* <WindowInfoRow name={"window.screen.orientation.type"} value={windowScreenOrientation} /> */}
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
