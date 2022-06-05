// To be rendered in <WindowInfo /> by forming multiple <WindowInfoRow />
export const rowInfo = {
	windowRowInfo: {
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
	},
	bodyRowInfo: {
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
	},
};
