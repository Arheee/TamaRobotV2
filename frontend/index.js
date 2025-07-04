// Helpers utils intégrés
async function postJSON(url, data) {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    let errorMsg = "Erreur serveur";
    try {
      const errorData = await response.json();
      if (errorData.error) errorMsg = errorData.error;
    } catch {
      // Pas de JSON retourné
    }
    throw new Error(errorMsg);
  }

  return response.json();
}

async function getJSON(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Erreur réseau");
  }
  return response.json();
}


// Variables globales
const textElement = document.getElementById("text");
const responseElement = document.getElementById("response");
const topBar = document.getElementById("top-bar");
const welcomeBis = document.getElementById("welcome-bis");
const logoutBtn = document.getElementById("logoutBtn");

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

  ["login-username", "login-password", "register-username", "register-password", "register-robotname"].forEach(id => {
    const input = document.getElementById(id);
    if(input) input.value = "";
  });

  ["loginMessage", "registerMessage"].forEach(id => {
    const msg = document.getElementById(id);
    if(msg) msg.textContent = "";
  });

  topBar.classList.add("hidden");
  const dropdown = document.getElementById("dropdownMenu");
  if (dropdown) dropdown.classList.add("hidden");
}

function showOnly(sectionId) {
  ["login-form", "register-form", "game-section"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });
  const toShow = document.getElementById(sectionId);
  if(toShow) toShow.classList.remove("hidden");
}

// Connexion
document.getElementById("loginBtn").addEventListener("click", async () => {
  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value.trim();
  const message = document.getElementById("loginMessage");
  const t_pot_connexion = document.getElementById("t_pot_connexion").value;

  if (!username || !password) {
    message.textContent = "⚠️ Tous les champs sont requis.";
    return;
  }

  try {
    
    const data = await postJSON("http://api.tamarobot.localhost/login", {
      nom_utilisateur: username,
      mot_de_passe: password,
      t_pot_connexion: t_pot_connexion
    });

    if (data.utilisateur === "admin" && data.tamabot === "TamaKing") {
      window.location.href = "/admin.html";
      return;
    }

    lastUser = data.utilisateur;
    lastTama = data.tamabot;
    currentSessionId = new Date().toISOString();

    resetInterface();
    showOnly("game-section");
    setupGameEventListeners();

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

  } catch (err) {
    console.error(err);
    message.textContent = "❌ " + err.message;
  }
});

// Inscription
document.getElementById("registerBtn").addEventListener("click", async () => {
  const username = document.getElementById("register-username").value.trim();
  const password = document.getElementById("register-password").value.trim();
  const robotname = document.getElementById("register-robotname").value.trim();
  const message = document.getElementById("registerMessage");
  const t_pot = document.getElementById("t_pot").value;

  if (!username || !password || !robotname) {
    message.textContent = "Tous les champs sont requis.";
    return;
  }

  try {
    const data = await postJSON("http://api.tamarobot.localhost/register", {
      nom_utilisateur: username,
      mot_de_passe: password,
      nom_tama: robotname,
      t_pot: t_pot
    });

    message.textContent = data.error ? "❌ " + data.error : "✅ " + data.message;

  } catch (err) {
    message.textContent = "❌ " + err.message;
  }
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
    fetch("http://api.tamarobot.localhost/interactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
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
      try {
        const res = await fetch(`http://api.tamarobot.localhost/interactions?user=${encodeURIComponent(lastUser)}`);
        const data = await res.json();

        const now = new Date();
        const twoDaysAgo = new Date(now);
        twoDaysAgo.setDate(now.getDate() - 2);

        const filteredData = data.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= twoDaysAgo && entry.nom_utilisateur === lastUser;
        });

        const historyList = document.getElementById("history-list");
        historyList.innerHTML = "";

        const grouped = {};
        filteredData.forEach(entry => {
          if (!grouped[entry.session_id]) grouped[entry.session_id] = [];
          grouped[entry.session_id].push(entry);
        });

        Object.keys(grouped).sort().reverse().forEach(session => {
          const header = document.createElement("li");
          header.textContent = ` (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧Connexion du ${new Date(session).toLocaleString()}`;
          header.style.fontWeight = "bold";
          header.style.marginTop = "1rem";
          historyList.appendChild(header);

          grouped[session].forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.type} → ${entry.reponse}`;
            historyList.appendChild(li);
          });

          const separator = document.createElement("li");
          separator.textContent = "______________________________________________";
          separator.style.color = "#0ac7bc";
          separator.style.marginBottom = "1rem";
          historyList.appendChild(separator);
        });

        // Statistiques
        const stats = { bonjour: 0, manger: 0, boire: 0, chanter: 0 };
        filteredData.forEach(entry => {
          if (stats[entry.type] !== undefined) {
            stats[entry.type]++;
          }
        });

        const statsHeader = document.createElement("li");
        statsHeader.textContent = "✨ Statistiques récentes ✨";
        statsHeader.style.fontWeight = "bold";
        statsHeader.style.marginTop = "1.5rem";
        historyList.appendChild(statsHeader);

        Object.entries(stats).forEach(([action, count]) => {
          const statLine = document.createElement("li");
          statLine.textContent = `${action} → ${count} fois`;
          historyList.appendChild(statLine);
        });

        modal.classList.remove("hidden");
      } catch (error) {
        console.error("Erreur récupération historique :", error);
      }
    };
  }

  if (closeModalBtn && modal) {
    closeModalBtn.onclick = () => {
      modal.classList.add("hidden");
    };
  }
}
