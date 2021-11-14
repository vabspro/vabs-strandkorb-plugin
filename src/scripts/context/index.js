import React, { createContext, useState } from "react";
import { useAppState } from "../hooks/useAppState";
import { useBeachChairs } from "../hooks/useBeachChairs";
import { useBookableOptions } from "../hooks/useBookableOptions";
import { useBookables } from "../hooks/useBookables";
import { useBookings } from "../hooks/useBookings";
import { useContact } from "../hooks/useContact";
import { useLocations } from "../hooks/useLocations";
import { useRange } from "../hooks/useRange";
import { useSelectedRentals } from "../hooks/useSelectedRantals";
import { useVoucher } from "../hooks/useVoucher";
import { usePrices } from "../hooks/usePrices";

export const Context = createContext();

export const ContextProvider = ({ children, type }) => {
	const { loading, setLoading, errors, setErrors, globalSettings, success, setSuccess } = useAppState();

	const contact = useContact();
	const { list, templates, voucher, setVoucher, recipient, setRecipient } = useVoucher({
		shouldFetch: type === "voucher",
		callback: () => setLoading(false),
	});

	const {
		startDate,
		endDate,
		setStartDate,
		setEndDate,
		startTime,
		endTime,
		currentYear,
		setCurrentYear,
		disabledDates,
	} = useRange();

	const { selectedRentals, setSelectedRentals, updateSelectedRentals, selectedRentalsMessage } = useSelectedRentals({
		startDate,
		endDate,
		startTime,
		endTime,
		shouldFetch: type === "booking",
	});

	const prices = usePrices({ selectedRentals, startDate, endDate, startTime, endTime });

	const bookables = useBookables({
		onFetchStart: () => setLoading(true),
		onFetchEnd: () => setLoading(false),
		shouldFetch: type === "booking",
	});
	const beachChairs = useBeachChairs(bookables);
	const bookableOptions = useBookableOptions(bookables);
	const locations = useLocations({
		date: startDate,
		callback: () => setSelectedRentals([]),
		shouldFetch: type === "booking",
	});
	const bookings = useBookings({
		startDate,
		endDate,
		onFetchStart: () => setLoading(true),
		onFetchEnd: () => setLoading(false),
		shouldFetch: type === "booking",
	});
	const [selectedLocation, setSelectedLocation] = useState(null);

	return (
		<Context.Provider
			value={{
				loading,
				setLoading,
				success,
				setSuccess,
				globalSettings,
				errors,
				setErrors,
				contact,
				beachChairs,
				bookableOptions,
				locations,
				currentYear,
				setCurrentYear,
				disabledDates,
				startDate,
				setStartDate,
				endDate,
				setEndDate,
				selectedRentals,
				setSelectedRentals,
				updateSelectedRentals,
				selectedLocation,
				setSelectedLocation,
				bookings,
				list,
				templates,
				voucher,
				setVoucher,
				recipient,
				setRecipient,
				type,
				prices,
				selectedRentalsMessage,
			}}
		>
			{children}
		</Context.Provider>
	);
};
