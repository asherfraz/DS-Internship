import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useNotes from "@/zustand/useNotes";
import { useNavigate, useSearchParams } from "react-router";
import toast from "react-hot-toast";

const AddNote = () => {
	const navigate = useNavigate();
	const [noteTitle, setNoteTitle] = useState(String);
	const editorRef = useRef<any>(null);
	const { notes, addNote, updateNote } = useNotes();

	// Edit Note
	const [searchParams, setSearchParams] = useSearchParams();
	const [editNoteId, setEditNoteId] = useState(searchParams.get("editNoteId"));
	const editNote = notes.find((note) => note.id === editNoteId);
	const [editTitle, setEditTitle] = useState(editNote?.title || "");
	const [editContent, setEditContent] = useState(editNote?.content || "");

	useEffect(() => {
		if (editNoteId) {
			if (editNote) {
				setNoteTitle(editTitle);
			}
		}
	}, [editNoteId, editNote]);

	const handleSave = () => {
		if (editorRef.current) {
			if (editNoteId) {
				// Update existing note
				const updatedContent = editorRef.current.getContent();
				console.log("Updating Note:", editNoteId, noteTitle, updatedContent);
				//*** */ // Update note in zustand store
				// updateNote(editNoteId, {
				// 	title: noteTitle,
				// 	content: updatedContent,
				// 	createdAt: new Date().toDateString(),
				// });
				toast.success("Note updated successfully!");
			} else {
				// Create new note
				if (!noteTitle.trim()) {
					toast.error("Please enter a title for the note.");
					return;
				}
				const content = editorRef.current.getContent();
				console.log("Saving Note:", noteTitle, content);
				// add note to zustand store
				addNote({
					id: Date.now().toString(),
					title: noteTitle,
					content: content,
					createdAt: new Date().toDateString(),
				});
				toast.success("Note saved successfully!");
			}
		}
		// Reset form fields
		setNoteTitle("");
		editorRef.current.setContent("");
		setEditContent("");
		setEditTitle("");
		setSearchParams({});
		if (editNoteId) {
			setEditNoteId("");
		}
		// Navigate to home page
		navigate("/");
	};
	const handleCancel = () => {
		setNoteTitle("");
		editorRef.current.setContent("");
		navigate("/");
		toast.error("Note Discarded.");
	};

	return (
		<div className="container mx-auto p-4 min-h-screen flex flex-col items-start gap-6">
			<div className="flex flex-col items-start justify-center w-full max-w-sm  gap-3">
				<Label htmlFor="title">Note Title:</Label>
				<Input
					type="title"
					id="title"
					placeholder="Title"
					value={noteTitle}
					onChange={(e) => setNoteTitle(e.target.value)}
				/>
			</div>
			<div className="flex flex-col items-start w-full gap-3">
				<Label htmlFor="note">Note Content:</Label>
				<Editor
					apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
					onInit={(evt, editor) => {
						editorRef.current = editor;
						evt = evt;
					}}
					init={{
						height: 320,
						menubar: false,
						plugins: [
							"advlist",
							"autolink",
							"lists",
							"link",
							"image",
							"charmap",
							"preview",
							"anchor",
							"searchreplace",
							"visualblocks",
							"code",
							"fullscreen",
							"insertdatetime",
							"media",
							"table",
							"code",
							"help",
							"wordcount",
						],
						toolbar:
							"undo redo | blocks | " +
							"bold italic forecolor | alignleft aligncenter " +
							"alignright alignjustify | bullist numlist outdent indent | " +
							"removeformat | help",
						content_style:
							"body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
					}}
					initialValue={editNote ? editNote.content : "Write your note here..."}
					value={editContent}
					onEditorChange={(content) => setEditContent(content)}
				/>
			</div>
			<div className="flex justify-start items-center w-full gap-8">
				<Button onClick={handleCancel}>Cancel</Button>
				<Button onClick={handleSave}>Save</Button>
			</div>
		</div>
	);
};

export default AddNote;
