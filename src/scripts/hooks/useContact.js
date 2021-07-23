import { useState } from "react";

export const useContact = () => {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [mobile, setMobile] = useState("");
	const [street, setStreet] = useState("");
	const [number, setNumber] = useState("");
	const [zipCode, setZipCode] = useState("");
	const [city, setCity] = useState("");
	const [message, setMessage] = useState("");
	const [accepted, setAccepted] = useState(false);

	return {
		firstName,
		setFirstName,
		lastName,
		setLastName,
		email,
		setEmail,
		mobile,
		setMobile,
		street,
		setStreet,
		number,
		setNumber,
		zipCode,
		setZipCode,
		city,
		setCity,
		message,
		setMessage,
		accepted,
		setAccepted,
	};
};
