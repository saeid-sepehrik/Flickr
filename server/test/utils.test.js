const {
  generateCacheKey,
  splitArrayIntoChunks,
  createError,
} = require("../src/utils/utils");

describe("Utils", () => {
  describe("generateCacheKey", () => {
    it("should generate cache key from 3 parameters with - separator", () => {
      const param = { method: "Frickr.photo", searchTerm: "dogs", page: 1 };
      const expectedOutput = "Frickr.photo-dogs-1";

      const result = generateCacheKey(param);

      expect(result).toBe(expectedOutput);
    });

    it("should handle different parameter types with null and undefined", () => {
      const param = { method: undefined, searchTerm: "dogs", page: null };
      const expectedOutput = "dogs";

      const result = generateCacheKey(param);

      expect(result).toBe(expectedOutput);
    });
  });

  describe("splitArrayIntoChunks", () => {
    test("should split array into chunks of specified size", () => {
      const array = [1, 2, 3, 4, 5];
      const chunkSize = 2;
      const expectedOutput = [[1, 2], [3, 4], [5]];

      const result = splitArrayIntoChunks(array, chunkSize);

      expect(result).toEqual(expectedOutput);
    });

    test("should return an empty array when input is empty", () => {
      const array = [];
      const chunkSize = 2;
      const expectedOutput = [];

      const result = splitArrayIntoChunks(array, chunkSize);

      expect(result).toEqual(expectedOutput);
    });

    test("should handle chunk size greater than array length", () => {
      const array = [1, 2, 3];
      const chunkSize = 5;
      const expectedOutput = [[1, 2, 3]];

      const result = splitArrayIntoChunks(array, chunkSize);

      expect(result).toEqual(expectedOutput);
    });
  });

  describe("createError", () => {
    it("should return an Error object", () => {
      const error = createError("Something went wrong");
      expect(error).toBeInstanceOf(Error);
    });

    it("should set the correct error message", () => {
      const message = "Something went wrong";
      const error = createError(message);
      expect(error.message).toBe(message);
    });

    it("should set the default status code to 500", () => {
      const error = createError("Default error");
      expect(error.status).toBe(500);
    });

    it("should set the provided status code", () => {
      const error = createError("Not Found", 404);
      expect(error.status).toBe(404);
    });
  });
});
