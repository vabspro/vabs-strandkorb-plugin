import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";
import moment from "moment";

function Summary() {
	const [totalPrice, setTotalPrice] = useState(null);
	const { contact, startDate, endDate, selectedRentals, voucher, recipient, prices, selectedRentalsMessage } =
		useContext(Context);

	useEffect(() => {
		if (prices.length) {
			let total = 0;
			for (let index = 0; index < prices.length; index++) {
				const element = prices[index];
				total += element.price;
			}

			setTotalPrice(`${total}€`);
		}
	}, [prices]);

	return (
		<div className="summary">
			<h3>Zusammenfassung & Buchung</h3>
			<div className="summary__container">
				<div className="summary__section">
					{startDate || endDate ? (
						<>
							<strong>Zeitraum</strong>
							<p>
								{startDate ? moment(startDate).format("DD.MM.YYYY") : null}
								{endDate
									? ` - ${moment(endDate).format("DD.MM.YYYY")}`
									: ` - ${moment(startDate).format("DD.MM.YYYY")}`}
							</p>
						</>
					) : null}

					{contact.firstName ||
					contact.lastName ||
					contact.street ||
					contact.number ||
					contact.zipCode ||
					contact.city ||
					contact.mobile ||
					contact.email ? (
						<>
							<strong>Anschrift</strong>
							<p>
								{contact.firstName} {contact.lastName} <br />
								{contact.street} {contact.number} <br />
								{contact.zipCode} {contact.city}
								<br />
								<br />
								{contact.mobile}
								<br />
								{contact.email}
							</p>
						</>
					) : null}
				</div>
				<div className="summary__section">
					<strong>Zusammenfassung</strong>
					{selectedRentalsMessage && !selectedRentals.length && (
						<div className="notification">{selectedRentalsMessage}</div>
					)}

					{selectedRentals.length ? (
						<ul>
							{selectedRentals.map((chair) => (
								<li key={chair.id}>
									<p>Strandkorb {chair.name}</p>
									<p>
										{prices.length && prices.find((price) => price.id === chair.id)
											? `${prices.find((price) => price.id === chair.id)?.price}€`
											: "-"}
									</p>
								</li>
							))}

							<li>
								<strong>Summe</strong>
								<strong>{totalPrice}</strong>
							</li>
						</ul>
					) : null}

					{voucher.item || voucher.template ? (
						<li className="summary__section--voucher">
							<div
								className="summary__section--voucher-image"
								style={{ backgroundImage: `url(${voucher.template?.smallImageWebPath})` }}
							/>
							<div className="summary__section--voucher-recipient">
								<span>Empfänger</span>
								{recipient}
							</div>
							<div className="summary__section--voucher-price">
								<span>Wert</span>
								{voucher.item ? `${voucher.item?.unitPrice}€` : null}
							</div>
						</li>
					) : null}

					{contact.message ? (
						<>
							<strong>Bemerkung</strong>
							<p>{contact.message}</p>
						</>
					) : null}
				</div>
			</div>
		</div>
	);
}

export default Summary;
