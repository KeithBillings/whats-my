import { useState, useEffect } from "react";

export default function WindowSizes() {
	const [windowHeight, setWindowHeight] = useState("Loading...");
	const [windowWidth, setWindowWidth] = useState("Loading...");
	const [windowAvailHeight, setWindowAvailHeight] = useState("Loading...");
	const [windowAvailWidth, setWindowAvailWidth] = useState("Loading...");
	const [windowDevicePixelRatio, setWindowDevicePixelRatio] = useState("Loading...");

	function setScreenSizes() {
		setWindowHeight(window.screen.height);
		setWindowWidth(window.screen.width);
		setWindowAvailHeight(window.screen.availHeight);
		setWindowAvailWidth(window.screen.availWidth);
		setWindowDevicePixelRatio(window.devicePixelRatio);
	}

	useEffect(() => {
		setScreenSizes();

		window.addEventListener("resize", () => {
			setScreenSizes();
		});
	}, []);

	return (
		<div className="window-sizes">
			<div className="window-sizes__row">
				<p className="align-left">
					<code>window.screen.height</code>:
				</p>
				<p className="align-right">{windowHeight}</p>
			</div>
			<div className="window-sizes__row">
				<p className="align-left">
					<code>window.screen.width</code>:
				</p>
				<p className="align-right">{windowWidth}</p>
			</div>
			<div className="window-sizes__row">
				<p className="align-left">
					<code>window.screen.availHeight</code>:
				</p>
				<p className="align-right">{windowAvailHeight}</p>
			</div>
			<div className="window-sizes__row">
				<p className="align-left">
					<code>window.screen.availWidth</code>:
				</p>
				<p className="align-right">{windowAvailWidth}</p>
			</div>
			<div className="window-sizes__row">
				<p className="align-left">
					<code>window.devicePixelRatio</code>:
				</p>
				<p className="align-right">{windowDevicePixelRatio}</p>
			</div>
		</div>
	);
}
