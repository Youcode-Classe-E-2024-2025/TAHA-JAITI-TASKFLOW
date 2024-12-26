import { createLogin, handleLogin } from "./login.js";

let userId = sessionStorage.getItem('user_id') || null;
let role = sessionStorage.getItem('role') || null;

const root = document.getElementById('root') as HTMLDivElement;


if (!root){
    throw new Error('Root element not found');
}

if (!userId){
    root.appendChild(createLogin());
    
    const loginForm = document.getElementById('loginForm') as HTMLFormElement;
    if (loginForm){
        loginForm.onsubmit = async (event) => {
            event.preventDefault();
            await handleLogin();
        }
    }

}