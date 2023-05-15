import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/index";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";
import { useGetBookingsId } from "../hooks/useGetBookingsId";
import ErrorMessage from "./ErrorMessage";

function BeachChairPicker() {
	const container = useRef(null);
	const {
		selectedLocation,
		beachChairs,
		selectedRentals,
		setSelectedRentals,
		bookings,
		disabledChairDates,
		startDate,
		endDate,
	} = useContext(Context);
	const [visible, setVisible] = useState(false);

	useOutsideClickHandler(container, () => setVisible(false));

	const bookedPlaces = useGetBookingsId({ bookings });

	return (
		<div className="picker" ref={container}>
			<div
				className="picker__input"
				onClick={() => {
					if (!selectedLocation) {
						window.alert("Bitte wählen Sie zuerst einen Strandabschnitt aus.");
					} else {
						setVisible(true);
					}
				}}
			>
				<span className="picker__placeholder">Strandkorb</span>
				{selectedRentals.length
					? selectedRentals.map((chair) => <span key={chair.id}>Strandkorb {chair.name}</span>)
					: null}
			</div>
			{visible && beachChairs ? (
				<div className="picker__list">
					{selectedLocation.online ? (
						beachChairs
							.filter((rental) => {
								let offline = false;
								console.log({ startDate, endDate });
								if (disabledChairDates[rental.id]) {
									const isIncluded = disabledChairDates[rental.id].find(
										(arrayOfDates) =>
											arrayOfDates.includes(startDate) || arrayOfDates.includes(endDate)
									);
									if (isIncluded) {
										offline = true;
									}
								}

								return !offline;
							})
							.filter(
								(chair) =>
									selectedLocation.id === chair.beachChairLocationId &&
									!bookedPlaces.includes(chair.name) &&
									chair.online
							)

							.map((chair) => (
								<span
									className="picker__item"
									key={chair.id}
									onClick={() => {
										if (!selectedRentals.find((c) => c === chair)) {
											setSelectedRentals([...selectedRentals, chair]);
										} else {
											setSelectedRentals([...selectedRentals.filter((c) => c !== chair)]);
										}
									}}
								>
									{selectedRentals.find((c) => c === chair) ? (
										<input type="checkbox" checked style={{ marginRight: 8 }} />
									) : (
										<input type="checkbox" style={{ marginRight: 8 }} />
									)}
									Strandkorb {chair.name} am {chair.beachChairLocationName}
								</span>
							))
					) : (
						<span style={{ padding: 8, display: "block" }}>
							Leider ist dieser Strandabschnitt in deinem Zeitraum noch nicht buchbar.
						</span>
					)}
				</div>
			) : null}
		</div>
	);
}

export default BeachChairPicker;
