import React, { useContext } from "react";
import { Context } from "../context/index";
import ErrorMessage from "../components/ErrorMessage";

function VoucherForm() {
	const { list, templates, voucher, setVoucher, recipient, setRecipient } = useContext(Context);

	return (
		<div className="voucherform">
			<div className="voucherform__field">
				<h3>Schritt 1</h3>
				<p>Für wen soll der Gutschein sein?</p>
				<input
					type="text"
					id="voucher-person"
					style={{ display: "block", width: "100%" }}
					value={recipient}
					onChange={(e) => setRecipient(e.target.value)}
				/>
				<ErrorMessage type="recipient" />
			</div>

			<div className="voucherform__field">
				<h3>Schritt 2</h3>
				<p>Wie hoch soll der Wert deines Gutscheins sein?</p>

				{list.length ? (
					<ul className="voucherform__field--amount">
						{list.map((item) => (
							<li
								className={voucher.item === item ? "active" : null}
								key={item.id}
								onClick={() => setVoucher({ ...voucher, item: item })}
							>
								{item.unitPrice} €
							</li>
						))}
					</ul>
				) : null}

				<ErrorMessage type="voucher_item" />
			</div>

			<div className="voucherform__field">
				<h3>Schritt 3</h3>
				<p>Welches Bild würde {recipient !== "" ? recipient : "Max Mustermann"} gefallen?</p>

				{templates.length ? (
					<ul className="voucherform__field--template">
						{templates.map((item) => (
							<li
								className={voucher.template === item ? "active" : null}
								key={item.id}
								style={{ backgroundImage: `url(${item.smallImageWebPath})` }}
								onClick={() => setVoucher({ ...voucher, template: item })}
							/>
						))}
					</ul>
				) : null}

				<ErrorMessage type="voucher_template" />
			</div>
		</div>
	);
}

export default VoucherForm;
