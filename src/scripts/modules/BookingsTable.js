import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/index";
import ActivityIndicator from "../components/ActivityIndicator";
import Flatpickr from "react-flatpickr";
import { German } from "flatpickr/dist/l10n/de.js";
import moment from "moment";

function BookingsTable() {
	const startPickr = useRef(null);
	const endPickr = useRef(null);
	const { bookings, loading, setLoading, startDate, setStartDate, endDate, setEndDate, setCurrentYear } =
		useContext(Context);
	const [start, setStart] = useState(startDate ? startDate : moment().format("YYYY-MM-DD"));
	const [end, setEnd] = useState(endDate ? endDate : moment().add("days", 7).format("YYYY-MM-DD"));

	useEffect(() => {
		setStartDate(moment().format("YYYY-MM-DD"));
		setEndDate(moment().add("days", 7).format("YYYY-MM-DD"));
	}, []);

	const handleButtonClick = () => {
		setLoading(true);
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<div className="bookingstable">
			<div className="bookingstable__header">
				<h2>
					Buchungsübersicht{" "}
					{start && end
						? `vom ${moment(start).format("DD.MM.YYYY")} bis ${moment(end).format("DD.MM.YYYY")}`
						: null}
				</h2>
				<div className="bookingstable__header--columns">
					<div className="bookingstable__header--column">
						<label>Anreise</label>
						<Flatpickr
							ref={startPickr}
							options={{
								dateFormat: "d.m.Y",
								locale: German,
								disableMobile: true,
							}}
							value={moment(start).format("DD.MM.YYYY")}
							onChange={(date) => setStart(moment(date[0]).format("YYYY-MM-DD"))}
							onYearChange={() => setCurrentYear(startPickr.current.flatpickr.currentYear)}
							placeholder="DD.MM.JJJJ"
						/>
					</div>
					<div className="bookingstable__header--column">
						<label>Abreise</label>
						<Flatpickr
							ref={endPickr}
							options={{
								dateFormat: "d.m.Y",
								locale: German,
								disableMobile: true,
								minDate: moment(start).format("DD.MM.YYYY"),
							}}
							value={moment(end).format("DD.MM.YYYY")}
							onChange={(date) => setEnd(moment(date[0]).format("YYYY-MM-DD"))}
							onYearChange={() => setCurrentYear(startPickr.current.flatpickr.currentYear)}
							placeholder="DD.MM.JJJJ"
						/>
					</div>
					<div className="bookingstable__header--column">
						<button className="button button-primary" onClick={handleButtonClick}>
							Zeitraum übernehmen
						</button>
					</div>
				</div>
			</div>
			<div className="bookingstable__body">
				{bookings?.length ? (
					<table>
						<thead>
							<tr>
								<th>Strandkorb</th>
								<th>Kunde</th>
								<th>von</th>
								<th>bis</th>
							</tr>
						</thead>

						<tbody>
							{bookings.map((booking, index) => (
								<tr key={index}>
									<td>{booking.name}</td>
									<td>{booking.fullName}</td>

									<td>{moment(booking.dateFrom).format("DD.MM.YYYY")}</td>
									<td>{moment(booking.dateTo).format("DD.MM.YYYY")}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<ActivityIndicator />
				)}
			</div>
		</div>
	);
}

export default BookingsTable;
