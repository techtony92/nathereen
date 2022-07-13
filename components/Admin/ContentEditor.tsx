import React, { useState, useRef } from "react";
import ImageFrame from "../ImageFrame";
import { Button } from "../Buttons";
import { FaArrowRight } from "react-icons/fa";
import TextEditor from "../Editor/TextEditor";
import { Title } from "@mantine/core";
import MediaDropzone from "../DropZone/MediaDropZone";
import { text } from "stream/consumers";

type EditorPropTypes = {
	updatePhase: Function;
	updateUserInputText: Function;
	updatePostTitle: Function;
	mediaURLCount: number;
	mediaURLs: React.MutableRefObject<string[]>;
	toObjectUrl: Function;
};

const ContentEditor: ({
	updatePhase,
	updateUserInputText,
	mediaURLs,
	mediaURLCount,
	toObjectUrl,
	updatePostTitle,
}: EditorPropTypes) => JSX.Element = ({
	updatePhase,
	updateUserInputText,
	updatePostTitle,
	mediaURLCount,
	mediaURLs,
	toObjectUrl,
}) => {
	const [textEditPhase, updateTextEditPhase] = useState<number>(0);
	const articleImageRef = useRef<JSX.Element>(null);

	const getUserInputToStoreInState = (userInput: string, isTitle: boolean) => {
		if (isTitle) updatePostTitle(userInput);
		updateUserInputText(userInput);
	};

	const updateEditPhase = (
		attrs: { increase_decrease: boolean },
		event: MouseEvent
	) => {
		if (attrs.increase_decrease === true) {
			updateTextEditPhase((prevState) => prevState + 1);
		} else {
			updateTextEditPhase((prevState) => prevState - 1);
		}
	};

	return (
		<div className="createPost">
			<div className="container">
				<div className="content">
					<div className="contentEditor">
						<Title order={1}>Create Your Post</Title>
						{textEditPhase === 0 && (
							<>
								<Title order={2}>Whats Your Title?</Title>
								<TextEditor
									isTitle={true}
									userInputUpdate={getUserInputToStoreInState}
								/>
							</>
						)}
						{textEditPhase === 1 && (
							<>
								<Title order={2}>And Your Content?</Title>
								<TextEditor
									isTitle={false}
									userInputUpdate={getUserInputToStoreInState}
								/>
							</>
						)}
						{textEditPhase === 2 && (
							<>
								<Title order={2}>Do You want to add Some Graphics?</Title>
								<Title order={4}>
									* Jpg, png, videos and giffs are accepted.
								</Title>
								<div className="mediaArea">
									<MediaDropzone uploadData={toObjectUrl} />
									<div className="mediaList">
										{mediaURLCount > 0 &&
											mediaURLs.current.map((imageSrc, index) => (
												<ImageFrame
													id={`mediaID__${index}`}
													ref={articleImageRef}
													imageSource={imageSrc}
													imageSizeBehavor={"fill"}
													classValue="mediaListImage"
													positioningClassValue="mediaListItem"
													FrameClassValue="mediaListFrame"
													imageHeight={500}
													imageWidth={500}
												/>
											))}
									</div>
								</div>
							</>
						)}
						{/* <div className="createPostGrid">
							{mediaURLCount > 0 &&
								mediaURLs.current.map((imageSrc) => (
									<ImageFrame
										ref={articleImageRef}
										imageSource={imageSrc}
										imageSizeBehavor="fill"
										classValue="createPostImage"
										positioningClassValue="createPostImage"
										parentClassValue="createPostGridItem"
										imageHeight={500}
										imageWidth={500}
									/>
								))}
						</div>
						 */}
					</div>
					<div className="editorActions">
						<Button
							color="#3D43EB"
							variant="filled"
							isLink={false}
							text={"Next"}
							icon={true}
							iconElement={<FaArrowRight />}
							iconPosition={"right"}
							action={textEditPhase === 2 ? updatePhase : updateEditPhase}
							actionArgs={{ increase_decrease: true }}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContentEditor;
