import { createAddForm } from "./addTask.js";

const root = document.getElementById('root');

export const createHeader = () => {
    const userId = sessionStorage.getItem('user_id') || null;
    const role = sessionStorage.getItem('role') || null;
    const checkRole = role === "supervisor" ? 'flex' : 'hidden';
    const checkUserLoggedIn = userId !== null ? 'flex' : 'hidden';
    const checkUserLoggedOut = userId === null ? 'flex' : 'hidden';

    const headerElement = document.createElement('div');
    headerElement.className = 'bg-gray-900 border-b border-gray-800 sticky top-0 z-40';
    headerElement.id = 'headerElement';
    headerElement.innerHTML = `
        <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16">
            <div class="flex items-center justify-between h-full">
                <!-- Logo -->
                <div class="flex items-center">
                    <h1 class="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                        TASKFLOW
                    </h1>
                </div>

                <!-- Navigation -->
                <div class="flex items-center gap-3">
                    <button id="addTask" class="${checkRole} btn_primary flex items-center ">
                        <i class="fa-solid fa-plus mr-2"></i>
                        Add Task
                    </button>

                    <!-- Auth Buttons -->
                    <div class="flex items-center gap-3">
                        <a href="/logout" class="${checkUserLoggedIn} btn_primary flex items-center bg-transparent">
                            <i class="fa-solid fa-right-from-bracket mr-2"></i>
                            Log out
                        </a>
                        
                        <div class="${checkUserLoggedOut} items-center gap-3">
                            <a href="/login" class="btn_primary flex items-center bg-transparent">
                                Log In
                            </a>
                            <a href="/register" class="btn_primary flex items-center">
                                Sign Up
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    `;

    const disBtn = headerElement.querySelector('#addTask') as HTMLButtonElement;
    disBtn.addEventListener('click', () => {
        if (root) {
            root.appendChild(createAddForm());
        }
    });
    return headerElement;
};
