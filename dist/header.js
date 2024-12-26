const userId = sessionStorage.getItem('user_id') || null;
const checkUser = userId ? 'block' : 'none';
const checkLogged = !userId ? 'block' : 'hidden';
export const createHeader = () => {
    const headerElement = document.createElement('div');
    headerElement.className = 'w-full h-fit p-4 bg-slate-950';
    headerElement.id = "headerElement";
    headerElement.innerHTML = `<nav class="flex justify-between items-center w-full">
            <p class="text-2xl">TASKFLOW</p>
            <ul class="flex items-center gap-5">
                <li><button id="addTask" class="btn_primary" style="display: ${checkUser}">+</button></li>
                <li><a href="/logout" class="btn_primary" style="display: ${checkUser}">Log out</a></li>
                <li><a href="/login" class="btn_primary" style="display: ${checkLogged}">Log In</a></li>
                <li><a href="/register" class="btn_primary" style="display: ${checkLogged}">Sign Up</a></li>
            </ul>
        </nav>`;
    return headerElement;
};
