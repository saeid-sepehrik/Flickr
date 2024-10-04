import { setDetails } from "./drawer.js";
import {
  showLoading,
  hidenLoading,
  showNoResult,
  hidenNoResult,
  showError,
  showOverlay,
} from "./utils.js";
import { fetchPhotos, fetchPhotoDetails } from "./api.js";
import { ProcessStatus } from "./enum.js";

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");
const searchContainer = document.getElementById("searchContainer");

let lastScrollTop = 0;
let page = 1;
let searchTerm = "";
let processStatus = ProcessStatus.VIEWING;

export const getProcessStatus = () => processStatus;
export const setProcessStatus = (value) => {
  processStatus = value;
};

const handleScroll = () => {
  const currentScroll = window.scrollY;

  if (
    currentScroll > lastScrollTop &&
    currentScroll > searchContainer.offsetHeight
  ) {
    searchContainer.classList.add("fixed");
  } else if (currentScroll < 50) {
    searchContainer.classList.remove("fixed");
  }
  lastScrollTop = currentScroll;
};
window.addEventListener("scroll", handleScroll);

const loadPhotos = async () => {
  showLoading();
  processStatus = ProcessStatus.LOADING;
  try {
    const photos = await fetchPhotos(searchTerm, page);
    if (photos) {
      photos.forEach((photo) => createPhotoElement(photo));
      if (processStatus != ProcessStatus.NO_MORE)
        processStatus = ProcessStatus.VIEWING;
      else showNoResult();
      hidenLoading();
      page++;
    }
  } catch (error) {
    hidenLoading();
    processStatus = ProcessStatus.VIEWING;
    showError(error);
  }
};

const createPhotoElement = (photo) => {
  const img = document.createElement("img");
  img.src = photo.imageUrl;
  img.alt = photo.title;
  img.addEventListener("click", async (event) => {
    event.preventDefault();
    const dataPhotoDetail = await fetchPhotoDetails(photo.id);
    setDetails(dataPhotoDetail);
  });
  results.appendChild(img);
};

const handleSearch = (event) => {
  event.preventDefault();
  page = 1;
  searchTerm = searchInput.value.trim();
  document.body.style.height = "auto";
  results.innerHTML = "";
  hidenNoResult();
  processStatus = ProcessStatus.VIEWING;
  loadPhotos();
};
searchButton.addEventListener("click", handleSearch);

// Load the next page of photos when the user scrolls down
const handleInfiniteScroll = () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 60 &&
    processStatus === ProcessStatus.VIEWING
  ) {
    loadPhotos();
  }
};
window.addEventListener("scroll", handleInfiniteScroll);
