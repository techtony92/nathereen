import React from "react";
import { appDebugger } from "../../devtools/debugger";
type HeadingProps = {
	text: string;
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

export const ArticleHeading = ({ text }: HeadingProps) => {
	return (
		<div className="articleHeading">
			<h3 className="articleHeadingText">{text}</h3>
		</div>
	);
};
export const ArticleHeadline = ({ text }: HeadingProps) => {
	return (
		<div className="articleHeadline">
			<h4 className="articleHealineText">{text}</h4>
		</div>
	);
};
export default MainTitle;
