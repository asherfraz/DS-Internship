import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button } from "./ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useNotes from "@/zustand/useNotes";

const AddNote = () => {
	const [noteTitle, setNoteTitle] = useState(String);
	const editorRef = useRef<any>(null);
	const { addNote } = useNotes();

	const handleSave = () => {
		if (editorRef.current) {
			const content = editorRef.current.getContent();
			console.log("Saving Note:", noteTitle, content);
			// add note to zustand store

			addNote({
				id: Date.now().toString(),
				title: noteTitle,
				content: content,
				createdAt: new Date().toDateString(),
			});
			alert("Note saved successfully!");
		}
		setNoteTitle("");
		editorRef.current.setContent("");
	};
	const handleCancel = () => {};

	return (
		<div className="container mx-auto p-4 h-screen flex flex-col items-start gap-6">
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
					onInit={(editor) => (editorRef.current = editor)}
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
					initialValue="Write your note here..."
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
