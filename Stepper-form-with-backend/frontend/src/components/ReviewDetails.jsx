import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addUser, updateUser } from "../redux/userSlice";

const ReviewDetails = ({ back, next }) => {
	const dispatch = useDispatch();
	const [user, setuser] = useState({});
	useEffect(() => {
		const user = JSON.parse(localStorage.getItem("user"));
		if (user) {
			setuser(user);
		}
	}, []);

	const handleFinish = () => {
		const forUpdate = "index" in user;
		if (forUpdate) {
			// For Update User
			dispatch(updateUser(user));
		} else {
			// For Add New User
			dispatch(addUser(user));
		}
		next();
	};

	return (
		<div className="w-full h-full flex flex-col items-center gap-2">
			<h2 className="text-xl font-bold ">Review Your Details</h2>

			<div className="w-full flex flex-col justify-between items-center gap-4">
				{/* Personal Details */}
				<div className=" w-lg px-4 pt-4">
					<h3 className="text-lg font-semibold">Personal Details</h3>
					<div className="ml-4 flex flex-col">
						<p>
							Name:{" "}
							<strong>
								{user.fname + " " + user.lname || "No Data Found!"}
							</strong>
						</p>
						<p>
							Email: <strong>{user.email || "No Data Found!"}</strong>
						</p>
					</div>
				</div>
				{/* Address Details */}
				<div className=" w-lg px-4 pb-4">
					<h3 className="text-lg font-semibold">Address Details</h3>
					<div className="ml-4 flex flex-col">
						<p>
							Street Address: <strong>{user.street || "No Data Found!"}</strong>
						</p>
						<p>
							City: <strong>{user.city || "No Data Found!"}</strong>
						</p>
						<p>
							Country: <strong>{user.country || "No Data Found!"}</strong>
						</p>
					</div>
				</div>
			</div>
			<hr className="p-2 w-lg " />

			<div className="w-lg flex justify-between items gap-2">
				<button
					type="button"
					className="bg-gray-500 px-3 py-2 text-xl rounded  text-white hover:bg-gray-600 transition-colors duration-300"
					onClick={() => back()}
				>
					Back
				</button>
				<button
					type="button"
					className="bg-amber-500 px-3 py-2 text-xl rounded  text-white hover:bg-amber-600 transition-colors duration-300"
					onClick={handleFinish}
				>
					Finish
				</button>
			</div>
		</div>
	);
};

export default ReviewDetails;
