import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddressDetails = ({ back, next }) => {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors },
	} = useForm();

	const onSubmit = (data) => {
		let existinguser = JSON.parse(localStorage.getItem("user")) || {};
		Object.assign(existinguser, data);
		localStorage.setItem("user", JSON.stringify(existinguser));
		next();
	};

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			reset({
				street: user.street,
				city: user.city,
				country: user.country,
			});
		}
	}, [reset]);

	return (
		<div className="w-full h-full flex flex-col items-center gap-2">
			<h2 className="text-xl font-bold ">Address Details</h2>
			<form className="w-lg space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="street" className="text-xl whitespace-nowrap ">
							Street Address:
						</label>
						<input
							type="text"
							name="street"
							id="street"
							required
							placeholder="House , Street , Town "
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("street", {
								required: "Street Address is required",
								maxLength: {
									value: 100,
									message: "Street Address cannot exceed 100 characters",
								},
								minLength: {
									value: 10,
									message: "Street Address must be at least 10 characters",
								},
							})}
						/>
					</div>
					{errors.street && (
						<span className="text-red-600 font-bold text-sm">
							{errors.street.message}
						</span>
					)}
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="city" className="text-xl whitespace-nowrap ">
							City:
						</label>
						<input
							type="text"
							name="city"
							id="city"
							required
							placeholder="City Name"
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("city", {
								required: "City Name is required",
								maxLength: {
									value: 15,
									message: "City Name cannot exceed 15 characters",
								},
								minLength: {
									value: 3,
									message: "City Name must be at least 3 characters",
								},
							})}
						/>
					</div>
					{errors.city && (
						<span className="text-red-600 font-bold text-sm">
							{errors.city.message}
						</span>
					)}
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="country" className="text-xl whitespace-nowrap ">
							Country:
						</label>
						<input
							type="country"
							name="country"
							id="country"
							placeholder="Pakistan, PK"
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("country", {
								required: "Country Name is required",
								maxLength: {
									value: 15,
									message: "Country Name cannot exceed 15 characters",
								},
								minLength: {
									value: 3,
									message: "Country Name must be at least 3 characters",
								},
							})}
						/>
					</div>
					{errors.country && (
						<span className="text-red-600 font-bold text-sm">
							{errors.country.message}
						</span>
					)}
				</div>
				<div className="mt-6 flex justify-between items-center gap-4">
					<button
						type="button"
						className="bg-gray-500 px-3 py-2 text-xl rounded  text-white hover:bg-gray-600 transition-colors duration-300"
						onClick={() => back()}
					>
						Back
					</button>
					<button
						type="submit"
						className="bg-amber-500 px-3 py-2 text-xl rounded  text-white hover:bg-amber-600 transition-colors duration-300"
					>
						Next
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddressDetails;
