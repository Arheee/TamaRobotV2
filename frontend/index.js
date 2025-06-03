const textElement = document.getElementById("text");
const responseElement = document.getElementById("response");
const topBar = document.getElementById("top-bar");
const welcomeBis = document.getElementById("welcome-bis");
const logoutBtn = document.getElementById("logoutBtn");
const menuBtn = document.getElementById("menuBtn");

let index = 0;
let text = "";
let currentSessionId = null;

function resetInterface() {
    const sections = ["login-form", "register-form", "game-section"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });

    document.getElementById("welcome-message").textContent = "";
    document.getElementById("welcome-bis").textContent = "";
    document.getElementById("text").textContent = "";
    document.getElementById("response").textContent = "";
    document.getElementById("warning").textContent = "";
    const imageContainer = document.getElementById("action-image");
    if (imageContainer) imageContainer.innerHTML = "";
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

function showOnly(sectionIdToShow) {
    const sections = ["login-form", "register-form", "game-section"];
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.add("hidden");
    });
    const toShow = document.getElementById(sectionIdToShow);
    if (toShow) toShow.classList.remove("hidden");
}

// Login
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
        body: JSON.stringify({ nom_utilisateur: username, mot_de_passe: password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.error) {
            message.textContent = "❌ " + data.error;
        } else {
            

            resetInterface();
            showOnly("game-section");
            setupDropdownToggle();

            const dejaConnecte = data.dejaConnecte;
            

            if (dejaConnecte) {
                welcomeBis.textContent = `💖 Te revoilà ${data.utilisateur}, ${data.tamabot} t’attendait ! 💖`;
                topBar.classList.remove("hidden");
                setTimeout(() => {
                    welcomeBis.textContent = "";
                    document.getElementById("welcome-message").textContent = `Que faire avec ${data.tamabot} ?`;
                }, 4000);
            } else {
                document.getElementById("welcome-message").textContent = `Bienvenue ${data.utilisateur} !`;
                topBar.classList.remove("hidden");
                setTimeout(() => {
                    document.getElementById("welcome-message").textContent = `Tu as ${data.tamabot}`;
                }, 4000);
            }

            text = `Ton Tamarobot s'appelle ${data.tamabot}`;
            index = 0;
            typeText();
        }
    })
    .catch(() => {
        message.textContent = "❌ Erreur serveur.";
    });
});

// Register
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
        body: JSON.stringify({ nom_utilisateur: username, mot_de_passe: password, nom_tama: robotname })
    })
    .then(res => res.json())
    .then(data => {
        message.textContent = data.error ? "❌ " + data.error : "✅ " + data.message;
    })
    .catch(() => {
        message.textContent = "❌ Erreur serveur.";
    });
});

// Switch forms
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

// Retour menu
menuBtn.addEventListener("click", () => {
    textElement.textContent = "";
    welcomeBis.textContent = `Te revoilà ${lastUser}, tu as manqué à ${lastTama} ❤️`;
});

// Texte effet
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
document.getElementById("button-container").style.display = "none";

// Actions
document.getElementById("btnBonjour").addEventListener("click", () => {
    displayResponse(getRandomResponse(["Hey !", "Coucou", "Je suis ravi de te voir !", "Salut !", "Bonjour humain", "Bonjour !"]), false, "bonjour");
});
document.getElementById("btnManger").addEventListener("click", () => {
    displayResponse(getRandomResponse(["Nourriture donnée !", "Bon appétit !", "Miam miam !", "Voilà de la nourriture, miaam !", "non merci je n'ai pas faim"]), false, "manger");
});
document.getElementById("btnBoire").addEventListener("click", () => {
    const response = getRandomResponse([" Boisson donnée !", " Voilà à boire !", " Santé !", " oushddnezaj .. ! ! !", " Un peu d'eau pour moi slurp !"]);
    if (response === " oushddnezaj .. ! ! !") {
        displayResponse(response, true, "boire");
        displayWarning("Attention Votre Tamarobot a trop bu");
    } else {
        displayResponse(response, false, "boire");
    }
});
document.getElementById("btnChanter").addEventListener("click", () => {
    displayResponse(getRandomResponse(["La la la... Une belle berceuse !", "je veux chanter avec toi !", "Musique douce...", "zzzz ...", "encore une chanson !"]), false, "chanter");
});

function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

function displayResponse(response, isRed = false, type = "") {
    responseElement.textContent = "";
    responseElement.style.color = isRed ? "red" : "";
    const responseText = response.split("");
    let responseIndex = 0;

    const imageContainer = document.getElementById("action-image");
    if (imageContainer) {
        imageContainer.innerHTML = "";

        let imgSrc = "";
        switch (type) {
            case "boire":
                imgSrc = "img/beer.png";
                break;
            case "manger":
                const foodImages = ["img/cake.png", "img/apple.png"];
                imgSrc = foodImages[Math.floor(Math.random() * foodImages.length)];
                break;
            case "chanter":
                imgSrc = "img/music.png";
                break;
        }

        if (imgSrc) {
            const img = document.createElement("img");
            img.src = imgSrc;
            img.alt = type;
            img.style.width = "100px";
            img.style.opacity = "0";
            img.style.transition = "opacity 0.5s ease";
            imageContainer.appendChild(img);

            setTimeout(() => img.style.opacity = "1", 10);
            setTimeout(() => {
                img.style.opacity = "0";
                setTimeout(() => imageContainer.innerHTML = "", 500);
            }, 3000);
        }
    }

    function typeResponse() {
        responseElement.textContent += responseText[responseIndex];
        responseIndex++;
        if (responseIndex < responseText.length) {
            setTimeout(typeResponse, 100);
        }
    }
    typeResponse();

    // if (type) {
    //     fetch("http://localhost:3000/interactions", {
    //         method: "POST",
    //         headers: { "Content-Type": "application/json" },       
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log("Interaction enregistrée :", data))
    //     .catch(err => console.error("Erreur enregistrement :", err));
    // }
}

function displayWarning(warningText) {
    const warningElement = document.getElementById("warning");
    warningElement.textContent = warningText;
    setTimeout(() => {
        warningElement.textContent = "";
    }, 5000);
}

document.getElementById("show-history-btn").addEventListener("click", async () => {
    const res = await fetch(`http://localhost:3000/interactions?user=${encodeURIComponent(lastUser)}`);
    const data = await res.json();

    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";

     const grouped = {};
    data.forEach(entry => {
        if (!grouped[entry.session_id]) grouped[entry.session_id] = [];
        grouped[entry.session_id].push(entry);
    });

    for (const session of Object.keys(grouped).sort().reverse()) {
        const header = document.createElement("li");
        header.textContent = `ლ(╹◡╹ლ) Connexion du ${new Date(session).toLocaleString()}`;
        header.style.fontWeight = "bold";
        header.style.marginTop = "1rem";
        historyList.appendChild(header);

        grouped[session].forEach(entry => {
            const li = document.createElement("li");
            li.textContent = `${entry.type} → ${entry.reponse}`;
            historyList.appendChild(li);
        });
    }

    document.getElementById("history-modal").classList.remove("hidden");
});

document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("history-modal").classList.add("hidden");
});

// Dropdown
function setupDropdownToggle() {
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
    }
}