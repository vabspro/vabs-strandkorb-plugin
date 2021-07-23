import React, { useContext } from "react";
import { Context } from "../context/index";
import ErrorMessage from "./ErrorMessage";

function BillingDetails() {
	const { contact } = useContext(Context);

	return (
		<div className="billingdetails">
			<div className="billingdetails__row">
				<div className="billingdetails__field">
					<label>Vorname</label>
					<input
						type="text"
						value={contact.firstName}
						onChange={(e) => contact.setFirstName(e.target.value)}
					/>
					<ErrorMessage type="firstName" />
				</div>
				<div className="billingdetails__field">
					<label>Nachname</label>
					<input type="text" value={contact.lastName} onChange={(e) => contact.setLastName(e.target.value)} />
					<ErrorMessage type="lastName" />
				</div>
			</div>

			<div className="billingdetails__row" style={{ gridTemplateColumns: "calc(80% - 1rem) 20%" }}>
				<div className="billingdetails__field">
					<label>Strasse</label>
					<input type="text" value={contact.street} onChange={(e) => contact.setStreet(e.target.value)} />
					<ErrorMessage type="street" />
				</div>
				<div className="billingdetails__field">
					<label>Hausnummer</label>
					<input type="text" value={contact.number} onChange={(e) => contact.setNumber(e.target.value)} />
					<ErrorMessage type="number" />
				</div>
			</div>

			<div className="billingdetails__row" style={{ gridTemplateColumns: "30% calc(70% - 1rem)" }}>
				<div className="billingdetails__field">
					<label>PLZ</label>
					<input type="text" value={contact.zipCode} onChange={(e) => contact.setZipCode(e.target.value)} />
					<ErrorMessage type="zipCode" />
				</div>
				<div className="billingdetails__field">
					<label>Ort</label>
					<input type="text" value={contact.city} onChange={(e) => contact.setCity(e.target.value)} />
					<ErrorMessage type="city" />
				</div>
			</div>

			<div className="billingdetails__field">
				<label>Emailadresse</label>
				<input type="text" value={contact.email} onChange={(e) => contact.setEmail(e.target.value)} />
				<ErrorMessage type="email" />
			</div>

			<div className="billingdetails__field">
				<label>Telefonnummer</label>
				<input type="text" value={contact.mobile} onChange={(e) => contact.setMobile(e.target.value)} />
				<ErrorMessage type="mobile" />
			</div>

			<div className="billingdetails__field">
				<label>Bemerkung</label>
				<textarea value={contact.message} onChange={(e) => contact.setMessage(e.target.value)} />
			</div>
		</div>
	);
}

export default BillingDetails;
