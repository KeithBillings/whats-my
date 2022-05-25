export default function WindowSizesRow({ name, value }) {
	return (
		<div className="window-sizes__row">
			<p className="align-left">
				<code>{name}</code>:
			</p>
			<p className="align-right">{value}</p>
		</div>
	);
}
