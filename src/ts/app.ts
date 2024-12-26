import { createLogin, handleLogin } from "./login.js";
import { createRegister, handleRegister } from "./register.js";
import { createHeader } from "./header.js";

const userId = sessionStorage.getItem('user_id') || null;
const role = sessionStorage.getItem('role') || null;

const root = document.getElementById('root') as HTMLDivElement;

function clearRoot (){
    root.innerHTML = "";
    root.appendChild(createHeader());
}

if (!root){
    throw new Error('Root element not found');
}

function renderLogin() {
    if (!userId && !role){
        root.appendChild(createLogin());
        const loginForm = document.getElementById('loginForm') as HTMLFormElement;
        const link = document.getElementById('loginLink') as HTMLAnchorElement;
        if (link){
            link.onclick = (e) => navigateTo(e, '/register');
        }

        if (loginForm){
            loginForm.onsubmit = async (event) => {
                event.preventDefault();
                await handleLogin();
                navigateTo(event, '/');
            }
        }
    }
}

function renderRegister(){
    if (!userId && !role){
        root.appendChild(createRegister());
        const registerForm = document.getElementById('registerForm') as HTMLFormElement;
        const link = document.getElementById('registerLink') as HTMLAnchorElement;
        
        if (link){
            link.onclick = (e) => navigateTo(e, '/login');
        }

        if (registerForm){
            registerForm.onsubmit = async (event) => {
                event.preventDefault();
                await handleRegister();
            }
        }

    }
}

const routes: { [key: string]: () => void } = {
    "/": renderLogin,
    "/login": renderLogin,
    "/register": renderRegister,
};

function router () {
    const path = window.location.pathname;
    const route = routes[path];
    if (route){
        clearRoot();
        route();
    } else {
        renderLogin();
    }
}

function navigate(path: string){
    window.history.pushState({}, "", path);
    router();
}

function navigateTo(event: Event, path: string){
    event.preventDefault();
    navigate(path);
}

window.addEventListener('popstate', router);

document.addEventListener('DOMContentLoaded', () => {
    router();
});