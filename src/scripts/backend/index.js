import React from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from "../context";

import BookingsTable from "../modules/BookingsTable";
import ShortcodeGenerator from "../modules/ShortcodeGenerator";
import BookingForm from "../modules/BookingForm";
import OccupancyPlan from "../modules/OccupancyPlan";
import AdminSettings from "../modules/AdminSettings";

import "../../styles/backend/styles.sass";
import QRCodeGenerator from "../modules/QRCodeGenerator";

const element = document.querySelector(".vabs__dashboard");

if (element && element.dataset.type === "bookings-table") {
	ReactDOM.render(
		<ContextProvider type="booking">
			<BookingsTable />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "shortcode-generator") {
	ReactDOM.render(
		<ContextProvider>
			<ShortcodeGenerator />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "online-booking") {
	ReactDOM.render(
		<ContextProvider type="booking">
			<BookingForm />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "bookings-overview") {
	ReactDOM.render(
		<ContextProvider type="booking">
			<OccupancyPlan />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "settingsform") {
	ReactDOM.render(
		<ContextProvider>
			<AdminSettings {...element.dataset} />
		</ContextProvider>,
		element
	);
}

if (element && element.dataset.type === "qrcode-generator") {
	ReactDOM.render(
		<ContextProvider>
			<QRCodeGenerator {...element.dataset} />
		</ContextProvider>,
		element
	);
}
