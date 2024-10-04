const {
  controllerSearch,
  controllerPhoto,
} = require("../src/routes/photos/controller");
const { searchPhotos, photoDetails } = require("../src/services/flickrService");

jest.mock("../src/services/flickrService");

describe("Photo Controller Tests", () => {
  describe("controllerSearch", () => {
    it("should call searchPhotos with correct parameters", async () => {
      const req = { query: { search: "cat", page: "22" } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      searchPhotos.mockResolvedValue({ photos: [] });

      await controllerSearch[0](req, res, next);

      expect(searchPhotos).toHaveBeenCalledWith("cat", 22, res, next);
      expect(res.json).toHaveBeenCalledWith({ photos: [] });
    });

    it("should handle errors from searchPhotos", async () => {
      const req = { query: { search: "cat", page: "22" } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      searchPhotos.mockRejectedValue(new Error("Service error"));

      await controllerSearch[0](req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("controllerPhoto", () => {
    it("should call photoDetails with correct id", async () => {
      const req = { params: { id: "2727" } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      photoDetails.mockResolvedValue({ photo: {} });

      await controllerPhoto[0](req, res, next);

      expect(photoDetails).toHaveBeenCalledWith("2727", res, next);
      expect(res.json).toHaveBeenCalledWith({ photo: {} });
    });

    it("should handle errors from photoDetails", async () => {
      const req = { params: { id: "2727" } };
      const res = { json: jest.fn() };
      const next = jest.fn();
      photoDetails.mockRejectedValue(new Error("Service error"));

      await controllerPhoto[0](req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
