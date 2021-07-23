import React, { useContext } from "react";
import { Context } from "../context/index";
import { useFormValidator } from "../hooks/useFormValidator";
import { useVabsConnection } from "../hooks/useVabsConnection";
import ErrorMessage from "./ErrorMessage";

function FormControls({ agbLink, datenschutzLink, redirectLink }) {
	const {
		globalSettings,
		contact,
		setErrors,
		startDate,
		endDate,
		selectedRentals,
		setLoading,
		voucher,
		recipient,
		type,
		setSuccess,
	} = useContext(Context);

	const { links, redirect } = globalSettings;
	const settings = {
		agb: agbLink && agbLink !== "" ? agbLink : links?.agb,
		datenschutz: datenschutzLink && datenschutzLink !== "" ? datenschutzLink : links?.dsgvo,
		redirect: redirectLink && redirectLink !== "" ? redirectLink : redirect,
	};

	const sendForm = async () => {
		const response = await useVabsConnection({
			contact,
			startDate,
			endDate,
			selectedRentals,
			setLoading,
			redirect: settings.redirect,
			voucher,
			recipient,
			setSuccess,
			type,
		});
	};

	return (
		<div className="formcontrols">
			<div className="formcontrols__checkbox">
				<input
					type="checkbox"
					checked={contact.accepted}
					onChange={() => contact.setAccepted(!contact.accepted)}
				/>
				<span style={{ fontSize: "12px" }}>
					Hiermit bestätige ich die
					{settings.agb !== "" ? (
						<a
							href={settings?.agb}
							target="blank"
							style={{
								margin: "0 4px",
								textDecoration: "underline",
							}}
						>
							AGB
						</a>
					) : (
						" AGB "
					)}
					und
					{settings?.datenschutz !== "" ? (
						<a
							href={settings?.datenschutz}
							target="blank"
							style={{
								margin: "0 4px",
								textDecoration: "underline",
							}}
						>
							Datenschutzvereinbarung
						</a>
					) : (
						" Datenschutzvereinbarung "
					)}
					gelesen und verstanden zu haben und stimme diesen zu.
				</span>
				<ErrorMessage type="accepted" />
			</div>
			<button
				className="button button-primary"
				style={{ marginTop: "1rem" }}
				onClick={() => {
					if (
						useFormValidator({
							contact,
							setErrors,
							startDate,
							endDate,
							selectedRentals,
							voucher,
							recipient,
							type,
						}) === true
					) {
						sendForm();
					}
				}}
			>
				kostenpflichtig bestellen
			</button>
		</div>
	);
}

export default FormControls;
