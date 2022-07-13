import React, { useState, forwardRef } from "react";
import { Button } from "../Buttons";
import { Title } from "@mantine/core";
import { scanString } from "../../utils/stringUtils";
import Draggable from "react-draggable";
import ImageFrame from "../ImageFrame";
type PositioningPropTypes = {
	updatePhase: Function;
	userInputText: string;
	mediaURLCount: number;
	mediaURLs: React.MutableRefObject<string[]>;
	recordDomSnapShot: Function;
};

export type Ref = HTMLDivElement;

const ContentPositioning = forwardRef<Ref, PositioningPropTypes>(
	(
		{ updatePhase, userInputText, mediaURLCount, mediaURLs, recordDomSnapShot },
		ref
	) => {
		const draggableTextElements = scanString(userInputText).map(
			(paragraph, index) => (
				<>
					<Draggable
						handle=".textHandler"
						defaultPosition={{ x: 0, y: 0 }}
						grid={[25, 25]}
						scale={1}
						bounds="parent"
					>
						<div id={`articlePassage__${index}`} className="textHandler">
							{paragraph}
						</div>
					</Draggable>
				</>
			)
		);
		const draggableImageElements =
			mediaURLs.current.length > 0 &&
			mediaURLs.current?.map((image, index) => (
				<>
					<Draggable
						handle=".imageHandler"
						defaultPosition={{ x: 0, y: 0 }}
						grid={[25, 25]}
						scale={1}
						bounds="parent"
					>
						<div id={`articleMedia__${index}`} className="imageHandler">
							<ImageFrame
								id={`articleMediaImage__${index}`}
								imageWidth={500}
								imageHeight={500}
								classValue="maneuverableImage"
								positioningClassValue="maneuverableImageCell"
								FrameClassValue="maneuverableImageFrame"
								imageSource={image}
								imageSizeBehavor={"fill"}
							/>
						</div>
					</Draggable>
				</>
			));

		return (
			<div>
				<div className="positioningEditor">
					<Title order={1}>Position The Items In Your Article</Title>
					<div className="content">
						<Button
							action={recordDomSnapShot}
							variant="filled"
							text="Next"
							color="3D43EB"
						/>
						<div ref={ref} className={`contentPositioning`}>
							{userInputText && draggableTextElements}
							{mediaURLCount > 0 && draggableImageElements}
						</div>
					</div>
				</div>
			</div>
		);
	}
);

export default ContentPositioning;
