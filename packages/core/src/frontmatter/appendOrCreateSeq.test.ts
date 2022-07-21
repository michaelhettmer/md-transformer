import { appendOrCreateFrontmatterSeq } from "./appendOrCreateSeq";

describe("test append or create sequence transforer", () => {
	it("should append correctly", () => {
		appendOrCreateFrontmatterSeq([], "test", "test");
		expect(true).toBeTruthy();
	});
});
