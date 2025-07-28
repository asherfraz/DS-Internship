import { createSlice } from '@reduxjs/toolkit'
import toast from 'react-hot-toast';

const initialState = {
    notes: JSON.parse(localStorage.getItem("notes")) || []
};


const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers: {
        addNote: (state, action) => {
            state.notes.push(action.payload);
            localStorage.setItem("notes", JSON.stringify(state.notes));
            toast.success("Note added successfully!");
        },
        removeNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
            localStorage.setItem("notes", JSON.stringify(state.notes));
            toast.success("Note removed successfully!");
        },
        updateNote: (state, action) => {
            const index = state.notes.findIndex(note => note.id === action.payload.id);
            if (index !== -1) {
                state.notes[index] = action.payload;
                localStorage.setItem("notes", JSON.stringify(state.notes));
                toast.success("Note updated successfully!");
            }
        },
    },
})

export const { addNote, removeNote, updateNote } = noteSlice.actions
export default noteSlice.reducer