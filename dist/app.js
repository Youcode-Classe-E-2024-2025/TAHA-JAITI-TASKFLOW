var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createLogin, handleLogin } from "./login.js";
import { createRegister, handleRegister } from "./register.js";
import { createHeader } from "./header.js";
import { errPage } from "./404.js";
const userId = sessionStorage.getItem('user_id') || null;
const role = sessionStorage.getItem('role') || null;
const root = document.getElementById('root');
function clearRoot() {
    root.innerHTML = "";
    root.appendChild(createHeader());
}
if (!root) {
    throw new Error('Root element not found');
}
function renderLogin() {
    if (!userId && !role) {
        root.appendChild(createLogin());
    }
}
function renderRegister() {
    if (!userId && !role) {
        root.appendChild(createRegister());
    }
}
function renderErrPage() {
    clearRoot();
    root.innerHTML += errPage();
}
function logOut() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const result = yield fetch('http://localhost/api/logout', {
                method: 'GET'
            });
            const response = yield result.json();
            if (result.ok) {
                if (response) {
                    console.log(response);
                    sessionStorage.clear();
                    navigate('/');
                }
            }
        }
        catch (err) {
            console.error(err);
            alert('error happened while logging out');
        }
    });
}
const routes = {
    "/": renderLogin,
    "/login": renderLogin,
    "/register": renderRegister,
    "/logout": logOut
};
function router() {
    const path = window.location.pathname;
    const route = routes[path];
    if (route) {
        clearRoot();
        route();
    }
    else {
        renderErrPage();
    }
}
function navigate(path) {
    window.history.pushState({}, "", path);
    router();
}
function handleNavigation(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.hasAttribute('href')) {
        const path = target.getAttribute('href');
        if (path && path.startsWith('/')) {
            event.preventDefault();
            navigate(path);
        }
    }
    if (target.tagName === 'FORM') {
        const form = target;
        if (form.id === 'loginForm') {
            event.preventDefault();
            handleLogin().then(() => navigate('/'));
        }
        if (form.id === 'registerForm') {
            event.preventDefault();
            handleRegister().then(() => navigate('/login'));
        }
    }
}
window.addEventListener('popstate', router);
document.addEventListener('DOMContentLoaded', () => {
    router();
});
document.addEventListener('click', handleNavigation);
document.addEventListener('submit', handleNavigation);
