import React, { useState, FunctionComponent, Ref } from "react";
import Image from "next/image";
import { BLURDATAURL } from "../utils/imageUtils";
type imageFrameProps = {
	id: string;
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
	FrameClassValue: string;
	imageWidth: number;
	imageHeight: number;
	ref?: Ref<JSX.Element> | undefined | null;
	styleProps?:
		| {
				width: number;
				height: number;
				top: number;
				left: number;
				right: number;
				bottom: number;
		  }
		| undefined;
};

const ImageFrame = ({
	id,
	imageSource,
	imageSizeBehavor,
	classValue,
	positioningClassValue,
	FrameClassValue,
	imageWidth,
	imageHeight,
	styleProps,
}: imageFrameProps) => {
	return (
		<>
			<div className={`${positioningClassValue} ${FrameClassValue} `}>
				<Image
					id={id}
					className={`${classValue}`}
					src={imageSource}
					layout={imageSizeBehavor}
					width={styleProps === undefined ? imageWidth : undefined}
					height={styleProps === undefined ? imageHeight : undefined}
					blurDataURL={BLURDATAURL}
					placeholder={"blur"}
					alt=""
				/>
			</div>
		</>
	);
};

export default ImageFrame;
