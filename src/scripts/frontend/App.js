import React, { useContext } from "react";
import ActivityIndicator from "../components/ActivityIndicator";
import RangePicker from "../components/RangePicker";
import SuccessMessage from "../components/SuccessMessage";
import ErrorMessage from "../components/ErrorMessage";
import BillingDetails from "../components/BillingDetails";
import Summary from "../components/Summary";
import FormControls from "../components/FormControls";
import { Context } from "../context/index";
import LocationPicker from "../components/LocationPicker";
import BeachChairPicker from "../components/BeachChairPicker";
import MapPicker from "../components/MapPicker";
import VoucherForm from "../modules/VoucherForm";
import { useContainerSize } from "../hooks/useContainerSize";
import ErrorFallback from "../components/ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";

function App({ type, redirect, agb, datenschutz }) {
	const { loading, success } = useContext(Context);
	const { width } = useContainerSize();
	let render = (
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

					<div className="bookingform__columns">
						<LocationPicker />
						<BeachChairPicker />
					</div>

					<MapPicker />
				</div>

				<div className="bookingform__section">
					<h3>Schritt 3</h3>
					<p>Vervollständige die persönlichen Daten</p>
					<BillingDetails />
				</div>
			</div>
			<div className="bookingfrom__aside">
				<Summary />
				<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
			</div>
		</>
	);

	if (type === "voucher") {
		render = (
			<>
				<div className="bookingform__body">
					<div className="bookingform__section">
						<VoucherForm />
					</div>

					<div className="bookingform__section">
						<h3>Schritt 4</h3>
						<p>An wen dürfen wir die Rechnung senden?</p>
						<BillingDetails />
					</div>
				</div>
				<div className="bookingfrom__aside">
					<Summary />
					<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
				</div>
			</>
		);
	}

	if (type === "contact") {
		render = (
			<>
				<div style={{ marginBottom: "2rem" }}>
					<BillingDetails />
				</div>
				<FormControls redirectLink={redirect} agbLink={agb} datenschutzLink={datenschutz} />
			</>
		);
	}
	return (
		<ErrorBoundary FallbackComponent={ErrorFallback}>
			<div className={width < 1024 ? "bookingform mobile" : "bookingform"}>
				{loading ? <ActivityIndicator /> : null}
				{success ? <SuccessMessage /> : render}
			</div>
		</ErrorBoundary>
	);
}

export default App;
