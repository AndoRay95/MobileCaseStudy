const currentDate = document.querySelector(".current-date");
daysTag = document.querySelector(".days");
prevNextIcon = document.querySelectorAll(".icons span");

// GetElement des des Pop-Up Fensters
const openBtn = document.getElementById("openModal");
const closeBtn = document.getElementById("closeModal");
const modal = document.getElementById("modal");

openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});
openBtn.addEventListener("click", () => {
  modal.classList.add("open");
});

//Neues Datum bekommen, aktuelles jahr und monat
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
  "January",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];

const renderCalender = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), //Erste Tag des Monats
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  let liTag = "";

  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }

  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};
renderCalender();

prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    //Clickevent auf den icons
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth);
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalender();
  });
});

// Pop Up fenster für Toggle Button

const toggleSwitch1 = document.getElementById("switch1");
const toggleSwitch2 = document.getElementById("switch2");

toggleSwitch1.addEventListener("change", function () {
  handleToggleChange(this, "modal");
});

toggleSwitch2.addEventListener("change", function () {
  handleToggleChange(this, "modal");
});

function handleToggleChange(toggleSwitch, modalId) {
  const modal = document.getElementById(modalId);

  if (toggleSwitch.checked) {
    modal.classList.add("open");
  } else {
    modal.classList.remove("open");
  }
}

document
  .getElementById("closeModalBack")
  .addEventListener("click", function () {
    closeModal("modal");
  });

document
  .getElementById("closeModalConfirm")
  .addEventListener("click", function () {
    // Fügen Sie hier die Logik für die Abmeldung hinzu
    alert("Abmeldung durchgeführt!");
    closeModal("modal");
  });

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.remove("open");
}

document
  .getElementById("closeModalBack")
  .addEventListener("click", function () {
    document.getElementById("switch1").checked = false;
    document.getElementById("modal").classList.remove("open");
  });

//Code infobox
document.addEventListener("DOMContentLoaded", function () {
  const infoIconsFach1 = document.querySelectorAll(".info-icon-fach1");
  const infoIconsFach2 = document.querySelectorAll(".info-icon-fach2");
  const infoBox = document.querySelector(".info-box");
  const infoContent = document.querySelector(".info-content");
  function hideInfoBox() {
    var infoBox = document.getElementById("infoBox");
    infoBox.classList.remove("active");
  }

  function showInfoBox(
    fachName,
    professor,
    artDerPrufung,
    prufungDatum,
    status
  ) {
    infoContent.innerHTML = `
      <h3>${fachName}</h3><br> <br> 
      <p><strong>Professor:</strong><br> ${professor}</p><br> 
      <p><strong>Art der Prüfung:</strong> <br> ${artDerPrufung}</p><br> 
      <p><strong>Datum der Prüfungseinsicht:</strong> <br> ${prufungDatum}</p><br> 
      <p><strong>Status:</strong><br><span class="Angemeldet">${status}</span></p>

    `;

    // Show info box
    infoBox.classList.add("active");
  }

  function getInfoForFach(fachId) {
    // Implement logic to get information based on the Fach ID
    // Replace the following with actual data retrieval logic
    switch (fachId) {
      case "fach1":
        return [
          "Betriebswirtschaft",
          "Prof. Dr. Mühlfriedl",
          "Schriftliche Prüfung",
          "02.02.2023",
          "Angemeldet",
        ];
      case "fach2":
        return [
          "Mobile Case Study",
          "Michael Deller",
          "Mündliche Prüfung",
          "03.03.2023",
          "Angemeldet",
        ];
      default:
        return [];
    }
  }

  function attachClickEvent(infoIcons, fachId) {
    infoIcons.forEach((icon) => {
      icon.addEventListener("click", function () {
        const [fachName, professor, artDerPrufung, prufungDatum, status] =
          getInfoForFach(fachId);
        showInfoBox(fachName, professor, artDerPrufung, prufungDatum, status);
      });
    });
  }

  // Attach click events for different Fachs
  attachClickEvent(infoIconsFach1, "fach1");
  attachClickEvent(infoIconsFach2, "fach2");

  // Close info box when clicking outside
  document.addEventListener("click", function (event) {
    if (
      !infoBox.contains(event.target) &&
      !infoIconsFach1[0].contains(event.target) &&
      !infoIconsFach2[0].contains(event.target)
    ) {
      infoBox.classList.remove("active");
    }
  });
});
