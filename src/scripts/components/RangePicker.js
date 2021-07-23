import React, { useContext, useRef } from "react";
import Flatpickr from "react-flatpickr";
import { German } from "flatpickr/dist/l10n/de.js";
import moment from "moment";
import { Context } from "../context/index";
import ErrorMessage from "./ErrorMessage";

function RangePicker() {
	const startPickr = useRef(null);
	const endPickr = useRef(null);
	const { startDate, setStartDate, setEndDate, setCurrentYear, disabledDates } = useContext(Context);

	return (
		<div className="range">
			<div className="range__container">
				<div className="range__input">
					<Flatpickr
						ref={startPickr}
						options={{
							dateFormat: "d.m.Y",
							locale: German,
							disableMobile: true,
							disable: disabledDates,
						}}
						onChange={(date) => setStartDate(moment(date[0]).format("YYYY-MM-DD"))}
						onYearChange={() => setCurrentYear(startPickr.current.flatpickr.currentYear)}
						placeholder="DD.MM.JJJJ"
					/>
				</div>
				<div className="range__input">
					<Flatpickr
						ref={endPickr}
						options={{
							dateFormat: "d.m.Y",
							locale: German,
							disableMobile: true,
							disable: disabledDates,
							minDate: moment(startDate).format("DD.MM.YYYY"),
						}}
						onChange={(date) => setEndDate(moment(date[0]).format("YYYY-MM-DD"))}
						onYearChange={() => setCurrentYear(startPickr.current.flatpickr.currentYear)}
						placeholder="DD.MM.JJJJ"
					/>
				</div>
			</div>
			<ErrorMessage type="startDate" />
		</div>
	);
}

export default RangePicker;
