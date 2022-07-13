import { htmlTagExclusion, htmlBracketExclusion } from "./regPatterns";
export const sanitizeTags: (stringValue: string) => string[] = (
	stringValue
) => {
	let htmlTags = Array.from(
		stringValue.matchAll(htmlTagExclusion),
		(tag) => tag[0]
	);

	htmlTags = getOpeningTags(htmlTags);
	htmlTags = removeBrackets(htmlTags);
	return htmlTags;
};

const getOpeningTags: (htmlTags: Array<string>) => string[] = (htmlTags) => {
	const openingTags: Array<string> = htmlTags.filter((tag, index, array) => {
		if (index % 2 === 0) return array[index];
	});
	return openingTags;
};

const getclosingTags: (htmlTags: Array<string>) => string[] = (htmlTags) => {
	const closingTags: Array<string> = htmlTags.filter((tag, index, array) => {
		if (index % 2 === 0) return array[index];
	});
	return closingTags;
};

const removeBrackets: (htmlTags: Array<string>) => string[] = (htmlTags) => {
	let tags: Array<string> = [];
	htmlTags.forEach((tag) => {
		tags.push(tag.replace(htmlBracketExclusion, ""));
	});

	return tags;
};

export const scanString: (stringValue: string) => string[] = (stringValue) => {
	let stringList: string[] = stringValue.split(htmlTagExclusion);
	stringList = stringList.filter((stringValue) => stringValue.length !== 0);

	return stringList;
};

export const arrayStringFlatten: (stringsValues?: string[]) => string = (
	stringValues
) => {
	if (stringValues === undefined) return "No Value";

	let strValues = "";
	stringValues.forEach((value) => (strValues += ` ${value}`));
	return strValues;
};

export const base64ToBlob: (source: string) => Blob | undefined = (source) => {
	let sliceSize: number = 512 | 1024;
	let contentType: string = "";
	let base64StringSections: string[] = source.split(";base64,");
	contentType = base64StringSections[0].split(":")[1];
	let byteCharacters: Buffer = Buffer.from(base64StringSections[1]);
	return new Blob([byteCharacters], { type: contentType });
};
