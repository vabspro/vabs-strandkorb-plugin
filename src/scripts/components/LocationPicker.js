import React, { useContext, useRef, useState } from "react";
import { Context } from "../context/index";
import { useOutsideClickHandler } from "../hooks/useOutsideClickHandler";

function LocationPicker() {
	const container = useRef(null);
	const { locations, selectedLocation, setSelectedLocation, startDate } = useContext(Context);
	const [visible, setVisible] = useState(false);
	useOutsideClickHandler(container, () => setVisible(false));
	return (
		<div className="picker" ref={container}>
			<div
				className="picker__input"
				onClick={() => {
					if (!startDate) {
						window.alert("Bitte wählen Sie zuerst einen Reisezeitraum aus.");
					} else {
						setVisible(true);
					}
				}}
			>
				<span className="picker__placeholder">Strandabschnitt</span>
				{selectedLocation ? <span key={selectedLocation.id}>{selectedLocation.name}</span> : null}
			</div>
			{visible && locations ? (
				<div className="picker__list">
					{locations.map((location) => (
						<span
							className="picker__item"
							key={location.id}
							onClick={() => {
								if (setSelectedLocation === location) {
									setSelectedLocation(null);
									setVisible(false);
								} else {
									setSelectedLocation(location);
									setVisible(false);
								}
							}}
						>
							{location.name}
						</span>
					))}
				</div>
			) : null}
		</div>
	);
}

export default LocationPicker;
