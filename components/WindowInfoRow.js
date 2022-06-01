import { useContext, useEffect } from "react";
import { SearchQueryContext } from "../pages/_app";

export default function WindowInfoRow({ name, value }) {
	const { searchQuery } = useContext(SearchQueryContext);

	return (
		<>
			{name.toLowerCase().includes(searchQuery.toLowerCase()) ? (
				<div className="window-info__row">
					<p className="align-left">
						<code>{name}</code>:
					</p>
					<p className="align-right">{value}</p>
				</div>
			) : (
				""
			)}
		</>
	);
}
