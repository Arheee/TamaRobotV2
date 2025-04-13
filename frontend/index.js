const textElement = document.getElementById("text");
const responseElement = document.getElementById("response");
let index = 0;
let text = "";

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
            document.getElementById("login-form").style.display = "none";
            document.getElementById("game-section").classList.remove("hidden");
            document.getElementById("welcome-message").textContent = `Bienvenue ${data.utilisateur} !`;
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
        if (data.error) {
            message.textContent = "❌ " + data.error;
        } else {
            message.textContent = "✅ " + data.message;
        }
    })
    .catch(() => {
        message.textContent = "❌ Erreur serveur.";
    });
});

// Switch forms
document.getElementById("show-register").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("login-form").classList.add("hidden");
    document.getElementById("register-form").classList.remove("hidden");
});

document.getElementById("show-login").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("register-form").classList.add("hidden");
    document.getElementById("login-form").classList.remove("hidden");
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
    displayResponse(getRandomResponse(["Hey !", "Coucou", "Je suis ravi de te voir !", "Salut !", "Bonjour !"]), false, "bonjour");
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
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
}
function displayResponse(response, isRed = false, type = "") {
    responseElement.textContent = "";
    responseElement.style.color = isRed ? "red" : "";
    const responseText = response.split("");
    let responseIndex = 0;
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
            body: JSON.stringify({ type: type, reponse: response })
        })
        .then(res => res.json())
        .then(data => console.log("Interaction enregistrée :", data))
        .catch(err => console.error("Erreur enregistrement :", err));
    }
}
function displayWarning(warningText) {
    const warningElement = document.getElementById("warning");
    warningElement.textContent = warningText;
    setTimeout(() => {
        warningElement.textContent = "";
    }, 5000);
}

document.getElementById("show-history-btn").addEventListener("click", async () => {
    const res = await fetch("http://localhost:3000/interactions");
    const data = await res.json();
  
    const historyList = document.getElementById("history-list");
    historyList.innerHTML = "";
  
    data.forEach(entry => {
      const li = document.createElement("li");
      li.textContent = `${entry.type} → ${entry.reponse}`;
      historyList.appendChild(li);
    });
  
    document.getElementById("history-modal").classList.remove("hidden");
  });
  
  document.getElementById("close-modal").addEventListener("click", () => {
    document.getElementById("history-modal").classList.add("hidden");
  });
