import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/index";

function TableModule() {
	const {
		beachChairs,
		bookings,
		setStartDate,
		startDate,
		setEndDate,
		endDate,
		loading,
		selectedRentals,
		setSelectedRentals,
	} = useContext(Context);
	const rows = ["Düne", "Mitte", "Wasser"];
	const [bookableChairs, setBookableChairs] = useState([]);

	useEffect(() => {
		if (bookings && selectedRentals) {
			setBookableChairs([
				...beachChairs.filter((beachChair) => {
					return !bookings.find((b) => b.id == beachChair.id);
				}),
			]);
		}
	}, [bookings]);

	return (
		<div className="tablemodule">
			{bookableChairs.length ? (
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Strandabschnitt</th>
							<th>Reihe</th>
							<th>Model</th>
							<th></th>
						</tr>
					</thead>

					<tbody>
						{bookableChairs.map((beachChair, index) => (
							<tr key={index}>
								<td>
									<input
										type="checkbox"
										onChange={(e) => {
											e.persist();
											if (e.target.checked) {
												setSelectedRentals([...selectedRentals, beachChair]);
											} else {
												setSelectedRentals([
													...selectedRentals.filter((r) => r.id !== beachChair.id),
												]);
											}
										}}
									/>
									{beachChair.name}
								</td>
								<td>{beachChair.beachChairLocationName}</td>
								<td>{rows[beachChair.beachRow - 1]}</td>
								<td>{beachChair.beachChairTypeName}</td>
								<td>
									<span
										style={{
											width: 8,
											height: 8,
											display: "block",
											borderRadius: "100%",
											backgroundColor: !beachChair.online ? "grey" : "limegreen",
										}}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			) : (
				<p>Bitte wähle ein anderes Datum um freie Körbe wählen zu können.</p>
			)}
		</div>
	);
}

export default TableModule;
