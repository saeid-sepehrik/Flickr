import { toggleDrawer } from "./drawer.js";

const loadingGif = document.getElementById("loadingGif");
const overlay = document.getElementById("overlay");
const errorBox = document.getElementById("errorBox");
const noResult = document.getElementById("noResults");
const closeBtnError = document.getElementById("closeBtnError");

export const showLoading = () => {
  showOverlay("loading");
  loadingGif.classList.remove("displayNone");
};

export const hidenLoading = () => {
  hidenOverlay();
  loadingGif.classList.add("displayNone");
};

export const showOverlay = (reason) => {
  overlay.classList.remove("displayNone");
  overlay.setAttribute("reason", reason);
};

export const hidenOverlay = () => {
  overlay.classList.add("displayNone");
  overlay.removeAttribute("reason");
};

overlay.addEventListener("click", (event) => {
  const reason = overlay.getAttribute("reason");
  if (reason === "drawer") {
    hidenOverlay();
    toggleDrawer();
  } else if (reason === "error") {
    hidenOverlay();
    hiddenError();
  }
});

export const showError = (error) => {
  showOverlay("error");
  const errorImage = document.querySelector(".error-image");
  const errorText = document.querySelector(".error-text");

  errorText.innerText = error.message;
  errorImage.src = getErrorImage(error?.error?.code || 500);

  errorBox.classList.remove("displayNone");
};

export const hiddenError = () => {
  errorBox.classList.add("displayNone");
};

const getErrorImage = (errorCode) => {
  switch (true) {
    case errorCode === 204:
      return "./images/errors/204.png";
    case errorCode >= 400 && errorCode < 500:
      return "./images/errors/400.png";
    default:
      return "./images/errors/500.png";
  }
};

closeBtnError.addEventListener("click", function () {
  hiddenError();
  hidenOverlay();
});

export const hidenNoResult = () => {
  noResult.classList.add("displayNone");
};

export const showNoResult = () => {
  noResult.classList.remove("displayNone");
};
