import { appDebugger } from "../devtools/debugger";

type styleValues = {
	root: string;
	icon: string;
};
export enum MANTINE_BUTTON_STYLES {
	root = "root",
	outline = "outline",
	filled = "filled",
	light = "light",
	default = "default",
	subtle = "subtle",
	gradient = "gradient",
	white = "white",
	loading = "loading",
	icon = "icon",
	leftIcon = "leftIcon",
	rightIcon = "rightIcon",
	inner = "inner",
	label = "label",
}

export const findValue: (k: string, v: styleValues) => string = (k, v) => {
	let foundValue: string = "";
	appDebugger("findValue");
	appDebugger("k:string", k);
	appDebugger("v:styleValues", v);
	for (let key in v) {
		if (key === k) {
			appDebugger("key found :", key);
			foundValue = key;
			break;
		}
	}
	appDebugger("key returned :", foundValue);
	return foundValue;
};
export const MANTINE_BUTTON_STYLE_VALUES: styleValues = {
	root: "mantaineRootButton",
	icon: "mantineIcon",
};
