import React, { useState } from "react";
import QRCode from "react-qr-code";
import ActivityIndicator from "../components/ActivityIndicator";

function QRCodeGenerator() {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState("");
	const [multiple, setMultiple] = useState(false);
	const [download, setDownload] = useState(null);

	const handleButtonClick = async () => {
		setLoading(true);
		setDownload(null);
		const response = await fetch(`${location.origin}/wp-json/app/v1/generate_code`, {
			method: "POST",
			headers: {
				Accept: "application/json",
			},
			body: JSON.stringify({ url, multiple }),
		})
			.then((res) => res.json())
			.catch((err) => console.log(err));

		if (response.status == "ok") {
			setDownload(response.zipfolder);
		}
		setLoading(false);
	};

	return (
		<div className="qrcode">
			{loading && <ActivityIndicator />}
			<div className="qrcode__column">
				<h1>QR Code generieren</h1>
				<p>
					Einfach die Ziel-Url in das Eingabefeld kopieren und den gewünschten QR Code generieren lassen. Du
					möchtest für jeden Strandkorb einen eigenen QR-Code? Das ist kein Problem, markiere dazu einfach die
					Checkbox "für jeden Strandkorb". Daraufhin werden für all deine Stradkörbe ein eigener QR-Code
					generiert.
				</p>
				<p>Zum Überprüfen deines QR-Code, scanne den Code auf der rechten Seite.</p>
				<input type="text" onChange={(e) => setUrl(e.target.value)} placeholder="URL eingeben" />
				<label style={{ display: "block" }}>
					<input type="checkbox" onChange={(e) => setMultiple(e.target.checked)} /> für jeden Strandkorb
				</label>
				<button className="button button-primary" onClick={handleButtonClick}>
					QR Code generieren
				</button>
			</div>
			<div className="qrcode__column">
				<div className="inner">
					{url !== "" && (
						<>
							<QRCode value={url} size={240} />
							{download && (
								<a className="button button-primary" href={download} target="_blank">
									Code herunterladen
								</a>
							)}
						</>
					)}
				</div>
			</div>
		</div>
	);
}

export default QRCodeGenerator;
