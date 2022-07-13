import React, {
	useState,
	useEffect,
	useRef,
	Ref,
	MutableRefObject,
	LegacyRef,
} from "react";
import { MultiSelect, Title } from "@mantine/core";
import ReactQuill from "@mantine/rte";
import { HTMLInputEvent } from "../../utils/domUtils";
import { appDebugger } from "../../devtools/debugger";
import TextEditor from "../Editor/TextEditor";
import MediaDropzone from "../DropZone/MediaDropZone";
import ImageFrame from "../ImageFrame";
import { Button } from "../Buttons";
import { FaArrowRight } from "react-icons/fa";
import {
	sanitizeTags,
	scanString,
	arrayStringFlatten,
	base64ToBlob,
} from "../../utils/stringUtils";

import ContentEditor from "./ContentEditor";
import ContentPositioning from "./ContentPositioning";
import ContentPreview from "./ContentPreview";

type componentProps = {
	htmlElementClasses?: string[];
	htmlElementAttributes?: string[];
	onClick?: React.MouseEventHandler;
	ref?: MutableRefObject<
		| HTMLParagraphElement
		| HTMLImageElement
		| HTMLAnchorElement
		| HTMLInputEvent
		| HTMLButtonElement
	>;
};

type elementProperties = {
	width: number;
	height: number;
	x: number;
	y: number;
	top: number;
	left: number;
	bottom: number;
	right: number;
	type: string;
};
const CreatePost = () => {
	const [newPostImages, updateNewPostImages] = useState<Array<string>>([]);
	const [mediaURLCount, updateMediaURLCount] = useState<number>(0);
	const [currentPhase, changePhase] = useState<number>(0);
	const [postionLayout, updatePositions] = useState<{}>({});
	const [articleElements, updateElements] = useState<Array<JSX.Element>>([]);
	const [userInputText, updateUserInputText] = useState<string>("");
	const [postTitle, updatePostTitle] = useState<string>("");
	const articleImageRef = useRef<JSX.Element>(null);
	const maneuverableElements = useRef<Array<HTMLElement>>([]);
	const mediaURLs = useRef<Array<string>>([]);
	const [maneuverablesTotalHeight, updateTotalHeight] = useState<number>(0);
	const [draggerActive, setDraggerActive] = useState(false);
	const [dragFocusedElement, updateDragFocusedElement] = useState<
		HTMLElement | undefined
	>(undefined);
	const articleSnapShot = useRef<HTMLDivElement>(null);
	let elementPropertiesMap = useRef<Map<string, elementProperties>>(new Map());
	/*
     --> Will Animate Out like a modal
     --> 2 Phases, 
     ---> Edit Phase
     ---> Placment Phase
     ---> Upload Phase
     */
	const updatePhase = (
		attrs: { increase_decrease: boolean },
		event?: MouseEvent
	) => {
		if (attrs.increase_decrease === true) {
			changePhase((prevState) => prevState + 1);
		} else {
			changePhase((prevState) => prevState - 1);
		}
	};

	useEffect(() => {
		if (typeof window === undefined) return;
		if (currentPhase === 0) return;
	}, [currentPhase]);

	useEffect(() => {
		if (typeof window === undefined) return;
		if (currentPhase === 0) return;

		const maneuverablesHeightSum: number =
			maneuverableElements.current.reduce<number>((previous, current) => {
				return previous + current.clientHeight;
			}, maneuverableElements.current[0].clientHeight);

		updateTotalHeight((prevState) => maneuverablesHeightSum + prevState);
	}, [maneuverableElements]);

	const getUserInputToStoreInState = (userInput: string) => {
		updateUserInputText(userInput);
	};

	const attachDraggable = (event: MouseEvent) => {
		if (event.target === null) return;
		console.log(maneuverableElements.current);
		updateDragFocusedElement(
			maneuverableElements.current.find(
				(element) => element.id === (event.target as HTMLElement).id
			)
		);

		setDraggerActive(!draggerActive);
	};

	// const createElements = (
	// 	htmlElement: string[],
	// 	{ htmlElementClasses, htmlElementAttributes }: componentProps,
	// 	elementContent: string[]
	// ) => {
	// 	let elementsToRender: Array<JSX.Element> = [];
	// 	htmlElement.forEach((element, index) => {
	// 		elementsToRender.push(
	// 			React.createElement(
	// 				element,
	// 				{
	// 					id: `draggable_${index}`,
	// 					className:
	// 						htmlElementClasses !== undefined && htmlElementClasses?.length > 0
	// 							? arrayStringFlatten(htmlElementClasses)
	// 							: htmlElementClasses,
	// 					attrs: arrayStringFlatten(htmlElementAttributes),
	// 					ref: (element: HTMLElement) => {
	// 						return (maneuverableElements.current[index] = element);
	// 					},
	// 					onClick: (event: MouseEvent) => {
	// 						attachDraggable(event);
	// 					},
	// 				},
	// 				elementContent[index]
	// 			)
	// 		);
	// 	});
	// 	let dragEnableElement = elementsToRender.find(
	// 		(element) => element.props.id === dragFocusedElement?.getAttribute("id")
	// 	);

	// 	console.log(dragFocusedElement);
	// 	console.log(elementsToRender);
	// 	console.log(dragEnableElement);
	// 	console.log(elementsToRender[0].props.id);
	// 	return elementsToRender;
	// };

	// createElements(
	// 	sanitizeTags(userInputText),
	// 	{
	// 		htmlElementClasses: ["draggable__TEXT", "draggable__"],
	// 		htmlElementAttributes: [
	// 			"draggableContent",
	// 			"draggableText",
	// 		],
	// 	},
	// 	scanString(userInputText)
	// )}

	const toObjectUrl = (files: File[]) => {
		files.forEach((file, index) => {
			mediaURLs.current[mediaURLCount] = URL.createObjectURL(file);
			console.log(mediaURLs.current[mediaURLCount]);
			updateMediaURLCount((prevState) => prevState + 1);
		});
	};

	const toDataUrl = (file: File) => {
		//TODO: Convert file object to a blob
		console.log("toDataUrl");
		const reader: FileReader = new FileReader();
		reader.onloadend = function () {
			const result: string = reader.result! as string;
			console.log("upload To state");
			updateNewPostImages([...newPostImages, result]);
		};
		reader.readAsDataURL(file);
	};
	const recordDomSnapShot: () => void = () => {
		console.log(articleSnapShot);
		let contentPositionData = Array.from(articleSnapShot.current!.children);
		contentPositionData.forEach((element, index) => {
			let elementId = element.getAttribute("id");
			console.log(elementId);
			let elementDomRect = element.getBoundingClientRect();
			let elementData = {
				width: elementDomRect.width,
				height: elementDomRect.height,
				x: elementDomRect.x,
				y: elementDomRect.y,
				top: elementDomRect.top,
				left: elementDomRect.left,
				bottom: elementDomRect.bottom,
				right: elementDomRect.right,
				type: element.classList.contains("textHandler") ? "text" : "image",
			};

			elementPropertiesMap.current.set(`${elementId}`, elementData);
		});
		console.log(articleSnapShot.current?.children);
		console.log(elementPropertiesMap.current);
		updatePhase({ increase_decrease: true });
	};

	return (
		<>
			{currentPhase === 0 && (
				<ContentEditor
					updatePhase={updatePhase}
					mediaURLCount={mediaURLCount}
					updateUserInputText={updateUserInputText}
					toObjectUrl={toObjectUrl}
					mediaURLs={mediaURLs}
					updatePostTitle={updatePostTitle}
				/>
			)}
			{currentPhase === 1 && (
				<ContentPositioning
					updatePhase={updatePhase}
					userInputText={userInputText}
					mediaURLCount={mediaURLCount}
					mediaURLs={mediaURLs}
					recordDomSnapShot={recordDomSnapShot}
					ref={articleSnapShot}
				/>
			)}
			{currentPhase === 2 && (
				<ContentPreview
					updatePhase={updatePhase}
					userInputText={userInputText}
					mediaURLCount={mediaURLCount}
					mediaURLs={mediaURLs}
					propertiesMap={elementPropertiesMap.current}
				/>
			)}
		</>
	);
	// return (
	// 	<>

	// 				{currentPhase === 2 && (
	// 					<div className="finalization">
	// 						<div className="contentPreview">
	// 							{articleSnapShot.current !== null && (
	// 								<>[Array.from(articleSnapShot.current.children)]</>
	// 							)}
	// 						</div>
	// 					</div>
	// 				)}
	// 			</div>
	// 		</div>
	// 	</>
	// );
};

export default CreatePost;
