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
const routes = {
    "/": renderLogin,
    "/login": renderLogin,
    "/register": renderRegister,
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
