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
let userId = sessionStorage.getItem('user_id') || null;
let role = sessionStorage.getItem('role') || null;
const root = document.getElementById('root');
if (!root) {
    throw new Error('Root element not found');
}
if (!userId) {
    root.appendChild(createLogin());
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
            event.preventDefault();
            yield handleLogin();
        });
    }
}
