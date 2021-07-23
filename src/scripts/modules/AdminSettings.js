import React, { useState } from "react";

function AdminSettings({ config }) {
	const settings = JSON.parse(config);
	const [apiToken, setApiToken] = useState(settings?.api_token);
	const [clientId, setClientId] = useState(settings?.client_id);

	const [referrer, setReferrer] = useState(settings?.referrer);
	const [url, setUrl] = useState(settings?.url);

	const [dsgvo, setDsgvo] = useState(settings?.dsgvo);
	const [agb, setAgb] = useState(settings?.agb);
	const [redirect, setRedirect] = useState(settings?.redirect);

	const [location, setLocation] = useState(settings?.location);
	const [locations, setLocations] = useState(settings.locations ? settings.locations : []);

	const [showForm, setShowForm] = useState(false);
	const [newLocation, setNewLocation] = useState({
		id: "",
		name: "",
		coords: "",
	});

	const [showBeachchairForm, setShowBeachchairForm] = useState(false);
	const [beachchairs, setBeachchairs] = useState(settings.chairs ? settings.chairs : []);
	const [newBeachchair, setNewBeachchair] = useState({
		id: "",
		name: "",
		image: "",
	});

	return (
		<>
			<h2>Grundeinstellungen</h2>
			<div className="form__field">
				<label>API TOKEN</label>
				<input
					type="text"
					className="form__field--input"
					name="api_token"
					value={apiToken}
					onChange={(e) => setApiToken(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>CLIENT ID</label>
				<input
					type="text"
					className="form__field--input"
					name="client_id"
					value={clientId}
					onChange={(e) => setClientId(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>URL</label>
				<input
					type="text"
					className="form__field--input"
					name="url"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
				/>
			</div>

			<div className="form__field">
				<label>REFERRER ID</label>
				<input
					type="text"
					className="form__field--input"
					name="referrer_id"
					value={referrer}
					onChange={(e) => setReferrer(e.target.value)}
				/>
			</div>

			<h2 style={{ marginTop: "2.4rem" }}>Links</h2>
			<div className="form__field">
				<label>DSGVO LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="dsgvo"
					value={dsgvo}
					onChange={(e) => setDsgvo(e.target.value)}
				/>
			</div>
			<div className="form__field">
				<label>AGB LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="agb"
					value={agb}
					onChange={(e) => setAgb(e.target.value)}
				/>
			</div>

			<div className="form__field">
				<label>REDIRECT LINK</label>
				<input
					type="text"
					className="form__field--input"
					name="redirect"
					value={redirect}
					onChange={(e) => setRedirect(e.target.value)}
				/>
			</div>

			<h2 style={{ marginTop: "2.4rem" }}>Standort und Strandabschnitte</h2>
			<div className="form__field">
				<label>STANDORT</label>
				<input
					type="text"
					className="form__field--input"
					name="location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder="Durch , getrennte Koordinaten"
				/>
			</div>

			{locations &&
				locations.map((l, index) => (
					<div className="form__row" key={index}>
						<div className="form__field">
							<label>ID</label>
							<input
								type="text"
								className="form__field--input"
								name="locationId[]"
								value={l?.id}
								onChange={(e) =>
									setLocations([
										...locations.map((l, i) => {
											if (index == i) {
												return {
													id: e.target.value,
													name: l.name,
													coords: l.coords,
												};
											} else {
												return {
													...l,
												};
											}
										}),
									])
								}
							/>
						</div>

						<div className="form__field">
							<label>NAME - Strandabschnitt</label>
							<input
								type="text"
								className="form__field--input"
								name="locationname[]"
								value={l?.name}
								onChange={(e) =>
									setLocations([
										...locations.map((l, i) => {
											if (index == i) {
												return {
													name: e.target.value,
													coords: l.coords,
												};
											} else {
												return {
													...l,
												};
											}
										}),
									])
								}
							/>
						</div>

						<div className="form__field">
							<label>KOORDINATEN - Strandabschnitt</label>
							<input
								type="text"
								className="form__field--input"
								name="locationcoords[]"
								value={l?.coords}
								onChange={(e) =>
									setLocations([
										...locations.map((l, i) => {
											if (index == i) {
												return {
													name: l.name,
													coords: e.target.value,
												};
											} else {
												return {
													...l,
												};
											}
										}),
									])
								}
							/>
						</div>
					</div>
				))}
			{showForm && (
				<div className="form__row">
					<div className="form__field">
						<label>ID</label>
						<input
							type="text"
							className="form__field--input"
							name="locationname[]"
							value={newLocation.id}
							onChange={(e) => setNewLocation({ ...newLocation, id: e.target.value })}
						/>
					</div>
					<div className="form__field">
						<label>NAME - Strandabschnitt</label>
						<input
							type="text"
							className="form__field--input"
							name="locationname[]"
							value={newLocation.name}
							onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
						/>
					</div>

					<div className="form__field">
						<label>KOORDINATEN - Strandabschnitt</label>
						<input
							type="text"
							className="form__field--input"
							name="locationcoords[]"
							value={newLocation.coords}
							onChange={(e) => setNewLocation({ ...newLocation, coords: e.target.value })}
						/>
					</div>
				</div>
			)}

			<p style={{ cursor: "pointer", color: "#2271b1", fontWeight: "bold" }}>
				<span
					onClick={() => {
						setNewLocation({
							name: "",
							coords: "",
						});
						setShowForm(!showForm);
					}}
				>
					{showForm ? "abbrechen" : "neuen Strandabschnitt hinzufügen"}
				</span>
				{showForm && (
					<span
						style={{ marginLeft: "1rem" }}
						onClick={() => {
							setLocations([
								...locations,
								{
									name: newLocation.name,
									coords: newLocation.coords,
								},
							]);
							setNewLocation({
								id: "",
								name: "",
								coords: "",
							});
							setShowForm(!showForm);
						}}
					>
						hinzufügen
					</span>
				)}
			</p>

			<h2 style={{ marginTop: "2.4rem" }}>Strandkorb Typen</h2>
			{beachchairs &&
				beachchairs.map((chair, index) => (
					<div className="form__row" key={index}>
						<div className="form__field">
							<label>ID</label>
							<input
								type="text"
								className="form__field--input"
								name="beachchairId[]"
								value={chair.id}
								onChange={(e) =>
									setBeachchairs([
										...beachchairs.map((b, i) => {
											if (index == i) {
												return {
													...b,
													id: e.target.value,
												};
											} else {
												return { ...b };
											}
										}),
									])
								}
							/>
						</div>
						<div className="form__field">
							<label>NAME - Strandkorbtyp</label>
							<input
								type="text"
								className="form__field--input"
								name="bechchairType[]"
								value={chair.name}
								onChange={(e) =>
									setBeachchairs([
										...beachchairs.map((b, i) => {
											if (index == i) {
												return {
													...b,
													name: e.target.value,
												};
											} else {
												return { ...b };
											}
										}),
									])
								}
							/>
						</div>

						<div className="form__field">
							<label>BILD - Strandkorbtyp</label>
							<input
								type="text"
								className="form__field--input"
								name="bechchairImage[]"
								value={chair.image}
								onChange={(e) =>
									setBeachchairs([
										...beachchairs.map((b, i) => {
											if (index == i) {
												return {
													...b,
													image: e.target.value,
												};
											} else {
												return { ...b };
											}
										}),
									])
								}
							/>
						</div>
					</div>
				))}
			{showBeachchairForm && (
				<div className="form__row">
					<div className="form__field">
						<label>ID</label>
						<input
							type="text"
							className="form__field--input"
							name="beachchairId[]"
							value={newBeachchair.id}
							onChange={(e) => setNewBeachchair({ ...newBeachchair, id: e.target.value })}
						/>
					</div>
					<div className="form__field">
						<label>NAME - Strandkorbtyp</label>
						<input
							type="text"
							className="form__field--input"
							name="bechchairType[]"
							value={newBeachchair.name}
							onChange={(e) => setNewBeachchair({ ...newBeachchair, name: e.target.value })}
						/>
					</div>

					<div className="form__field">
						<label>BILD - Strandkorbtyp</label>
						<input
							type="text"
							className="form__field--input"
							name="bechchairImage[]"
							value={newBeachchair.image}
							onChange={(e) => setNewBeachchair({ ...newBeachchair, image: e.target.value })}
						/>
					</div>
				</div>
			)}
			<p style={{ cursor: "pointer", color: "#2271b1", fontWeight: "bold" }}>
				<span
					onClick={() => {
						setNewLocation({
							id: "",
							name: "",
							coords: "",
						});
						setShowBeachchairForm(!showBeachchairForm);
					}}
				>
					{showBeachchairForm ? "abbrechen" : "neuen Strandkorbtyp hinzufügen"}
				</span>
				{showBeachchairForm && (
					<span
						style={{ marginLeft: "1rem" }}
						onClick={() => {
							setBeachchairs([
								...beachchairs,
								{
									id: newBeachchair.id,
									name: newBeachchair.name,
									image: newBeachchair.image,
								},
							]);
							setNewBeachchair({
								id: "",
								name: "",
								image: "",
							});
							setShowBeachchairForm(!showBeachchairForm);
						}}
					>
						hinzufügen
					</span>
				)}
			</p>
			<div className="form__field" style={{ marginTop: "2.4rem" }}>
				<input
					type="submit"
					className="button button-primary"
					value="save changes"
					id="save_main_options"
					style={{ height: 48 }}
				/>
				<span className="loading"></span>
			</div>
		</>
	);
}

export default AdminSettings;
