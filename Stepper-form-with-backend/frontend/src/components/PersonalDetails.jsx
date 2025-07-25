import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const PersonalDetails = ({ next }) => {
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
		const userpersonal = JSON.parse(localStorage.getItem("user"));
		if (userpersonal) {
			reset({
				fname: userpersonal.fname,
				lname: userpersonal.lname,
				email: userpersonal.email,
			});
		}
	}, [reset]);

	return (
		<div className="w-full h-full flex flex-col items-center gap-2">
			<h2 className="text-xl font-bold ">Personal Details</h2>
			<form className="w-lg space-y-4" onSubmit={handleSubmit(onSubmit)}>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="fname" className="text-xl whitespace-nowrap ">
							First Name:
						</label>
						<input
							type="text"
							name="fname"
							id="fname"
							required
							placeholder="Wilson"
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("fname", {
								required: "First Name is required",
								maxLength: {
									value: 20,
									message: "First Name cannot exceed 20 characters",
								},
								minLength: {
									value: 3,
									message: "First Name must be at least 3 characters",
								},
							})}
						/>
					</div>
					{errors.fname && (
						<span className="text-red-600 font-bold text-sm">
							{errors.fname.message}
						</span>
					)}
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="lname" className="text-xl whitespace-nowrap ">
							Last Name:
						</label>
						<input
							type="text"
							name="lname"
							id="lname"
							required
							placeholder="Fisk"
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("lname", {
								required: "Last Name is required",
								maxLength: {
									value: 15,
									message: "Last Name cannot exceed 15 characters",
								},
								minLength: {
									value: 3,
									message: "Last Name must be at least 3 characters",
								},
							})}
						/>
					</div>
					{errors.lname && (
						<span className="text-red-600 font-bold text-sm">
							{errors.lname.message}
						</span>
					)}
				</div>
				<div className="flex flex-col justify-center items-center gap-2">
					<div className="w-full flex justify-between items-center gap-4">
						<label htmlFor="email" className="text-xl whitespace-nowrap ">
							Email:
						</label>
						<input
							type="email"
							name="email"
							id="email"
							placeholder="Wilsonfisk@decimalsolution.com"
							className="max-w-96 border-2 border-white p-2 rounded w-full focus:outline-none focus:border-black "
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
									message: "Invalid email address",
								},
							})}
						/>
					</div>
					{errors.email && (
						<>
							<span className="text-red-600 font-bold text-sm">
								{errors.email.message}
							</span>
						</>
					)}
				</div>
				<div className=" flex justify-end items-center gap-4">
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

export default PersonalDetails;
