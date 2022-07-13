import React, { useRef, MouseEvent } from "react";
import { Button as MantineButton } from "@mantine/core";
import { MANTINE_BUTTON_STYLE_VALUES, findValue } from "../utils/styleUtils";
import { HTMLInputEvent } from "../utils/domUtils";
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
	gradient?:
		| {
				from: string;
				to: string;
				deg: number;
		  }
		| undefined;
	loading?: boolean | undefined;
	text: string;
	loaderPosition?: "right" | "left" | undefined;
	icon?: boolean;
	iconPosition?: "right" | "left" | undefined;
	iconElement?: JSX.Element | undefined;
	mantineClassName?: string[];
	parentCoreClass?: string;
	isLink?: boolean;
	path?: string | null;
	action?: Function;
	actionArgs?: {};
};
export const Button = ({
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
	action,
	actionArgs,
}: ButtonProps) => {
	// findValue(parentCoreClass, MANTINE_BUTTON_STYLE_VALUES)
	// [mantineClassName[mantineClassName.indexOf(parentCoreClass)]]
	const ref = useRef<HTMLButtonElement>();

	return (
		<>
			<div className="textButton">
				{isLink ? (
					<a>
						<MantineButton
							classNames={{
								root: "mantineButtonRoot",
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
							onClick={(event: MouseEvent) => {
								console.log(actionArgs);
								action !== undefined ? action(event, actionArgs) : null;
							}}
						>
							{text}
						</MantineButton>
					</a>
				) : (
					<MantineButton
						classNames={{
							root: "mantineButtonRoot",
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
						onClick={(event: MouseEvent) =>
							action !== undefined ? action(actionArgs, event) : null
						}
					>
						{text}
					</MantineButton>
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
