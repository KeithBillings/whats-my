import { useRef } from "react";

export default function CopyButton({ whatsMyData }) {
	const buttonText = useRef(null);

	function handleClick() {
		navigator.clipboard.writeText(JSON.stringify(whatsMyData));

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
