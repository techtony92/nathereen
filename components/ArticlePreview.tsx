import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

import Link from "next/link";
import {
	MANTINE_BUTTON_STYLES,
	MANTINE_BUTTON_STYLE_VALUES,
} from "../utils/styleUtils";
import { Button } from "./Buttons";
type ArticlePreviewProps = {
	ArticlePreviewImage: JSX.Element;
	ArticlePreviewHeading: JSX.Element;
	ArticlePreviewHeadline: JSX.Element;
	path: string;
};
const ArticlePreview = ({
	ArticlePreviewImage,
	ArticlePreviewHeading,
	ArticlePreviewHeadline,
	path,
}: ArticlePreviewProps) => {
	return (
		<>
			<div className="articlePreview">
				{ArticlePreviewImage}
				{ArticlePreviewHeading}
				{ArticlePreviewHeadline}
				<Link href={path} passHref={true}>
					<a>
						<Button
							text={"Read More"}
							variant={"subtle"}
							color={undefined}
							gradient={undefined}
							loaderPosition={undefined}
							loading={false}
							icon={true}
							iconPosition={"right"}
							iconElement={<FaLongArrowAltRight />}
							parentCoreClass={MANTINE_BUTTON_STYLES.root}
							mantineClassName={["root", "icon"]}
							isLink={true}
							path={"/"}
						/>
					</a>
				</Link>
			</div>
		</>
	);
};

export default ArticlePreview;
