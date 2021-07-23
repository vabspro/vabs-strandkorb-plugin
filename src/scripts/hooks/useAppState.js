import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useAppState = () => {
	const [loading, setLoading] = useState(true);
	const [errors, setErrors] = useState([]);
	const [success, setSuccess] = useState(false);
	const [globalSettings, setGlobalSettings] = useState({});

	useEffect(() => {
		(async () => {
			const response = await fetchDataAsync({ action: "/config", data: null });
			setGlobalSettings(response);
			setLoading(false);
		})();
	}, []);

	return { loading, setLoading, errors, setErrors, globalSettings, success, setSuccess };
};
