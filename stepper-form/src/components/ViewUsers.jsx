import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/userSlice";

const ViewUsers = () => {
	const dispatch = useDispatch();
	const userDb = useSelector((state) => state.user.userDB);

	const handleUpdate = (index) => {
		let userToUpdate = userDb[index];
		userToUpdate = { ...userToUpdate, index: index };
		localStorage.setItem("user", JSON.stringify(userToUpdate));
		window.location.reload();
	};

	return (
		<div className="mt-6 flex flex-col justify-center items-center bg-amber-500/90 p-4  rounded-tl-lg rounded-tr-lg shadow-lg">
			<h2 className="text-xl font-bold border-b-4 border-black px-2">
				Users Details
			</h2>
			<div className="w-full max-w-2xl mt-4 pb-4">
				{userDb.length > 0 ? (
					userDb.map((user, index) => (
						<div
							key={index}
							className="flex justify-between items-center mb-4 w-full p-4 rounded shadow-lg bg-gray-600"
						>
							<div className="flex flex-col justify-between items-start text-white">
								<p>
									Name: <strong>{user.fname + " " + user.lname}</strong>
								</p>
								<p>
									Email: <strong>{user.email}</strong>
								</p>
								<p>
									Street: <strong>{user.street}</strong>
								</p>
								<p>
									City: <strong>{user.city}</strong>
								</p>
								<p>
									Country: <strong>{user.country}</strong>
								</p>
							</div>

							<div className="flex flex-col justify-between items-end gap-4">
								{/* Update */}
								<button
									className="bg-blue-500 px-3 py-2 text-white rounded hover:bg-blue-600 transition-colors duration-300"
									onClick={() => handleUpdate(index)}
								>
									Update
								</button>
								{/* Remove */}
								<button
									className="bg-red-500 px-3 py-2 text-white rounded hover:bg-red-600 transition-colors duration-300"
									onClick={() => {
										dispatch(removeUser(index));
									}}
								>
									Remove
								</button>
							</div>
						</div>
					))
				) : (
					<p className="text-gray-700 text-center">No users found.</p>
				)}
			</div>
		</div>
	);
};

export default ViewUsers;
