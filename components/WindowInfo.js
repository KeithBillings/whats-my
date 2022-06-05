import { useState, useEffect, useContext, useRef } from "react";

// Data
import { SearchQueryContext } from "../pages/_app";
import { rowInfo } from "../data/rowInfo";

// Components
import WindowInfoRow from "./WindowInfoRow";

// This component renders the list of browser info
export default function WindowInfo({ setWhatsMyData }) {
	const { searchQuery } = useContext(SearchQueryContext);

	// --- States --- //
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

	// --- Fetching data on page load --- //
	// Send a fetch request to a server api that returns user IP Address
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

	// --- Send Data to Copy button --- //
	// This useEffect is used to create and store a JSON of all the data to be used for the copy data button. Will reduce/filter results on search query. Dynamic.
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
	// Importing all the row info, breaking it up into its respective sections
	// Contains names, tooltip text, and links
	const { windowRowInfo, bodyRowInfo } = rowInfo;

	// --- Render! --- //
	return (
		<div className="window-info">
			<section ref={ipAddressSection}>
				<h3 className="window-info__section-title">IP Address</h3>
				{"ip address".includes(searchQuery) ? <p className="ip-address">{userIPAddress}</p> : ""}
			</section>

			<section ref={windowSection}>
				<h3 className="window-info__section-title">Window</h3>
				<WindowInfoRow value={windowScreenHeight} name={windowRowInfo.windowScreenHeight.name} tooltip={windowRowInfo.windowScreenHeight.tooltip} link={windowRowInfo.windowScreenHeight.link} />
				<WindowInfoRow value={windowScreenWidth} name={windowRowInfo.windowScreenWidth.name} tooltip={windowRowInfo.windowScreenWidth.tooltip} link={windowRowInfo.windowScreenWidth.link} />
				<WindowInfoRow value={windowScreenAvailHeight} name={windowRowInfo.windowScreenAvailHeight.name} tooltip={windowRowInfo.windowScreenAvailHeight.tooltip} link={windowRowInfo.windowScreenAvailHeight.link} />
				<WindowInfoRow value={windowScreenAvailWidth} name={windowRowInfo.windowScreenAvailWidth.name} tooltip={windowRowInfo.windowScreenAvailWidth.tooltip} link={windowRowInfo.windowScreenAvailWidth.link} />
				<WindowInfoRow value={windowDevicePixelRatio} name={windowRowInfo.windowDevicePixelRatio.name} tooltip={windowRowInfo.windowDevicePixelRatio.tooltip} link={windowRowInfo.windowDevicePixelRatio.link} />
				<WindowInfoRow value={windowScreenPixelDepth} name={windowRowInfo.windowScreenPixelDepth.name} tooltip={windowRowInfo.windowScreenPixelDepth.tooltip} link={windowRowInfo.windowScreenPixelDepth.link} />
				<WindowInfoRow value={windowScreenColorDepth} name={windowRowInfo.windowScreenColorDepth.name} tooltip={windowRowInfo.windowScreenColorDepth.tooltip} link={windowRowInfo.windowScreenColorDepth.link} />
			</section>

			<section ref={bodySection}>
				<h3 className="window-info__section-title">Body</h3>
				<WindowInfoRow value={bodyScrollHeight} name={bodyRowInfo.bodyScrollHeight.name} tooltip={bodyRowInfo.bodyScrollHeight.tooltip} link={bodyRowInfo.bodyScrollHeight.link} />
				<WindowInfoRow value={bodyScrollWidth} name={bodyRowInfo.bodyScrollWidth.name} tooltip={bodyRowInfo.bodyScrollWidth.tooltip} link={bodyRowInfo.bodyScrollWidth.link} />
				<WindowInfoRow value={bodyClientHeight} name={bodyRowInfo.bodyClientHeight.name} tooltip={bodyRowInfo.bodyClientHeight.tooltip} link={bodyRowInfo.bodyClientHeight.link} />
				<WindowInfoRow value={bodyClientWidth} name={bodyRowInfo.bodyClientWidth.name} tooltip={bodyRowInfo.bodyClientWidth.tooltip} link={bodyRowInfo.bodyClientWidth.link} />
			</section>
		</div>
	);
}
