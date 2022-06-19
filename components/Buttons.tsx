import React from "react";
import { Button } from "@mantine/core";
import { MANTINE_BUTTON_STYLE_VALUES, findValue } from "../utils/styleUtils";
type ButtonProps = {
	variant:
		| "filled"
		| "outline"
		| "light"
		| "gradient"
		| "white"
		| "default"
		| "subtle";
	color: string | undefined;
	gradient:
		| {
				from: string;
				to: string;
				deg: number;
		  }
		| undefined;
	loading: boolean | undefined;
	text: string;
	loaderPosition: "right" | "left" | undefined;
	icon: boolean;
	iconPosition: "right" | "left" | undefined;
	iconElement: JSX.Element | undefined;
	mantineClassName: string[];
	parentCoreClass: string;
	isLink: boolean;
	path: string | null;
};
export const TextButton = ({
	variant,
	text,
	color,
	gradient,
	loading,
	loaderPosition,
	icon,
	iconPosition,
	iconElement,
	mantineClassName,
	parentCoreClass,
	isLink,
	path,
}: ButtonProps) => {
	// findValue(parentCoreClass, MANTINE_BUTTON_STYLE_VALUES)
	// [mantineClassName[mantineClassName.indexOf(parentCoreClass)]]
	return (
		<>
			<div className="textButton">
				{isLink ? (
					<a>
						<Button
							classNames={{
								root: "mantineButton__root",
							}}
							rightIcon={
								icon && iconPosition === "right" ? iconElement : undefined
							}
							leftIcon={
								icon && iconPosition === "left" ? iconElement : undefined
							}
							variant={variant}
							color={color}
							gradient={gradient}
							loading={loading}
							loaderPosition={loaderPosition}
						>
							{text}
						</Button>
					</a>
				) : (
					<Button
						classNames={{
							root: "mantineButton__root",
						}}
						rightIcon={
							icon && iconPosition === "right" ? iconElement : undefined
						}
						leftIcon={icon && iconPosition === "left" ? iconElement : undefined}
						variant={variant}
						color={color}
						gradient={gradient}
						loading={loading}
						loaderPosition={loaderPosition}
					>
						{text}
					</Button>
				)}
				{/* <Button
					classNames={{
						root: "mantineButton__root",
					}}
					rightIcon={icon && iconPosition === "right" ? iconElement : undefined}
					leftIcon={icon && iconPosition === "left" ? iconElement : undefined}
					variant={variant}
					color={color}
					gradient={gradient}
					loading={loading}
					loaderPosition={loaderPosition}
				>
					{text}
				</Button> */}
			</div>
		</>
	);
};
