const textElement = document.getElementById("text");
const responseElement = document.getElementById("response");
const topBar = document.getElementById("top-bar");
const welcomeBis = document.getElementById("welcome-bis");
const logoutBtn = document.getElementById("logoutBtn");
const menuBtn = document.getElementById("menuBtn");

let index = 0;
let text = "";
let currentSessionId = null;
let lastUser = "";
let lastTama = "";

function resetInterface() {
  ["login-form", "register-form", "game-section"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  document.getElementById("welcome-message").textContent = "";
  welcomeBis.textContent = "";
  textElement.textContent = "";
  responseElement.textContent = "";
  document.getElementById("warning").textContent = "";
  document.getElementById("action-image").innerHTML = "";
  document.getElementById("button-container").style.display = "none";

  document.getElementById("login-username").value = "";
  document.getElementById("login-password").value = "";
  document.getElementById("loginMessage").textContent = "";
  document.getElementById("register-username").value = "";
  document.getElementById("register-password").value = "";
  document.getElementById("register-robotname").value = "";
  document.getElementById("registerMessage").textContent = "";

  topBar.classList.add("hidden");
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) dropdown.classList.add("hidden");
}

function showOnly(sectionId) {
  ["login-form", "register-form", "game-section"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  document.getElementById(sectionId).classList.remove("hidden");
}

// Connexion
document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("loginMessage");

  if (!username || !password) {
    message.textContent = "⚠️ Tous les champs sont requis.";
    return;
  }

  fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom_utilisateur: username, mot_de_passe: password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.error) {
        message.textContent = "❌ " + data.error;
        return;
      }

      lastUser = data.utilisateur;
      lastTama = data.tamabot;
      currentSessionId = new Date().toISOString();

      resetInterface();
      showOnly("game-section");
      setupGameEventListeners();
      // setupDropdownToggle();

      if (data.dejaConnecte) {
        welcomeBis.textContent = `💖 Te revoilà ${lastUser}, ${lastTama} t’attendait ! 💖`;
        topBar.classList.remove("hidden");
        setTimeout(() => {
          welcomeBis.textContent = "";
          document.getElementById("welcome-message").textContent = `Que faire avec ${lastTama} ?`;
        }, 4000);
      } else {
        document.getElementById("welcome-message").textContent = `Bienvenue ${lastUser} !`;
        topBar.classList.remove("hidden");
        setTimeout(() => {
          document.getElementById("welcome-message").textContent = `Tu as ${lastTama}`;
        }, 4000);
      }

      text = `Ton Tamarobot s'appelle ${lastTama}`;
      index = 0;
      typeText();
    })
    .catch(() => {
      message.textContent = "❌ Erreur serveur.";
    });
});

// Inscription
document.getElementById("registerBtn").addEventListener("click", () => {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const robotname = document.getElementById("register-robotname").value.trim();
  const message = document.getElementById("registerMessage");

  if (!username || !password || !robotname) {
    message.textContent = "Tous les champs sont requis.";
    return;
  }

  fetch("http://localhost:3000/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ nom_utilisateur: username, mot_de_passe: password, nom_tama: robotname }),
  })
    .then(res => res.json())
    .then(data => {
      message.textContent = data.error ? "❌ " + data.error : "✅ " + data.message;
    })
    .catch(() => {
      message.textContent = "❌ Erreur serveur.";
    });
});

// Switcher formulaire
document.getElementById("show-register").addEventListener("click", e => {
  e.preventDefault();
  resetInterface();
  showOnly("register-form");
});
document.getElementById("show-login").addEventListener("click", e => {
  e.preventDefault();
  resetInterface();
  showOnly("login-form");
});

// Déconnexion
logoutBtn.addEventListener("click", () => {
  resetInterface();
  showOnly("login-form");
});

// Texte tapé ligne à ligne
function typeText() {
  textElement.textContent = text.slice(0, index);
  index++;
  if (index <= text.length) {
    setTimeout(typeText, 50);
  } else {
    setTimeout(() => {
      textElement.textContent = "";
      document.getElementById("button-container").style.display = "block";
    }, 1000);
  }
}

