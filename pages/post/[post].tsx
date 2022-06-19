import React from "react";
import { useRouter } from "next/router";
import ImageFrame from "../../components/ImageFrame";

const Post = () => {
	const router = useRouter();
	const { post } = router.query;
	return <>{post}</>;
};

export default Post;
