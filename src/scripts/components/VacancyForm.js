import moment from "moment";
import React, { useContext } from "react";
import { Context } from "../context";

function VacancyForm({ data, total, requestedDateFrom, requestedDateTo }) {
	const { setSelectedRentals } = useContext(Context);

	const addRentalsToCart = () => {
		setSelectedRentals(data);
	};

	return (
		<div className="vancancy">
			<div className="vancancy__header">
				<h2>{data.length ? "Wir sind nahezu ausgebucht." : "Wir sind ausgebucht."}</h2>
				{data.length ? (
					<p>
						{`Leider haben wir keinen einzelnen Strandkorb für Ihren gesamten Zeitraum (${moment(
							requestedDateFrom
						).format("DD.MM.YYYY")}-${moment(requestedDateTo).format(
							"DD.MM.YYYY"
						)}) frei. Wenn Sie damit einverstanden
                    sind den Strandkorb während Ihren Aufenthaltes zu wechseln, dann unterbreiten wir Ihnen folgendes
                    Angebot:`}
					</p>
				) : (
					<p>
						{`Leider haben wir in Ihrem gewählten Zeitraum (${moment(requestedDateFrom).format(
							"DD.MM.YYYY"
						)}-${moment(requestedDateTo).format("DD.MM.YYYY")}) keine Strandkörbe frei.`}
					</p>
				)}
			</div>
			{data.length ? (
				<>
					<div className="vancancy__body">
						<ul>
							{data.map((r) => (
								<li key={r.id}>
									<span>{`Strandkorb ${r.name}`}</span>
									<span>{`vom ${moment(r.dateFrom).format("DD.MM.YYYY")} bis ${moment(
										r.dateTo
									).format("DD.MM.YYYY")}`}</span>
									<span>{r.unitPrice}€</span>
								</li>
							))}
						</ul>
						<div className="price">
							<strong>Gesamtpreis:</strong>
							<strong>{total}€</strong>
						</div>
					</div>
					<div className="vancancy__footer">
						<button onClick={addRentalsToCart}>zur Auswahl hinzufügen</button>
					</div>
				</>
			) : null}
		</div>
	);
}

export default VacancyForm;
