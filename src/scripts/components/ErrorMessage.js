import React, { useContext } from "react";
import { Context } from "../context/index";

function ErrorMessage({ type }) {
	const { errors } = useContext(Context);
	if (errors[type]) {
		return <span style={{ color: "orangered", display: "block", fontSize: ".8rem" }}>{errors[type]}</span>;
	}

	return null;
}

export default ErrorMessage;
