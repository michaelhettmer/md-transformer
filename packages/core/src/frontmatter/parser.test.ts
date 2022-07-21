import yaml from "yaml";

import { yamlToFrontmatter } from "./parser";

type Example = { input: yaml.Document; output: string };

const exBase: Example = {
	input: new yaml.Document({ key: "value", key2: "value2" }),
	output: `---
key: value
key2: value2
---`,
};

const exSeq: Example = {
	input: new yaml.Document({ key: "value", key2: ["item1", "item2"] }),
	output: `---
key: value
key2:
  - item1
  - item2
---`,
};

const exSeqFlow: Example = {
	input: (() => {
		const document = new yaml.Document({ key: "value" });
		document.add(
			document.createPair("key2", ["item1", "item2"], { flow: true })
		);
		return document;
	})(),
	output: `---
key: value
key2: [ item1, item2 ]
---`,
};

describe("test parsing from string to yaml document and back", () => {
	it("should correctly output example document with markers around it", () => {
		const { input, output } = exBase;
		const result = yamlToFrontmatter(input);
		expect(result).toBe(output);
	});

	it("should correctly output default sequence syntax", () => {
		const { input, output } = exSeq;
		const result = yamlToFrontmatter(input);
		expect(result).toBe(output);
	});

	it("should correctly output flow-style sequence syntax", () => {
		const { input, output } = exSeqFlow;
		const result = yamlToFrontmatter(input);
		expect(result).toBe(output);
	});
});
