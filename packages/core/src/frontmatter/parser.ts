import yaml from "yaml";

import { frontmatterMarker } from "~/config";

export const yamlToFrontmatter = (yaml: yaml.Document) => {
	return `${frontmatterMarker}\n${yaml.toString()}${frontmatterMarker}`;
};
