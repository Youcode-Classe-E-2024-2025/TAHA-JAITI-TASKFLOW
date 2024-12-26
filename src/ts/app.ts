import { createLogin, handleLogin } from "./login.js";
import { createRegister, handleRegister } from "./register.js";

const userId = sessionStorage.getItem('user_id') || null;
const role = sessionStorage.getItem('role') || null;

const root = document.getElementById('root') as HTMLDivElement;

function clearRoot (){
    root.innerHTML = "";
}

if (!root){
    throw new Error('Root element not found');
}

function renderLogin() {
    if (!userId && !role){
        clearRoot();
        root.appendChild(createLogin());
        
        const loginForm = document.getElementById('loginForm') as HTMLFormElement;
        if (loginForm){
            loginForm.onsubmit = async (event) => {
                event.preventDefault();
                await handleLogin();
            }
        }
    }
}

function renderRegister(){
    if (!userId && !role){
        clearRoot();
        root.appendChild(createRegister());

        const registerForm = document.getElementById('registerForm') as HTMLFormElement;
        if (registerForm){
            registerForm.onsubmit = async (event) => {
                event.preventDefault();
                await handleRegister();
            }
        }

    }
}

renderRegister();



