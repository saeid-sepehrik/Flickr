import { ProcessStatus } from "./enum.js";
import { showLoading, hidenLoading, showError } from "./utils.js";
import { setProcessStatus, getProcessStatus } from "./app.js";

/**
 * Fetch details of a photo by its ID
 * @param {number} id - The ID of the photo
 * @returns {Promise<Object>} - The photo details
 */

export const fetchPhotoDetails = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/api/photos/${id}`);
    if (!response.ok) {
      const error = await response.json();
      showError(error);
      return;
    }
    return await response.json();
  } catch (error) {
    showError(error);
  } finally {
    // hidenLoading();
  }
};

/**
 * Fetch photos based on the search term and page number
 * @param {string} searchTerm - The term to search for
 * @param {number} page - The page number for pagination
 * @returns {Promise<Array>} - An array of photos
 */

export const fetchPhotos = async (searchTerm, page) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/photos/search?search=${searchTerm}&page=${page}`
    );

    if (!response.ok) {
      const error = await response.json();
      hidenLoading();
      showError(error);
      return;
    }
    let countPictureInPage = response.headers.get("Count-In-Page");
    let data = await response.json();
    if (countPictureInPage > data.length) {
      setProcessStatus(ProcessStatus.NO_MORE);
    }
    return await data;
  } catch (error) {
    showError(error);
  }
};
