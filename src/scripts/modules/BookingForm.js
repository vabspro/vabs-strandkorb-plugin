import React, { useContext } from "react";
import BeachChairPicker from "../components/BeachChairPicker";
import Summary from "../components/Summary";
import LocationPicker from "../components/LocationPicker";
import MapPicker from "../components/MapPicker";
import RangePicker from "../components/RangePicker";
import BillingDetails from "../components/BillingDetails";
import { Context } from "../context/index";
import ActivityIndicator from "../components/ActivityIndicator";
import FormControls from "../components/FormControls";
import ErrorMessage from "../components/ErrorMessage";
import SuccessMessage from "../components/SuccessMessage";
import TableModule from "./TableModule";
import { useContainerSize } from "../hooks/useContainerSize";

function BookingForm() {
	const { loading, success } = useContext(Context);
	return (
		<div className="bookingform">
			{loading ? <ActivityIndicator /> : null}
			{success ? (
				<SuccessMessage />
			) : (
				<>
					<div className="bookingform__body">
						<div className="bookingform__section">
							<h3>Schritt 1</h3>
							<p>wähle einen Tag oder Zeitraum</p>
							<RangePicker />
						</div>

						<div className="bookingform__section">
							<h3>Schritt 2</h3>
							<p>Strandkorb wählen</p>
							<ErrorMessage type="selectedRentals" />

							<TableModule />
						</div>

						<div className="bookingform__section">
							<h3>Schritt 3</h3>
							<p>Vervollständige die persönlichen Daten</p>
							<BillingDetails />
						</div>
					</div>
					<div className="bookingfrom__aside">
						<Summary />
						<FormControls />
					</div>
				</>
			)}
		</div>
	);
}

export default BookingForm;
