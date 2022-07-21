import fs from "fs";
import yaml from "yaml";

import { yamlToFrontmatter } from "./parser";

import { frontmatterMarker, frontmatterMarkerLength } from "~/config";

export const appendOrCreateFrontmatterSeq = (
	files: string[],
	key: string,
	value: string
) => {
	files.forEach((path) => {
		const file = fs.readFileSync(path).toString();
		if (!file.startsWith("---")) {
			const fmYaml = new yaml.Document({});
			fmYaml.add(fmYaml.createPair(key, [value], { flow: true }));

			const cleanContent = file.trim();
			const newContent = `${yamlToFrontmatter(
				fmYaml
			)}\n\n${cleanContent}`;

			fs.writeFileSync(path, newContent);
		} else {
			const fmStart = file.indexOf(frontmatterMarker);
			const fmEnd = file.indexOf(
				frontmatterMarker,
				frontmatterMarkerLength
			);

			const fm = file.slice(fmStart + frontmatterMarkerLength, fmEnd);
			const fmYaml = yaml.parseDocument(fm);

			const tags = fmYaml.get(key);
			if (!tags) {
				fmYaml.add(fmYaml.createPair(key, [value], { flow: true }));
			} else if (yaml.isSeq(tags) && !tags.items.includes(value)) {
				console.log(tags.items);
				tags.add(value);
			} else {
				console.error(
					`${path} has an invalid tags value of ${typeof tags}`
				);
			}

			const cleanContent = file
				.slice(fmEnd + frontmatterMarkerLength)
				.trim();
			const newContent = `${yamlToFrontmatter(
				fmYaml
			)}\n\n${cleanContent}`;

			fs.writeFileSync(path, newContent);
		}
	});
};
