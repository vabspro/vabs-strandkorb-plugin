import React, { useContext, useEffect, useState, useRef } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { Context } from "../context/index";
import { useFilteredRentals } from "../hooks/useFilteredRentals";
import { useGetBookingsId } from "../hooks/useGetBookingsId";

const Card = ({ chair, onClose, onSelect, onRemove, online, selected }) => {
	const { name, beachChairTypeName, picture } = chair;

	return (
		<div className="mappicker__card">
			<div className="mappicker__card--container">
				<div className="mappicker__card--close" onClick={onClose}>
					<svg viewBox="0 0 47.971 47.971">
						<path d="m28.228 23.986 18.864-18.864c1.172-1.171 1.172-3.071 0-4.242-1.172-1.172-3.07-1.172-4.242 0l-18.864 18.864-18.865-18.864c-1.172-1.172-3.07-1.172-4.242 0-1.172 1.171-1.172 3.071 0 4.242l18.865 18.864-18.865 18.864c-1.172 1.171-1.172 3.071 0 4.242.586.585 1.354.878 2.121.878s1.535-.293 2.121-.879l18.865-18.864 18.864 18.864c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879c1.172-1.171 1.172-3.071 0-4.242z" />
					</svg>
				</div>
				<div
					className="mappicker__card--header"
					style={{
						backgroundImage: picture !== "" ? picture : null,
					}}
				/>
				<div className="mappicker__card--body">
					<div>
						<strong style={{ display: "block" }}>Strandkorb Nummer: {name}</strong>
						<span style={{ display: "block" }}>Modell: {beachChairTypeName}</span>
					</div>

					{online ? (
						<span
							className="mappicker__card--button"
							onClick={() => {
								if (selected) {
									onRemove();
									onClose();
								} else {
									onSelect();
									onClose();
								}
							}}
						>
							{selected ? "entfernen" : "auswählen"}
						</span>
					) : null}
				</div>
			</div>
		</div>
	);
};

const Layer = ({ layer, onClose }) => {
	const { beachChairs, setSelectedRentals, selectedRentals, bookings } = useContext(Context);
	const filterdRentals = useFilteredRentals({ beachChairs, layer });
	const bookedPlaces = useGetBookingsId({ bookings });
	const [chair, setChair] = useState(null);

	return (
		<div className="mappicker__layer">
			<div className="mappicker__layer--close" onClick={onClose}>
				<svg viewBox="0 0 492 492" style={{ width: 16 }}>
					<path d="m464.344 207.418.768.168h-329.224l103.496-103.724c5.068-5.064 7.848-11.924 7.848-19.124s-2.78-14.012-7.848-19.088l-16.104-16.112c-5.064-5.064-11.812-7.864-19.008-7.864-7.2 0-13.952 2.78-19.016 7.844l-177.412 177.396c-5.084 5.084-7.864 11.856-7.844 19.06-.02 7.244 2.76 14.02 7.844 19.096l177.412 177.412c5.064 5.06 11.812 7.844 19.016 7.844 7.196 0 13.944-2.788 19.008-7.844l16.104-16.112c5.068-5.056 7.848-11.808 7.848-19.008 0-7.196-2.78-13.592-7.848-18.652l-104.664-104.304h329.992c14.828 0 27.288-12.78 27.288-27.6v-22.788c0-14.82-12.828-26.6-27.656-26.6z" />
				</svg>
			</div>

			<div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
				<h2 style={{ fontSize: "4rem", color: "rgba(0,0,0,.2)" }}>{layer.name}</h2>
			</div>

			<div className="mappicker__layer--rows">
				{Object.keys(filterdRentals).map((name) => (
					<div className="mappicker__layer--row" key={name}>
						{filterdRentals[name].map((chair) => (
							<span
								key={chair.id}
								onClick={() => setChair(chair)}
								className={
									!layer.online || !chair.online || bookedPlaces.includes(chair.name)
										? "mappicker__layer--chair disabled"
										: "mappicker__layer--chair"
								}
							>
								{selectedRentals.find((rental) => rental.id == chair.id) ? <i /> : null}
								{chair.name}
							</span>
						))}
					</div>
				))}
			</div>

			{chair && (
				<Card
					chair={chair}
					selected={selectedRentals.find((c) => c.id == chair.id)}
					onClose={() => setChair(null)}
					onSelect={() => setSelectedRentals([...selectedRentals, chair])}
					onRemove={() => setSelectedRentals([...selectedRentals.filter((c) => c.id !== chair.id)])}
					online={
						bookedPlaces.includes(chair.name) ? false : !chair.online ? false : !layer.online ? false : true
					}
				/>
			)}
		</div>
	);
};

function MapPicker() {
	const container = useRef();
	const [position, setPosition] = useState([]);
	const { loading, locations, startDate, endDate, selectedLocation, setSelectedLocation, globalSettings } =
		useContext(Context);

	useEffect(() => {
		if (globalSettings.location) {
			setPosition(globalSettings.location.map((coords) => parseFloat(coords)));
		}
	}, [globalSettings]);

	return (
		<div
			className="mappicker"
			style={{ width: "100%", height: 480, backgroundColor: "whitesmoke", borderRadius: ".6rem" }}
		>
			{position.length && (
				<Map
					center={position}
					zoom={16}
					ref={container}
					keyboard={false}
					className="mappicker__map"
					scrollWheelZoom={false}
					style={{ width: "100%", height: 480, borderRadius: ".6rem" }}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					{locations.length
						? locations.map((location) => (
								<Marker
									key={location.id}
									color="orange"
									position={[location.latitude, location.longitude]}
									onClick={(e) => {
										if (startDate || endDate) {
											setSelectedLocation(location);
										} else {
											window.alert("Bitte wählen Sie zuerst ihren gewünschten Zeitraum aus.");
										}
									}}
								/>
						  ))
						: null}
				</Map>
			)}

			{selectedLocation && <Layer layer={selectedLocation} onClose={() => setSelectedLocation(null)} />}
		</div>
	);
}

export default MapPicker;
