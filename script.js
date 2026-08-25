/* ================= WORKER DATA ================= */

const workers = [

  {
    name: "Raj Kumar",
    category: "Electrician",
    initials: "RK",
    experience: "6+ Years",
    price: "₹350",
    rating: "4.9",
    reviews: 128,
    location: "2.4 km",
    trust: 92,
    available: true,
    tags: ["Wiring", "AC Repair", "Installation"]
  },

  {
    name: "Amit Sharma",
    category: "Plumber",
    initials: "AS",
    experience: "8+ Years",
    price: "₹300",
    rating: "4.8",
    reviews: 96,
    location: "3.1 km",
    trust: 90,
    available: true,
    tags: ["Pipe Repair", "Leakage", "Fittings"]
  },

  {
    name: "Vijay Singh",
    category: "Carpenter",
    initials: "VS",
    experience: "10+ Years",
    price: "₹500",
    rating: "4.9",
    reviews: 152,
    location: "4.2 km",
    trust: 95,
    available: true,
    tags: ["Furniture", "Doors", "Woodwork"]
  },

  {
    name: "Rohit Verma",
    category: "Painter",
    initials: "RV",
    experience: "5+ Years",
    price: "₹450",
    rating: "4.7",
    reviews: 74,
    location: "2.8 km",
    trust: 87,
    available: false,
    tags: ["Interior", "Exterior", "Texture"]
  },

  {
    name: "Sandeep Yadav",
    category: "Mechanic",
    initials: "SY",
    experience: "7+ Years",
    price: "₹400",
    rating: "4.8",
    reviews: 111,
    location: "5.0 km",
    trust: 91,
    available: true,
    tags: ["Bike", "Car", "Engine"]
  },

  {
    name: "Manoj Patel",
    category: "Cleaner",
    initials: "MP",
    experience: "4+ Years",
    price: "₹250",
    rating: "4.6",
    reviews: 62,
    location: "1.9 km",
    trust: 85,
    available: true,
    tags: ["Home", "Office", "Deep Clean"]
  }

];


/* ================= ELEMENTS ================= */

const workersGrid =
  document.getElementById("workersGrid");

const workerSearch =
  document.getElementById("workerSearch");

const categoryFilter =
  document.getElementById("categoryFilter");

const empty =
  document.getElementById("empty");

const toast =
  document.getElementById("toast");

const authModal =
  document.getElementById("authModal");

const requestModal =
  document.getElementById("requestModal");


/* ================= TOAST ================= */

function showToast(message) {

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);
}


/* ================= RENDER WORKERS ================= */

function renderWorkers() {

  const search =
    workerSearch.value
      .trim()
      .toLowerCase();

  const category =
    categoryFilter.value;


  const filteredWorkers =
    workers.filter(worker => {

      const matchesCategory =
        category === "All" ||
        worker.category === category;

      const text =
        `
        ${worker.name}
        ${worker.category}
        ${worker.tags.join(" ")}
        `.toLowerCase();

      const matchesSearch =
        text.includes(search);

      return matchesCategory &&
             matchesSearch;

    });


  workersGrid.innerHTML = "";


  filteredWorkers.forEach(worker => {

    const card =
      document.createElement("div");

    card.className =
      "worker-card";


    card.innerHTML = `

      <div class="worker-top">

        <div class="worker-avatar">
          ${worker.initials}
        </div>

        <div>

          <h3>
            ${worker.name}
          </h3>

          <div class="worker-role">
            ${worker.category}
          </div>

        </div>

        <div class="worker-verified">
          ✓ Verified
        </div>

      </div>


      <div class="worker-rating">

        ★★★★★

        <strong>
          ${worker.rating}
        </strong>

        <span>
          (${worker.reviews} reviews)
        </span>

      </div>


      <div class="worker-info">

        <div>
          <small>
            Experience
          </small>

          <strong>
            ${worker.experience}
          </strong>
        </div>


        <div>
          <small>
            Trust Score
          </small>

          <strong style="color:#21e6b2">
            ${worker.trust}/100
          </strong>
        </div>


        <div>
          <small>
            Starting From
          </small>

          <strong>
            ${worker.price}
          </strong>
        </div>


        <div>
          <small>
            Distance
          </small>

          <strong>
            ${worker.location}
          </strong>
        </div>

      </div>


      <div class="worker-tags">

        ${worker.tags
          .map(tag => `<span>${tag}</span>`)
          .join("")}

      </div>


      <div class="worker-bottom">

        <span class="available-status">

          ${worker.available
            ? "● Available today"
            : "● Currently busy"}

        </span>


        <button
          class="request-btn"
          data-worker="${worker.name}"
          ${worker.available
            ? ""
            : "disabled"}
        >

          Request Service

        </button>

      </div>

    `;


    workersGrid.appendChild(card);

  });


  empty.style.display =
    filteredWorkers.length === 0
      ? "block"
      : "none";

}


/* ================= SEARCH ================= */

workerSearch.addEventListener(
  "input",
  renderWorkers
);


categoryFilter.addEventListener(
  "change",
  renderWorkers
);


/* ================= HERO SEARCH ================= */

