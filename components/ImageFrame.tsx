import React, { useState, FunctionComponent } from "react";
import Image from "next/image";
import { BLURDATAURL } from "../utils/imageUtils";
type imageFrameProps = {
	imageSource: string;
	imageSizeBehavor:
		| "fill"
		| "fixed"
		| "intrinsic"
		| "responsive"
		| "raw"
		| undefined;
	classValue: string;
	positioningClassValue: string;
	imageWidth: number;
	imageHeight: number;
};

const ImageFrame = ({
	imageSource,
	imageSizeBehavor,
	classValue,
	positioningClassValue,
	imageWidth,
	imageHeight,
}: imageFrameProps) => {
	return (
		<>
			<div className={`${positioningClassValue} imageFrame`}>
				<Image
					className={`${classValue}`}
					src={imageSource}
					layout={imageSizeBehavor}
					width={imageWidth}
					height={imageHeight}
					blurDataURL={BLURDATAURL}
					placeholder={"blur"}
					alt=""
				/>
			</div>
		</>
	);
};

export default ImageFrame;
