import { useState, useEffect, useContext, useRef } from "react";
import { SearchQueryContext } from "../pages/_app";

import WindowInfoRow from "./WindowInfoRow";

export default function WindowInfo({ setWhatsMyData }) {
	const { searchQuery } = useContext(SearchQueryContext);

	// --- Data States -- //
	// Have to set as "Loading..." initially because otherwise there is no "window" element as this is server rendered.
	// Note: Careful when naming these states, make sure they correspond with the actual object they are reading from as it will affect the search results when reading the key names in the data JSON

	// IP Address
	const [userIPAddress, setUserIPAddress] = useState("Loading...");

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

	// Send a fetch request to a server api that returns ip address
	function fetchUserIPAddress() {
		fetch("https://api.ipify.org/?format=json")
			.then((res) => res.json())
			.then((data) => setUserIPAddress(data.ip));
	}

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
		fetchUserIPAddress();
		setScreenInfo();

		window.addEventListener("resize", () => {
			setScreenInfo();
		});
	}, []);

	// --- This useEffect is used to create and store a JSON of all the data to be used for the copy data button. Will reduce/filter results on search query. Dynamic. --- //
	useEffect(() => {
		// Compile all the current data
		const data = {
			userIPAddress,
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
		searchQuery,
		userIPAddress,
		windowScreenAvailHeight,
		windowScreenAvailWidth,
		windowScreenColorDepth,
		windowScreenPixelDepth,
		windowDevicePixelRatio,
		windowScreenHeight,
		windowScreenWidth,
		bodyClientHeight,
		bodyClientWidth,
		bodyScrollHeight,
		bodyScrollWidth,
		setWhatsMyData,
	]);

	// --- Hiding Sections if they don't have search results --- //
	// Target all sections
	const ipAddressSection = useRef(null);
	const windowSection = useRef(null);
	const bodySection = useRef(null);

	// On search, check to see if the sections have 1 child or less
	useEffect(() => {
		// Make array of all the sections we can search in
		const sections = [ipAddressSection.current, windowSection.current, bodySection.current];

		// Iterate over each one to check child count
		sections.map((section) => {
			// If the section has 1 or less children, add a hide class to section
			// Note: The 1 permanent child is the section title. That's why we are not checking for 0.
			if (section.childElementCount <= 1) {
				section.classList.add("hide-element");
			} else {
				section.classList.remove("hide-element");
			}
		});
	}, [searchQuery]);

	// --- Row Info --- //
	const rowInfo = {
		windowScreenHeight: {
			name: "window.screen.height",
			tooltip: "The Screen.height read-only property returns the height of the screen in pixels.",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/height",
		},
		windowScreenWidth: {
			name: "window.screen.width",
			tooltip: "The Screen.width read-only property returns the width of the screen in CSS pixels.",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/width",
		},
		windowScreenAvailHeight: {
			name: "window.screen.availHeight",
			tooltip: `The read-only Screen interface's availHeight property returns the height, in CSS pixels, of the space available for Web content on the screen. Since Screen is exposed on the Window interface's window.screen property, you access availHeight using window.screen.availHeight. You can similarly use Screen.availWidth to get the number of pixels which are horizontally available to the browser for its use.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/availHeight",
		},
		windowScreenAvailWidth: {
			name: "window.screen.availWidth",
			tooltip: `The Screen.availWidth property returns the amount of horizontal space (in pixels) available to the window.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/availWidth",
		},
		windowDevicePixelRatio: {
			name: "window.devicePixelRatio",
			tooltip: `The devicePixelRatio of Window interface returns the ratio of the resolution in physical pixels to the resolution in CSS pixels for the current display device. This value could also be interpreted as the ratio of pixel sizes: the size of one CSS pixel to the size of one physical pixel. In simpler terms, this tells the browser how many of the screen's actual pixels should be used to draw a single CSS pixel.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio",
		},
		windowScreenPixelDepth: {
			name: "window.screen.pixelDepth",
			tooltip: `Returns the bit depth of the screen. Per the CSSOM, some implementations return 24 for compatibility reasons.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/pixelDepth",
		},
		windowScreenColorDepth: {
			name: "window.screen.colorDepth",
			tooltip: "The Screen.colorDepth read-only property returns the color depth of the screen. Per the CSSOM, some implementations return 24 for compatibility reasons.",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth",
		},
		bodyScrollHeight: {
			name: "body.scrollHeight",
			tooltip: "The Element.scrollHeight read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow.",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight",
		},
		bodyScrollHeight: {
			name: "body.scrollHeight",
			tooltip: "The Element.scrollHeight read-only property is a measurement of the height of an element's content, including content not visible on the screen due to overflow.",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight",
		},
		bodyScrollWidth: {
			name: "body.scrollWidth",
			tooltip: `The Element.scrollWidth read-only property is a measurement of the width of an element's content, including content not visible on the screen due to overflow.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollWidth",
		},
		bodyClientHeight: {
			name: "body.clientHeight",
			tooltip: `The Element.clientHeight read-only property is zero for elements with no CSS or inline layout boxes; otherwise, it's the inner height of an element in pixels.`,
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight",
		},
		bodyClientWidth: {
			name: "body.clientWidth",
			tooltip: "The Element.clientWidth property is zero for inline elements and elements with no CSS; otherwise, it's the inner width of an element in pixels. It includes padding but excludes borders, margins, and vertical scrollbars (if present).",
			link: "https://developer.mozilla.org/en-US/docs/Web/API/Element/clientWidth",
		},
	};

	return (
		<div className="window-info">
			<section ref={ipAddressSection}>
				<h3 className="window-info__section-title">IP Address</h3>
				{"ip address".includes(searchQuery) ? <p className="ip-address">{userIPAddress}</p> : ""}
			</section>

			<section ref={windowSection}>
				<h3 className="window-info__section-title">Window</h3>
				<WindowInfoRow value={windowScreenHeight} name={rowInfo.windowScreenHeight.name} tooltip={rowInfo.windowScreenHeight.tooltip} link={rowInfo.windowScreenHeight.link} />
				<WindowInfoRow value={windowScreenWidth} name={rowInfo.windowScreenWidth.name} tooltip={rowInfo.windowScreenWidth.tooltip} link={rowInfo.windowScreenWidth.link} />
				<WindowInfoRow value={windowScreenAvailHeight} name={rowInfo.windowScreenAvailHeight.name} tooltip={rowInfo.windowScreenAvailHeight.tooltip} link={rowInfo.windowScreenAvailHeight.link} />
				<WindowInfoRow value={windowScreenAvailWidth} name={rowInfo.windowScreenAvailWidth.name} tooltip={rowInfo.windowScreenAvailWidth.tooltip} link={rowInfo.windowScreenAvailWidth.link} />
				<WindowInfoRow value={windowDevicePixelRatio} name={rowInfo.windowDevicePixelRatio.name} tooltip={rowInfo.windowDevicePixelRatio.tooltip} link={rowInfo.windowDevicePixelRatio.link} />
				<WindowInfoRow value={windowScreenPixelDepth} name={rowInfo.windowScreenPixelDepth.name} tooltip={rowInfo.windowScreenPixelDepth.tooltip} link={rowInfo.windowScreenPixelDepth.link} />
				<WindowInfoRow value={windowScreenColorDepth} name={rowInfo.windowScreenColorDepth.name} tooltip={rowInfo.windowScreenColorDepth.tooltip} link={rowInfo.windowScreenColorDepth.link} />
			</section>

			<section ref={bodySection}>
				<h3 className="window-info__section-title">Body</h3>
				<WindowInfoRow value={bodyScrollHeight} name={rowInfo.bodyScrollHeight.name} tooltip={rowInfo.bodyScrollHeight.tooltip} link={rowInfo.bodyScrollHeight.link} />
				<WindowInfoRow value={bodyScrollWidth} name={rowInfo.bodyScrollWidth.name} tooltip={rowInfo.bodyScrollWidth.tooltip} link={rowInfo.bodyScrollWidth.link} />
				<WindowInfoRow value={bodyClientHeight} name={rowInfo.bodyClientHeight.name} tooltip={rowInfo.bodyClientHeight.tooltip} link={rowInfo.bodyClientHeight.link} />
				<WindowInfoRow value={bodyClientWidth} name={rowInfo.bodyClientWidth.name} tooltip={rowInfo.bodyClientWidth.tooltip} link={rowInfo.bodyClientWidth.link} />
			</section>
		</div>
	);
}
