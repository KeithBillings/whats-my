import Link from "next/link";

export default function ExternalLinks() {
	return (
		<div className="external-links">
			<p>
				How to find your screen resolution on a:{" "}
				<a href="https://www.wikihow.com/Check-Your-Screen-Resolution#Mac" target="_blank" rel="noreferrer">
					Mac,{" "}
				</a>
				<a href="https://www.wikihow.com/Check-Your-Screen-Resolution#Windows" target="_blank" rel="noreferrer">
					PC,{" "}
				</a>
				<a href="https://www.wikihow.com/Check-Your-Screen-Resolution#Chromebook" target="_blank" rel="noreferrer">
					Chromebook
				</a>
			</p>
			<p>
				<a href="https://www.speedtest.net/" target="_blank" rel="noreferrer">
					Check your internet speed
				</a>
			</p>
			<p>
				<a href="https://cash.app/$CowboyKeithBop">
					Buy me a cup of coffee ☕️
				</a>
			</p>
		</div>
	);
}
