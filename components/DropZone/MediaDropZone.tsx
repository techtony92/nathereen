import React from "react";
import { Group, Text, MantineTheme, useMantineTheme } from "@mantine/core";
import { Dropzone, DropzoneStatus, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { FaImage, FaUpload } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IconType } from "react-icons/lib";
type DropzoneProps = {
	uploadData: Function;
};
function ImageUploadIcon({
	status,
	...props
}: React.ComponentProps<IconType> & { status: DropzoneStatus }) {
	if (status.accepted) {
		return <FaUpload {...props} />;
	}

	if (status.rejected) {
		return <ImCross {...props} />;
	}

	return <FaImage {...props} />;
}

function getIconColor(status: DropzoneStatus, theme: MantineTheme) {
	return status.accepted
		? theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6]
		: status.rejected
		? theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]
		: theme.colorScheme === "dark"
		? theme.colors.dark[0]
		: theme.colors.gray[7];
}

const createImageUrl = (eventFile: File) => {
	const src = URL.createObjectURL(eventFile);
};

const dropzoneChildren = (status: DropzoneStatus, theme: MantineTheme) => (
	<Group
		position="center"
		spacing="xl"
		style={{ minHeight: 220, pointerEvents: "none" }}
	>
		<ImageUploadIcon
			status={status}
			style={{ color: getIconColor(status, theme) }}
			size={80}
		/>

		<div>
			<Text size="xl" inline>
				Drag images here or click to select files
			</Text>
			<Text size="sm" color="dimmed" inline mt={7}>
				Attach as many files as you like, each file should not exceed 5mb
			</Text>
		</div>
	</Group>
);
const MediaDropzone = ({ uploadData }: DropzoneProps) => {
	const theme = useMantineTheme();
	{
		/* <ImageUploadIcon
						status={status}
						style={{ color: getIconColor(status, theme) }}
						size={80}
					/> */
	}
	return (
		<>
			<Dropzone
				classNames={{
					root: "mantineDropZoneRoot",
				}}
				onDrop={(files) => {
					console.log(files[0] instanceof Blob);
					uploadData(files);
					console.log("accepted files", files);
				}}
				onReject={(files) => console.log("rejected files", files)}
				maxSize={3 * 1024 ** 2}
				accept={IMAGE_MIME_TYPE}
			>
				{(status) => dropzoneChildren(status, theme)}
			</Dropzone>
		</>
	);
};

export default MediaDropzone;