document
  .getElementById("searchBtn")
  .addEventListener("click", () => {

    const search =
      document
        .getElementById("searchInput")
        .value;

    workerSearch.value =
      search;

    categoryFilter.value =
      "All";

    document
      .getElementById("workers")
      .scrollIntoView({
        behavior: "smooth"
      });

    renderWorkers();

  });


/* ================= SERVICE CATEGORY ================= */

document
  .querySelectorAll("[data-category]")
  .forEach(button => {

    button.addEventListener(
      "click",
      () => {

        const category =
          button.dataset.category;

        categoryFilter.value =
          category;

        workerSearch.value =
          "";

        document
          .getElementById("workers")
          .scrollIntoView({
            behavior: "smooth"
          });

        renderWorkers();

      }
    );

  });


/* ================= REQUEST MODAL ================= */

document.addEventListener(
  "click",
  event => {

    const button =
      event.target.closest(
        "[data-worker], [data-request]"
      );


    if (!button) return;


    const workerName =
      button.dataset.worker ||
      button.dataset.request;


    document
      .getElementById("selectedWorker")
      .textContent =
      `Send your service request to ${workerName}.`;


    requestModal.classList.add(
      "active"
    );

  }
);


/* ================= CLOSE REQUEST ================= */

document
  .getElementById("closeRequest")
  .addEventListener(
    "click",
    () => {

      requestModal.classList.remove(
        "active"
      );

    }
  );


/* ================= REQUEST FORM ================= */

document
  .getElementById("requestForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();

      requestModal.classList.remove(
        "active"
      );

      showToast(
        "Service request sent successfully!"
      );

      event.target.reset();

    }
  );


/* ================= LOGIN / SIGNUP ================= */

let signupMode = false;


function openAuth(signup) {

  signupMode = signup;


  const title =
    document.getElementById(
      "authTitle"
    );

  const description =
    document.getElementById(
      "authDescription"
    );

  const buttonText =
    document.getElementById(
      "authButtonText"
    );

  const nameField =
    document.getElementById(
      "nameField"
    );

  const switchText =
    document.getElementById(
      "switchText"
    );

  const switchButton =
    document.getElementById(
      "switchAuth"
    );


  if (signup) {

    title.textContent =
      "Create Account";

    description.textContent =
      "Create your free Finding Worker account.";

    buttonText.textContent =
      "Create Account";

    nameField.classList.remove(
      "hidden"
    );

    switchText.textContent =
      "Already have an account?";

    switchButton.textContent =
      "Login";

  }

  else {

    title.textContent =
      "Welcome Back";

    description.textContent =
      "Login to your Finding Worker account.";

    buttonText.textContent =
      "Login";

    nameField.classList.add(
      "hidden"
    );

    switchText.textContent =
      "Don't have an account?";

    switchButton.textContent =
      "Sign Up";

  }


  authModal.classList.add(
    "active"
  );

}


document
  .getElementById("loginBtn")
  .addEventListener(
    "click",
    () => openAuth(false)
  );


document
  .getElementById("signupBtn")
  .addEventListener(
    "click",
    () => openAuth(true)
  );


document
  .getElementById("ctaSignup")
  .addEventListener(
    "click",
    () => openAuth(true)
  );


document
  .getElementById("switchAuth")
  .addEventListener(
    "click",
    () => {

      openAuth(!signupMode);

    }
  );


/* ================= AUTH FORM ================= */

document
  .getElementById("authForm")
  .addEventListener(
    "submit",
    event => {

      event.preventDefault();


      if (signupMode) {

        const name =
          document
            .getElementById("name")
            .value;


        if (!name.trim()) {

          showToast(
            "Please enter your name."
          );

          return;

        }


        authModal.classList.remove(
          "active"
        );


        showToast(
          `Account created for ${name}!`
        );

      }

      else {

        authModal.classList.remove(
          "active"
        );


        showToast(
          "Login successful!"
        );

      }


      event.target.reset();

    }
  );


/* ================= CLOSE AUTH ================= */

document
  .getElementById("closeAuth")
  .addEventListener(
    "click",
    () => {

      authModal.classList.remove(
        "active"
      );

    }
  );


/* ================= CLOSE MODALS ================= */

document
  .querySelectorAll(".modal")
  .forEach(modal => {

    modal.addEventListener(
      "click",
      event => {

        if (
          event.target === modal
        ) {

          modal.classList.remove(
            "active"
          );

        }

      }
    );

  });


/* ================= MOBILE MENU ================= */

const menuBtn =
  document.getElementById(
    "menuBtn"
  );

const nav =
  document.getElementById(
    "nav"
  );


menuBtn.addEventListener(
  "click",
  () => {

    if (
      nav.style.display ===
      "flex"
    ) {

      nav.style.display =
        "none";

    }

    else {

      nav.style.display =
        "flex";

      nav.style.position =
        "absolute";

      nav.style.top =
        "70px";

      nav.style.left =
        "0";

      nav.style.right =
        "0";

      nav.style.padding =
        "20px";

      nav.style.background =
        "#091613";

      nav.style.flexDirection =
        "column";

    }

  }
);


/* ================= ESC KEY ================= */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      authModal.classList.remove(
        "active"
      );

      requestModal.classList.remove(
        "active"
      );

    }

  }
);


/* ================= INITIAL LOAD ================= */

renderWorkers();