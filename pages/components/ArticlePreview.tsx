import React from "react";
type ArticlePreviewProps = {
	ArticlePreviewImage: JSX.Element;
	ArticlePreviewHeading: JSX.Element;
	ArticlePreviewHeadline: JSX.Element;
};
const ArticlePreview = ({
	ArticlePreviewImage,
	ArticlePreviewHeading,
	ArticlePreviewHeadline,
}: ArticlePreviewProps) => {
	return (
		<>
			<div className="articlePreview">
				{ArticlePreviewImage}
				{ArticlePreviewHeading}
				{ArticlePreviewHeadline}
			</div>
		</>
	);
};

export default ArticlePreview;
