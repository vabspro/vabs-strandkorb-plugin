import React, { useEffect, useState } from "react";

function ShortcodeGenerator() {
	const [shortcode, setShortcode] = useState("");
	const [type, setType] = useState("");
	const [agbLink, setAgbLink] = useState("");
	const [dsgvoLink, setDsgvoLink] = useState("");
	const [redirectLink, setRedirectLinkt] = useState("");

	const generateShortcode = () => {
		setShortcode(
			`[vabs_form type="${type}" agb="${agbLink}" datenschutz="${dsgvoLink}" redirect="${redirectLink}"]`
		);
	};

	return (
		<div className="shortcodegenerator">
			<h2>Shortcode generieren</h2>

			<div className="shortcodegenerator__form">
				<div className="shortcodegenerator__form--row">
					<p>Welche Art von Formular soll generiert werden?</p>
					<div className="shortcodegenerator__form--field">
						<label style={{ marginRight: "1.6rem" }}>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("booking");
									setShortcode("");
								}}
							/>
							Buchungsformular
						</label>

						<label style={{ marginRight: "1.6rem" }}>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("voucher");
									setShortcode("");
								}}
							/>
							Gutscheinformular
						</label>

						<label>
							<input
								type="radio"
								name="type"
								onChange={() => {
									setType("contact");
									setShortcode("");
								}}
							/>
							Kontaktformular
						</label>
					</div>
				</div>

				<div className="shortcodegenerator__form--row" style={{ marginTop: "3.2rem" }}>
					<strong>Bitte Links vervollständigen.</strong>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>AGB</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setAgbLink(e.target.value)}
							value={agbLink}
						/>
					</div>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>Datenschutz</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setDsgvoLink(e.target.value)}
							value={dsgvoLink}
						/>
					</div>
					<div className="shortcodegenerator__form--field">
						<label style={{ display: "block", marginTop: ".6rem" }}>Redirect</label>
						<input
							type="text"
							style={{ display: "block", width: "100%" }}
							onChange={(e) => setRedirectLinkt(e.target.value)}
							value={redirectLink}
						/>
					</div>
				</div>

				<div className="shortcodegenerator__form--row" style={{ marginTop: "1.6rem" }}>
					<button className="button button-primary" onClick={generateShortcode}>
						Shortcode generieren
					</button>
				</div>

				{shortcode !== "" ? (
					<div className="shortcodegenerator__form--row" style={{ marginTop: "1.6rem" }}>
						<strong>Bitte Kopieren und in deine gewünschte Seite einfügen.</strong>
						<input
							type="text"
							defaultValue={shortcode}
							style={{ display: "block", width: "100%", marginTop: ".4rem" }}
						/>
					</div>
				) : null}
			</div>
		</div>
	);
}

export default ShortcodeGenerator;
