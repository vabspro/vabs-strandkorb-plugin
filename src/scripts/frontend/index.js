import React from "react";
import ReactDOM from "react-dom";

import { ContextProvider } from "../context";

import "../../styles/frontend/styles.sass";
import App from "./App";

const container = document.querySelector(".vrb");

if (container) {
	ReactDOM.render(
		<ContextProvider {...container.dataset}>
			<App {...container.dataset} />
		</ContextProvider>,
		container
	);
}
