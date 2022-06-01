import { useState, useEffect, useContext, useRef } from "react";
import { SearchQueryContext } from "../pages/_app";
import WindowInfoRow from "./WindowInfoRow";

export default function WindowInfo({ setWhatsMyData }) {
	const { searchQuery } = useContext(SearchQueryContext);

	// --- Data States -- //
	// Have to set as "Loading..." initially because otherwise there is no "window" element as this is server rendered.
	// Note: Careful when naming these states, make sure they correspond with the actual object they are reading from as it will affect the search results when reading the key names in the data JSON

	// Window data
	const [windowScreenHeight, setWindowScreenHeight] = useState("Loading...");
	const [windowScreenWidth, setWindowScreenWidth] = useState("Loading...");
	const [windowScreenAvailHeight, setWindowScreenAvailHeight] = useState("Loading...");
	const [windowScreenAvailWidth, setWindowScreenAvailWidth] = useState("Loading...");
	const [windowDevicePixelRatio, setWindowDevicePixelRatio] = useState("Loading...");
	const [windowScreenPixelDepth, setWindowScreenPixelDepth] = useState("Loading...");
	const [windowScreenColorDepth, setWindowScreenColorDepth] = useState("Loading...");

	// Body data
	const [bodyScrollHeight, setBodyScrollHeight] = useState("Loading...");
	const [bodyScrollWidth, setBodyScrollWidth] = useState("Loading...");
	const [bodyClientHeight, setBodyClientHeight] = useState("Loading...");
	const [bodyClientWidth, setBodyClientWidth] = useState("Loading...");

	// Set Screen Info
	function setScreenInfo() {
		setWindowScreenHeight(window.screen.height);
		setWindowScreenWidth(window.screen.width);
		setWindowScreenAvailHeight(window.screen.availHeight);
		setWindowScreenAvailWidth(window.screen.availWidth);
		setWindowDevicePixelRatio(window.devicePixelRatio);
		setWindowScreenPixelDepth(window.screen.pixelDepth);
		setWindowScreenColorDepth(window.screen.colorDepth);

		setBodyScrollHeight(document.querySelector("body").scrollHeight);
		setBodyScrollWidth(document.querySelector("body").scrollWidth);
		setBodyClientHeight(document.querySelector("body").clientHeight);
		setBodyClientWidth(document.querySelector("body").clientWidth);
	}

	// Set all the window info values on page load then create a listener on window resize to fetch new values
	useEffect(() => {
		setScreenInfo();

		window.addEventListener("resize", () => {
			setScreenInfo();
		});
	}, []);

	// --- This useEffect is used to create and store a JSON of all the data to be used for the copy data button. Will reduce/filter results on search query. Dynamic. --- //
	useEffect(() => {
		// Compile all the current data
		const data = {
			windowScreenHeight,
			windowScreenWidth,
			windowScreenAvailHeight,
			windowScreenAvailWidth,
			windowDevicePixelRatio,
			windowScreenPixelDepth,
			windowScreenColorDepth,
			bodyScrollHeight,
			bodyScrollWidth,
			bodyClientHeight,
			bodyClientWidth,
		};

		// Set a space to hold the filtered data on search query
		let filteredData = {};

		// Map through all the keys in the "data" object and compare it against the search query. If the name of a key contains the query, fetch its corresponding entry in the "data" object and assign it to the filtered data
		Object.keys(data).map((key, index) => {
			if (key.toLowerCase().includes(searchQuery.toLowerCase().replaceAll(".", ""))) {
				filteredData[key] = data[key];
			}
		});

		setWhatsMyData(filteredData);
	}, [
		bodyClientHeight,
		bodyClientWidth,
		bodyScrollHeight,
		bodyScrollWidth,
		setWhatsMyData,
		windowScreenAvailHeight,
		windowScreenAvailWidth,
		windowScreenColorDepth,
		windowScreenPixelDepth,
		windowDevicePixelRatio,
		windowScreenHeight,
		windowScreenWidth,
		searchQuery,
	]);

	// --- Hiding Sections if they don't have search results --- //
	// Target all sections
	const windowSection = useRef(null);
	const bodySection = useRef(null);

	// On search, check to see if the sections have 1 child or less
	useEffect(() => {
		const sections = [windowSection.current, bodySection.current];

		sections.map((section) => {
			// If the section has 1 or less children, add a hide class
			// The 1 child is the tile that is always in the section
			if (section.childElementCount <= 1) {
				section.classList.add("hide-element");
			} else {
				section.classList.remove("hide-element");
			}
		});
	}, [searchQuery]);

	return (
		<div className="window-info">
			<section ref={windowSection}>
				<h3 className="window-info__section-title">Window</h3>
				<WindowInfoRow name={"window.screen.height"} value={windowScreenHeight} />
				<WindowInfoRow name={"window.screen.width"} value={windowScreenWidth} />
				<WindowInfoRow name={"window.screen.availHeight"} value={windowScreenAvailHeight} />
				<WindowInfoRow name={"window.screen.availWidth"} value={windowScreenAvailWidth} />
				<WindowInfoRow name={"window.devicePixelRatio"} value={windowDevicePixelRatio} />
				<WindowInfoRow name={"window.screen.pixelDepth"} value={windowScreenPixelDepth} />
				<WindowInfoRow name={"window.screen.colorDepth"} value={windowScreenColorDepth} />
				{/* <WindowInfoRow name={"window.screen.orientation.type"} value={windowScreenOrientation} /> */}
			</section>

			<section ref={bodySection}>
				<h3 className="window-info__section-title">Body</h3>
				<WindowInfoRow name={"body.scrollHeight"} value={bodyScrollHeight} />
				<WindowInfoRow name={"body.scrollWidth"} value={bodyScrollWidth} />
				<WindowInfoRow name={"body.clientHeight"} value={bodyClientHeight} />
				<WindowInfoRow name={"body.clientWidth"} value={bodyClientWidth} />
			</section>
		</div>
	);
}
