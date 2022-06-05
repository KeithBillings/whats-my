import { useContext, useState, useEffect, useRef } from "react";

// Data
import { SearchQueryContext } from "../pages/_app";

// Renders each row of data fed to it by <WindowInfo />. Contains data, tooltips, and links.
export default function WindowInfoRow({ value, name, tooltip, link }) {
	const { searchQuery } = useContext(SearchQueryContext);

	const [showTooltip, setShowTooltip] = useState(false);

	const windowInfoRow = useRef(null);
	const codeText = useRef(null);

	// On page load, add a listner to the code block section that will wait for a mouseover.
	// That mouseover will start a timer to display the tooltip
	useEffect(() => {
		const TOOLTIP_DELAY = 1000;
		let beginShowTooltipTimeout;

		// Begin timer to display tooltip
		codeText.current.addEventListener("mouseenter", () => {
			beginShowTooltipTimeout = setTimeout(() => {
				setShowTooltip(true);
			}, TOOLTIP_DELAY);
		});

		// Hide tooltip when cursor leaves
		codeText.current.addEventListener("mouseout", () => {
			setShowTooltip(false);
			clearTimeout(beginShowTooltipTimeout);
		});
	}, []);

	return (
		<>
			{/* Only render component if name contains search query */}
			{name.toLowerCase().includes(searchQuery.toLowerCase()) ? (
				<div className="window-info__row" ref={windowInfoRow}>
					<div className="align-left">
						{/* Link code snipped out to MDN for more info */}
						<a href={link} target="_blank" rel="noreferrer">
							<code ref={codeText}>
								{name}
								{/* If user hovers over code for long enough, tooltip will show */}
								{showTooltip ? (
									<div className="tooltip">
										<code className="tooltip__title">{name}</code>
										<p className="tooltip__description">{tooltip}</p>
										<p className="tooltip__learn-more">Click To Learn More</p>
									</div>
								) : (
									""
								)}
							</code>
							:
						</a>
					</div>
					<p className="align-right">{value}</p>
				</div>
			) : (
				""
			)}
		</>
	);
}
