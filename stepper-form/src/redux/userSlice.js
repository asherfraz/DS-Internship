import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    userDB:
        JSON.parse(localStorage.getItem("userDB")) || []
}


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser(state, action) {
            const existingDB = state.userDB;
            const newUser = action.payload;

            // Check if the user already exists in the database
            const userExists = existingDB.some(user => user.email === newUser.email);

            if (!userExists) {
                existingDB.push(newUser);
                localStorage.setItem("userDB", JSON.stringify(existingDB));
                toast.success("Form Submitted Successfully!");
                localStorage.removeItem("user");
            } else {
                console.warn("User already exists in the database.");
                toast.error("User already exists in the database. Please use a different email.");
            }

        },
        removeUser(state, action) {
            const index = action.payload;
            const existingDB = state.userDB;

            if (index >= 0 && index < existingDB.length) {
                existingDB.splice(index, 1);
                localStorage.setItem("userDB", JSON.stringify(existingDB));
                toast.success("User removed successfully!");
            }
            else {
                console.warn("Invalid index for user removal.");
                toast.error("Invalid index for user removal.");
            }


        },
        updateUser(state, action) {
            const { index, ...updatedUser } = action.payload;
            const existingDB = state.userDB;


            // Check if the user already exists in the database
            const searchEmailExists = existingDB.filter(user => user.email !== updatedUser.email);
            const emailExists = searchEmailExists.some(user => user.email === updatedUser.email);

            if (emailExists) {
                console.warn("User with this email already exists in the database.");
                toast.error("User with this email already exists in the database.");
                return;
            }

            // No Changes Made

            const areSame = JSON.stringify(updatedUser) === JSON.stringify(existingDB[index]);
            if (areSame) {
                console.warn("No changes detected for the user.");
                toast.error("No changes detected for the user.");
                return;
            }

            // Update the user in the database
            if (index >= 0 && index < existingDB.length) {
                existingDB[index] = updatedUser;
                console.log(">>>: UpdateExistingDBUser :", existingDB[index]);
                localStorage.setItem("userDB", JSON.stringify(existingDB));
                toast.success("User updated successfully!");
                localStorage.removeItem("user");
            } else {
                console.warn("Invalid index for user update.");
                toast.error("User updating Failed! Invalid index.");
            }

        },
    },
})

export const { addUser, removeUser, updateUser } = userSlice.actions
export default userSlice.reducer