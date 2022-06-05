import { useRef } from "react";

// Renders a copy button that recieves its data from <WindowInfo />
// When used, copies the filtered data as a JSON format to the user's clipboard.
export default function CopyButton({ whatsMyData }) {
	const buttonText = useRef(null);

	function handleClick() {
		navigator.clipboard.writeText(JSON.stringify(whatsMyData));

		// Change the text in the copy button temporarily
		buttonText.current.innerHTML = "Copied!";
		setTimeout(() => {
			buttonText.current.innerHTML = "Copy Data";
		}, 3000);
	}

	return (
		<div className="copy-button" onClick={handleClick}>
			<p ref={buttonText}>Copy Data</p>
		</div>
	);
}
