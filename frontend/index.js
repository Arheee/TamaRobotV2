const textElement = document.getElementById("text");
const responseElement = document.getElementById("response");
const text = "Bienvenue sur le jeu du Tamarobot npc";
let index = 0;

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

typeText();
document.getElementById("button-container").style.display = "none";

document.getElementById("btnBonjour").addEventListener("click", () => {
    const response = getRandomResponse(["Hey !", "Coucou", "Je suis ravi de te voir !", "Salut !", "Bonjour !"]);
    displayResponse(response, false, "bonjour");
});

document.getElementById("btnManger").addEventListener("click", () => {
    const response = getRandomResponse(["Nourriture donnée !", "Bon appétit !", "Miam miam !", "Voilà de la nourriture, miaam !", "non merci je n'ai pas faim"]);
    displayResponse(response, false, "manger");
});

document.getElementById("btnBoire").addEventListener("click", () => {
    const response = getRandomResponse([" Boisson donnée !", " Voilà à boire !", " Santé !", " oushddnezaj .. ! ! !", " Un peu d'eau pour moi slurp !"]);
    const isTooDrunk = response === " oushddnezaj .. ! ! !";

    if (isTooDrunk) {
        displayResponse(response, true, "boire");
        displayWarning("Attention Votre Tamarobot a trop bu");
    } else {
        displayResponse(response, false, "boire");
    }
});

document.getElementById("btnChanter").addEventListener("click", () => {
    const response = getRandomResponse(["La la la... Une belle berceuse !", "je veux chanter avec toi !", "Musique douce...", "zzzz ...", "encore une chanson !"]);
    displayResponse(response, false, "chanter");
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
        .then(data => console.log("✅ Interaction enregistrée :", data))
        .catch(err => console.error("❌ Erreur enregistrement :", err));
    }
}

function displayWarning(warningText) {
    const warningElement = document.getElementById("warning");
    warningElement.textContent = warningText;
    setTimeout(() => {
        warningElement.textContent = "";
    }, 5000);
}

// Gestion du bouton historique + modal
const modal = document.getElementById("history-modal");
const btn = document.getElementById("show-history-btn");
const span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
    fetch("http://localhost:3000/interactions")
        .then(res => res.json())
        .then(data => {
            const historyList = document.getElementById("history-list");
            historyList.innerHTML = "";
            data.forEach(item => {
                const li = document.createElement("li");
                li.textContent = `[${item.type}] ${item.reponse}`;
                historyList.appendChild(li);
            });
            modal.style.display = "block";
        });
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
