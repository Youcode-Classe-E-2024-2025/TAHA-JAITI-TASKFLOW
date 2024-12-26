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
const userId = sessionStorage.getItem('user_id') || null;
const role = sessionStorage.getItem('role') || null;
const root = document.getElementById('root');
function clearRoot() {
    root.innerHTML = "";
}
if (!root) {
    throw new Error('Root element not found');
}
function renderLogin() {
    if (!userId && !role) {
        clearRoot();
        root.appendChild(createLogin());
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield handleLogin();
            });
        }
    }
}
function renderRegister() {
    if (!userId && !role) {
        clearRoot();
        root.appendChild(createRegister());
        const registerForm = document.getElementById('registerForm');
        if (registerForm) {
            registerForm.onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
                event.preventDefault();
                yield handleRegister();
            });
        }
    }
}
renderRegister();
