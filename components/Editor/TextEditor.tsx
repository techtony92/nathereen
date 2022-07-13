import React, { useState, useEffect, useRef, Ref } from "react";
import RichTextEditor from "./RichText";
import ReactQuill from "@mantine/rte";
type textEditorProps = {
	userInputUpdate: (userInput: string, isTitle: boolean) => void;
	isTitle: boolean;
};
const TextEditor = ({ userInputUpdate, isTitle }: textEditorProps) => {
	const [localStatevalue, updateLocalStateValue] = useState("");
	let EditorRef = useRef(null);

	return (
		<>
			<RichTextEditor
				ref={EditorRef}
				style={
					isTitle
						? { height: "20rem" }
						: localStatevalue !== ""
						? { height: "60rem" }
						: { height: "auto" }
				}
				classNames={{
					toolbar: "mantineEditorToolbar",
					toolbarInner: "mantineEditorToolbarWrapper",
					toolbarGroup: "mantineEditorToolbarGroup",
					toolbarControl: "mantineEditorToolbarControl",
				}}
				controls={[
					["bold", "italic", "underline", "strike", "clean"],
					["h1", "h2", "h3", "h4", "h5"],
					[
						"orderedList",
						"unorderedList",
						"alignLeft",
						"alignCenter",
						"alignRight",
					],
					["link", "image"],
				]}
				sticky={false}
				value={localStatevalue}
				placeholder="Type @ or # to see mentions autocomplete"
				onChange={(userInput: string) => {
					updateLocalStateValue(userInput);
					isTitle
						? userInputUpdate(userInput, isTitle)
						: userInputUpdate && userInputUpdate(userInput, isTitle);
				}}
			/>
		</>
	);
};

export default TextEditor;
