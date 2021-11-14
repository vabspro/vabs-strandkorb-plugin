import { useEffect, useState } from "react";
import { fetchDataAsync } from "../utils/fetchDataAsync";

export const useVoucher = ({ shouldFetch, callback }) => {
	const [list, setList] = useState([]);
	const [templates, setTemplates] = useState([]);
	const [recipient, setRecipient] = useState("");
	const [voucher, setVoucher] = useState({
		template: null,
		item: null,
	});

	useEffect(() => {
		if (shouldFetch) {
			(async () => {
				const list = await fetchDataAsync({ action: "/voucher_list", data: null });
				setList(list);

				const templates = await fetchDataAsync({ action: "/voucher_template_list", data: null });
				setTemplates(templates);
				callback();
			})();
		}
	}, []);

	return { list, templates, voucher, setVoucher, recipient, setRecipient };
};
