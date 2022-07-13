import React from "react";
import { appDebugger } from "../../devtools/debugger";
type HeadingProps = {
	text: string;
	classValue: string;
};

const MainTitle = ({ text }: HeadingProps) => {
	appDebugger(text);
	return (
		<>
			<div className="mainHeading">
				<h1 className="mainHeading__title">{text}</h1>
			</div>
		</>
	);
};

export const ArticleHeading = ({ classValue, text }: HeadingProps) => {
	return (
		<div className={`${classValue} articleHeading`}>
			<h3 className="articleHeadingText">{text}</h3>
		</div>
	);
};
export const ArticleHeadline = ({ classValue, text }: HeadingProps) => {
	return (
		<div className={`${classValue} articleHeadline`}>
			<h4 className="articleHeadlineText">{text}</h4>
		</div>
	);
};
export default MainTitle;