// Réponses des boutons
function displayResponse(response, isRed = false, type = "") {
  responseElement.textContent = "";
  responseElement.style.color = isRed ? "red" : "";

  const responseText = response.split("");
  let responseIndex = 0;

  const imageContainer = document.getElementById("action-image");
  imageContainer.innerHTML = "";

  let imgSrc = "";
  if (type === "boire") imgSrc = "img/beer.png";
  if (type === "manger") {
    const foodImages = ["img/cake.png", "img/apple.png"];
    imgSrc = foodImages[Math.floor(Math.random() * foodImages.length)];
  }
  if (type === "chanter") imgSrc = "img/music.png";

  if (imgSrc) {
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = type;
    img.style.width = "100px";
    img.style.opacity = "0";
    img.style.transition = "opacity 0.5s ease";
    imageContainer.appendChild(img);

    setTimeout(() => (img.style.opacity = "1"), 10);
    setTimeout(() => {
      img.style.opacity = "0";
      setTimeout(() => (imageContainer.innerHTML = ""), 500);
    }, 3000);
  }

  function typeResponse() {
    responseElement.textContent += responseText[responseIndex];
    responseIndex++;
    if (responseIndex < responseText.length) {
      setTimeout(typeResponse, 100);
    }
  }

  typeResponse();

  if (type) {
    fetch("http://localhost:3000/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: type,
        reponse: response,
        nom_utilisateur: lastUser,
        session_id: currentSessionId,
      }),
    })
      .then(res => res.json())
      .then(data => console.log("Interaction enregistrée :", data))
      .catch(err => console.error("Erreur enregistrement :", err));
  }
}

function getRandomResponse(list) {
  return list[Math.floor(Math.random() * list.length)];
}

// Boutons
document.getElementById("btnBonjour").addEventListener("click", () => {
  displayResponse(getRandomResponse(["Hey !", "Coucou", "Salut !", "Bonjour humain", "Bonjour !"]), false, "bonjour");
});
document.getElementById("btnManger").addEventListener("click", () => {
  displayResponse(getRandomResponse(["Miam miam !", "Bon appétit !", "Voilà de la nourriture !", "non merci je n'ai pas faim"]), false, "manger");
});
document.getElementById("btnBoire").addEventListener("click", () => {
  const response = getRandomResponse(["Boisson donnée !", "Voilà à boire !", "Santé !", "oushddnezaj .. ! ! !"]);
  if (response.includes("oushddnezaj")) {
    displayResponse(response, true, "boire");
    displayWarning("Attention ! Votre Tamarobot a trop bu !");
  } else {
    displayResponse(response, false, "boire");
  }
});
document.getElementById("btnChanter").addEventListener("click", () => {
  displayResponse(getRandomResponse(["La la la !", "Encore une chanson !", "Musique douce...", "zzzz ..."]), false, "chanter");
});

function displayWarning(message) {
  const warning = document.getElementById("warning");
  warning.textContent = message;
  setTimeout(() => (warning.textContent = ""), 5000);
}

// Dropdown menu
let dropdownInitialized = false;

function setupDropdownToggle() {
    if (dropdownInitialized) return; // évite les doublons

    const menuToggle = document.getElementById("menuToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (menuToggle && dropdownMenu) {
        menuToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("hidden");
        });

        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });

        dropdownInitialized = true;
    }
}

function setupGameEventListeners() {
    const menuToggle = document.getElementById("menuToggle");
    const dropdownMenu = document.getElementById("dropdownMenu");

    if (menuToggle && dropdownMenu) {
        menuToggle.onclick = (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle("hidden");
        };

        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
                dropdownMenu.classList.add("hidden");
            }
        });
    }

    const showHistoryBtn = document.getElementById("show-history-btn");
    const closeModalBtn = document.getElementById("close-modal");
    const modal = document.getElementById("history-modal");

    if (showHistoryBtn && modal) {
        showHistoryBtn.onclick = async () => {
            //const res = await fetch(`http://localhost:3000/interactions`);
            const res = await fetch(`http://localhost:3000/interactions?user=${encodeURIComponent(lastUser)}`);

            const data = await res.json();

            const historyList = document.getElementById("history-list");
            historyList.innerHTML = "";

            data.forEach(entry => {
                const li = document.createElement("li");
                li.textContent = `${entry.type} → ${entry.reponse}`;
                historyList.appendChild(li);
            });

            modal.classList.remove("hidden");
        };
    }

    if (closeModalBtn && modal) {
        closeModalBtn.onclick = () => {
            modal.classList.add("hidden");
        };
    }
}