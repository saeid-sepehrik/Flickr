import { DrawerStatus } from "./enum.js";
import { showOverlay, hidenOverlay } from "./utils.js";

const body = document.body;

let drawerStatus = DrawerStatus.CLOSED;

export const toggleDrawer = () => {
  const isOpen = drawerStatus === DrawerStatus.OPEN;

  drawer.style.transform = isOpen ? "translateX(100%)" : "translateX(0)";
  body.classList.toggle("overflowHiden", !isOpen);
  isOpen ? hidenOverlay() : showOverlay("drawer");

  drawerStatus = isOpen ? DrawerStatus.CLOSED : DrawerStatus.OPEN;
};

export const setDetails = (dataPhoto) => {
  details.innerHTML = "";

  const imgDiv = document.createElement("div");
  imgDiv.id = "imgDetail";

  const img = document.createElement("img");
  img.src = dataPhoto.imageUrl;
  img.alt = dataPhoto.title;

  imgDiv.appendChild(img);

  const titleLabel = document.createElement("h2");
  titleLabel.id = "titleDetail";
  titleLabel.innerHTML = dataPhoto.title;

  const descriptionLabel = document.createElement("label");
  descriptionLabel.innerHTML =
    dataPhoto.description || "No description available";

  const ownerUSername = document.createElement("label");
  ownerUSername.innerHTML =
    "Owner : " + dataPhoto.owner.username || "Ownew not available";

  details.appendChild(titleLabel);
  details.appendChild(imgDiv);
  details.appendChild(descriptionLabel);
  details.appendChild(ownerUSername);

  toggleDrawer();
};

closeDrawer.addEventListener("click", (event) => {
  event.preventDefault();
  toggleDrawer();
});
