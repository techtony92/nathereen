import React from "react";
type ArticleProps = {
	ArticleImage: JSX.Element | null;
	ArticleText: string;
	ArticleExtras: {} | null;
	ArticleDecor: {} | null;
};

const Article = ({ ArticleImage, ArticleText }: ArticleProps) => {
	return (
		<div className="article">
			{ArticleImage}
			{ArticleText}
		</div>
	);
};

export default Article;
