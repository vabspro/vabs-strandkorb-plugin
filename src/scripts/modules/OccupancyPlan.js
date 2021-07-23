import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";

import moment from "moment";
import "moment/locale/de";
import ActivityIndicator from "../components/ActivityIndicator";
import { useCalendar } from "../hooks/useCalendar";

moment.locale("de");

function OccupancyPlan() {
	const { loading, beachChairs, bookings, setStartDate, setEndDate } = useContext(Context);
	const [month, setMonth] = useState(moment().format("YYYY-MM-DD"));
	const [sortedChairs, setSortedChairs] = useState([]);
	const calendar = useCalendar({ month });

	const handlePrevMontClick = () => {
		setMonth(moment(month).subtract(1, "month").format("YYYY-MM-DD"));
	};

	const handleNextMontClick = () => {
		setMonth(moment(month).add(1, "month").format("YYYY-MM-DD"));
	};

	useEffect(() => {
		if (month) {
			setStartDate(moment(month).startOf("month").format("YYYY-MM-DD"));
			setEndDate(moment(month).endOf("month").format("YYYY-MM-DD"));
		}
	}, [month]);

	useEffect(() => {
		if (beachChairs) {
			setSortedChairs(
				beachChairs.sort((a, b) => {
					if (a.name < b.name) {
						return -1;
					}
					if (a.name > b.name) {
						return 1;
					}
					return 0;
				})
			);
		}
	}, [beachChairs]);

	return (
		<div className="occupancyplan">
			<div className="occupancyplan__header">
				<div className="occupancyplan__header--columns">
					<h2>Beleguingsplan für {moment(month).format("MMMM YYYY")}</h2>
					<button style={{ marginRight: ".4rem" }} onClick={handlePrevMontClick}>
						vorheriger Monat
					</button>
					<button onClick={handleNextMontClick}>nächster Monat</button>
				</div>
			</div>
			<div className="occupancyplan__body">
				<div className="occupancyplan__body--aside">
					{sortedChairs &&
						sortedChairs.map((chair) => (
							<div
								key={chair.id}
								className="occupancyplan__body--aside-name"
							>{`Strandkorb ${chair.name}`}</div>
						))}
				</div>
				<div className="occupancyplan__body--calendar">
					{!loading ? (
						sortedChairs.map((chair, index) => {
							const range = [];
							const customerList = [];
							const chairBookings = bookings.filter((booking) => booking.id == chair.id);
							chairBookings.forEach((elem) => {
								if (elem.range.length) {
									elem.range.forEach((date) => {
										range.push(date);
										customerList.push({ date, customer: elem });
									});
								}
							});

							return (
								<div className="occupancyplan__body--calendar-row" key={index}>
									{calendar
										? calendar.map((day) => (
												<span
													className="occupancyplan__body--calendar-day"
													key={day}
													style={{
														backgroundColor: range.includes(day)
															? "red"
															: !chair.online
															? "grey"
															: "green",
													}}
												>
													{moment(day).format("DD")}
												</span>
										  ))
										: null}
								</div>
							);
						})
					) : (
						<ActivityIndicator />
					)}
				</div>
			</div>
		</div>
	);
}

export default OccupancyPlan;
