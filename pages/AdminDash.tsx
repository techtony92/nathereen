import { NextPage } from "next";
import React from "react";
import CreatePost from "../components/Admin/CreatePost";

type AdminProps = {
	value: string;
};

const AdminDash: NextPage<AdminProps> = () => {
	return (
		<>
			<CreatePost />
		</>
	);
};

export default AdminDash;
