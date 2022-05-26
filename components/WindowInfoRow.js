export default function WindowInfoRow({ name, value }) {
	return (
		<div className="window-info__row">
			<p className="align-left">
				<code>{name}</code>:
			</p>
			<p className="align-right">{value}</p>
		</div>
	);
}
