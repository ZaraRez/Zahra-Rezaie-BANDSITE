
import BandSiteApi from "./band-site-api";

//invoking functions for shows setup
setupShows();
fetchComments();
showsLabel();

// Function to set up the structure for the Shows Section
function setupShows() {
  const showsSection = document.querySelector(".shows");
  const showsTitleContainer = document.createElement("div");
  const showsTitle = document.createElement("h2");
  showsTitle.innerText = "Shows";
  showsTitle.classList.add("shows__title");
  showsTitleContainer.classList.add("shows__title-container");
  showsTitleContainer.appendChild(showsTitle);
  const showsSchedule = document.createElement("div");
  showsSchedule.classList.add("shows__schedule");
  showsSection.append(showsTitleContainer, showsSchedule);

  // Fetch and display shows data
  fetchShowsData();
}

//insert showsMenu
function showsLabel() {
  const showsSchedule = document.querySelector(".shows__schedule");
  const tabDesMenu = document.createElement("div");
  const dateLabel = document.createElement("p");
  const venueLabel = document.createElement("p");
  const locLabel = document.createElement("p");
  const spacerContainer = document.createElement("div");
  dateLabel.classList.add("shows__date-tab");
  venueLabel.classList.add("shows__venue-tab");
  locLabel.classList.add("shows__loc-tab");
  spacerContainer.classList.add("shows__loc-spacer");
  tabDesMenu.classList.add("shows__title-show");
  dateLabel.innerText = "DATE";
  venueLabel.innerText = "VENUE";
  locLabel.innerText = "LOCATION";
  tabDesMenu.append(dateLabel, venueLabel, locLabel, spacerContainer);
  showsSchedule.append(tabDesMenu);
}

// Function to fetch shows data from the API and display it
async function fetchShowsData() {
  try {
    // Fetch shows data using BandSiteApi class
    const showsData = await bandSiteApi.getShows();

    // Display shows data
    showsCardFromData(showsData);
  } catch (error) {
    console.error("Error fetching shows data:", error);
  }
}

// Function to fetch comments data from the API and display it
function fetchComments() {
  axios
    .get(
      "https://unit-2-project-api-25c1595833b2.herokuapp.com/comments/?api_key=51bcfc4c-0d5d-47dd-9c45-3f67d8a9d3e4"
    )
    .then((res) => {
      let showsTimes = res.data;
      showsCardFromData(showsTimes);
      const cards = document.querySelectorAll(".shows__card");
      cards.forEach((i) => i.addEventListener("click", cardClick));
    })
    .catch((error) => {
      console.log(error);
    });
}

//Displays the showsCard is called within the fetchComments function
function showsCardFromData(showsTimes) {
  const showsSchedule = document.querySelector(".shows__schedule");
  for (const show of showsTimes) {
    //Element Creation for Show Card

    const dateLabel = document.createElement("p");
    const venueLabel = document.createElement("p");
    const locLabel = document.createElement("p");
    const showCard = document.createElement("div");
    const showDate = document.createElement("p");
    const venueName = document.createElement("p");
    const locName = document.createElement("p");
    const buttonContainer = document.createElement("div");
    const button = document.createElement("button");
    const date = new Date(show.date);
    const conditions = {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
    };
    const dateString = date
      .toLocaleDateString("en-US", conditions)
      .replace(/,/g, "");
    //data insertion
    dateLabel.innerText = "DATE";
    venueLabel.innerText = "VENUE";
    locLabel.innerText = "LOCATION";
    button.innerText = "BUY TICKETS";
    showDate.innerText = dateString;
    venueName.innerText = show.place;
    locName.innerText = show.location;
    //adding classes
    showCard.classList.add("shows__card");
    dateLabel.classList.add("shows__label");
    showDate.classList.add("shows__date");
    venueLabel.classList.add("shows__label");
    venueName.classList.add("shows__venue");
    locLabel.classList.add("shows__label");
    locName.classList.add("shows__loc");
    buttonContainer.classList.add("shows__btn-container");
    button.classList.add("shows__btn");
    //html insertion
    buttonContainer.appendChild(button);
    showCard.append(
      dateLabel,
      showDate,
      venueLabel,
      venueName,
      locLabel,
      locName,
      buttonContainer
    );
    showsSchedule.appendChild(showCard);
  }
  const firstChild = showsSchedule.children[1];
  const lastChild = showsSchedule.lastElementChild;
  firstChild.classList.add("shows__card--fnode");
  lastChild.classList.add("shows__card--lnode");
}

// Event handler function for clicking on a shows card
function cardClick(e) {
  e.preventDefault();
  const cards = document.querySelectorAll(".shows__card");
  cards.forEach((i) => i.classList.remove("shows__card--clicked"));
  if (
    e.target.nodeName === "DIV" &&
    e.target.classList.contains("shows__card")
  ) {
    e.target.classList.add("shows__card--clicked");
  } else {
    const clickedDiv = e.target.parentNode;
    if (clickedDiv.classList.contains("shows__card"))
      clickedDiv.classList.add("shows__card--clicked");
  }
}

// Invoking necessary functions
setupShows();
