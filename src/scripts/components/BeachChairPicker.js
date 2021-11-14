import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../context/index";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";
import { useGetBookingsId } from "../hooks/useGetBookingsId";
import ErrorMessage from "./ErrorMessage";

function BeachChairPicker() {
	const container = useRef(null);
	const { selectedLocation, beachChairs, selectedRentals, setSelectedRentals, bookings } = useContext(Context);
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
					{beachChairs
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
								Strandkorb {chair.name} am {chair.beachChairLocationName}
							</span>
						))}
				</div>
			) : null}
		</div>
	);
}

export default BeachChairPicker;
