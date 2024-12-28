import { createLogin, handleLogin } from "./login.js";
import { createRegister, handleRegister } from "./register.js";
import { createHeader } from "./header.js";
import { createMain } from "./main.js";
import { errPage } from "./404.js";

const root = document.getElementById("root") as HTMLDivElement;

if (!root) {
    throw new Error("Root element not found");
}

//getting session data
function getSessionData() {
    return {
        userId: sessionStorage.getItem("user_id") || null,
        role: sessionStorage.getItem("role") || null,
    };
}

//clear root for rerendering
function clearRoot() {
    root.innerHTML = "";
    root.appendChild(createHeader());
}

//-----ROUTING LOGIC

//routes 
const routes: { [key: string]: { render: () => void; requiresAuth: boolean } } = {
    "/": { render: renderMain, requiresAuth: true },
    "/login": { render: renderLogin, requiresAuth: false },
    "/register": { render: renderRegister, requiresAuth: false },
    "/logout": { render: logOut, requiresAuth: true },
};

//router function
function router() {
    const path = window.location.pathname;
    const route = routes[path];
    const { userId } = getSessionData();

    if (route) {
        clearRoot();

        if (route.requiresAuth && !userId) {
            navigate("/login");
            return;
        }

        route.render();
    } else {
        renderErrPage();
    }
}

//navigation function
function navigate(path: string) {
    window.history.pushState({}, "", path);
    router();
}

//handling navigation
function handleNavigation(event: Event) {
    const target = event.target as HTMLElement;

    if (target.tagName === "A" && target.hasAttribute("href")) {
        const path = target.getAttribute("href");
        if (path && path.startsWith("/")) {
            event.preventDefault();
            navigate(path);
        }
    }

    if (target.tagName === "FORM") {
        const form = target as HTMLFormElement;
        event.preventDefault();

        if (form.id === "loginForm") {
            handleLogin()
                .then(() => navigate("/"))
                .catch((error) => console.error("Login failed:", error));
        }

        if (form.id === "registerForm") {
            handleRegister()
                .then(() => navigate("/login"))
                .catch((error) => console.error("Register failed:", error));
        }
    }
}

//---RENDER LOGIC

function renderLogin() {
    const { userId } = getSessionData();
    if (!userId) {
        root.appendChild(createLogin());
    } else {
        navigate("/");
    }
}

function renderRegister() {
    const { userId } = getSessionData();
    if (!userId) {
        root.appendChild(createRegister());
    } else {
        navigate("/");
    }
}

function renderMain(){
    const {userId} = getSessionData();
    if (userId){
        root.appendChild(createMain());
    } else {
        navigate('/login');
    }
}

function renderErrPage() {
    clearRoot();
    root.innerHTML += errPage();
}


//--- LOG OUT LOGIC
async function logOut() {
    try {
        const response = await fetch("http://localhost/api/logout", { method: "GET" });
        if (!response.ok) {
            throw new Error("Logout failed");
        }

        const result = await response.json();

        alert(result.message);
        sessionStorage.clear();
        navigate("/login");
    } catch (error) {
        console.error("Error logging out:", error);
        alert("An error occurred during logout.");
    }
}






//necessary event listeners
window.addEventListener("popstate", router);
document.addEventListener("DOMContentLoaded", router);
document.addEventListener("click", handleNavigation);
document.addEventListener("submit", handleNavigation);
