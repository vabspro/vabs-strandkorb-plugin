import { useState, useEffect } from "react";

export const useContainerSize = () => {
	const [size, setSize] = useState({});

	const claculateSize = () => {
		const documentElement = document.body.getBoundingClientRect();
		const containerElement = document.querySelector(".vrb").getBoundingClientRect();

		if (documentElement.width < 1024) {
			setSize(documentElement);
		} else {
			setSize(containerElement);
		}
	};

	useEffect(() => {
		window.addEventListener("resize", () => claculateSize());
		claculateSize();

		return window.removeEventListener("resize", claculateSize);
	}, []);

	return size;
};
