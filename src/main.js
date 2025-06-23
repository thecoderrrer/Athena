window.onload = function () {
    // Fade in the background
    setTimeout(() => {
      document.getElementById("background").style.opacity = "1";
    }, 500); // Slight delay ensures it applies after page load

    // Fade out text and reveal homepage
    setTimeout(() => {
        document.getElementById("hello-text").style.display = "none";

        // Show homepage content
        const content = document.getElementById("homepage-content");
        content.classList.remove("hidden");

        setTimeout(() => {
            content.style.opacity = "1";
            content.style.transform = "translateY(0)";
        }, 500);
    }, 11000); // Matches background fade timing
};

document.querySelector(".menu-btn").addEventListener("click", function() {
    if (this.classList.contains("active")) {
        this.classList.remove("active");

        // ✅ Force animation restart by triggering reflow
        void this.offsetWidth;

        this.classList.add("not-active");
    } else {
        this.classList.remove("not-active");

        // ✅ Ensure reverse animation is detected as a new cycle
        void this.offsetWidth;

        this.classList.add("active");
    }
});

document.getElementById("add-subject-btn").addEventListener("click", () => {
  document.getElementById("subject-popup").classList.remove("hidden");
});

document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("subject-popup").classList.add("hidden");
});

import { subjectsData } from "./assets/DATA/data.js";

function populatePopupGrid() {
  const popupGrid = document.getElementById("popup-grid");
  popupGrid.innerHTML = ""; // Clear previous content

  Object.keys(subjectsData).forEach((subjectName) => {
    // Create a subject box for each subject
    const gridItem = document.createElement("div");
    gridItem.classList.add("popup-grid-item");

    // **Check if subject is active, and add a class for styling**
    if (subjectsData[subjectName].active) {
      gridItem.classList.add("active-subject");
    }

    // Insert subject name
    gridItem.innerHTML = `<h3>${subjectName}</h3>`;

    // **Make the subject clickable to toggle its state**
    gridItem.addEventListener("click", async () => {
      subjectsData[subjectName].active = !subjectsData[subjectName].active; // Toggle active state
      await saveSubjects(subjectsData); // Persist changes

      populatePopupGrid(); // ✅ Refresh the popup to reflect changes
      updateSubjectGrid(); // ✅ Refresh homepage grid visibility
    });

    // Append the item to the popup grid
    popupGrid.appendChild(gridItem);
  });
}


// Call this function every time the popup opens
document.getElementById("add-subject-btn").addEventListener("click", () => {
  populatePopupGrid(); // ✅ Load subjects into the popup
  document.getElementById("subject-popup").classList.remove("hidden");
});


function updateSubjectGrid() {
  const subjectBoxes = document.querySelectorAll(".subject-box");

  subjectBoxes.forEach((box) => {
    const subjectTextElement = box.querySelector(".subject-text");
    if (!subjectTextElement) return;

    const subjectName = subjectTextElement.textContent.trim();

    if (subjectsData.hasOwnProperty(subjectName)) {
      if (subjectsData[subjectName].active) {
        box.classList.remove("hidden"); // ✅ Show subject
      } else {
        box.classList.add("hidden"); // ✅ Hide subject
      }
    } else {
      console.error("Subject not found in subjectsData:", subjectName);
    }
  });
}

function saveSubjects(data) {
  localStorage.setItem("subjectsData", JSON.stringify(data)); // ✅ Save data in local storage
}

