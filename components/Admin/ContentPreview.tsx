import React from "react";
import { scanString } from "../../utils/stringUtils";
import ImageFrame from "../ImageFrame";
import styled from "styled-components";
import { relative } from "path";
type PreviewPropTypes = {
	updatePhase: Function;
	userInputText: string;
	mediaURLCount: number;
	mediaURLs: React.MutableRefObject<string[]>;
	propertiesMap: Map<string, Object>;
};
const ContentPreview: ({
	updatePhase,
	userInputText,
	mediaURLCount,
	mediaURLs,
	propertiesMap,
}: PreviewPropTypes) => JSX.Element = ({
	updatePhase,
	userInputText,
	mediaURLCount,
	mediaURLs,
	propertiesMap,
}) => {
	//TODO use the properties map to position elements.

	const textElements = scanString(userInputText).map((paragraph, index) => {
		const properties = propertiesMap.get(`articlePassage__${index}`)!;
		const [width, height, x, y, top, left, bottom, right, type] =
			Object.values(properties);
		return (
			<div
				className="textHandler"
				style={
					type === "text"
						? {
								position: "absolute",
								width: width,
								height: height,
								top: top,
								left: left,
								bottom: bottom,
								right: right,
						  }
						: {}
				}
			>
				{paragraph}
			</div>
		);
	});
	const imageElements =
		mediaURLs.current.length > 0 &&
		mediaURLs.current?.map((image, index) => {
			const properties = propertiesMap.get(`articleMedia__${index}`)!;
			const [width, height, x, y, top, left, bottom, right, type] =
				Object.values(properties);
			return (
				<>
					<div
						className="imageHandler"
						style={
							type === "image"
								? {
										position: "absolute",
										width: width,
										height: height,
										top: top,
										left: left,
										bottom: bottom,
										right: right,
								  }
								: {}
						}
					>
						<ImageFrame
							id={`${index}`}
							imageWidth={500}
							imageHeight={500}
							classValue="previewImage"
							positioningClassValue="previewImagePositioning"
							FrameClassValue="previewImageFrame"
							imageSource={image}
							imageSizeBehavor={"fill"}
						/>
					</div>
				</>
			);
		});
	return (
		<div className="contentPreview">
			{textElements}
			{imageElements}
		</div>
	);
};

export default ContentPreview;
