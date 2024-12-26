import { createLogin, handleLogin } from "./login.js";

const userId = sessionStorage.getItem('user_id') || null;
const role = sessionStorage.getItem('role') || null;

console.log(sessionStorage);


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

renderLogin();


