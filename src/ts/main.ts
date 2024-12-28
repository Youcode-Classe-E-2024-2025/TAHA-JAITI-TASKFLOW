import { createTask, getTasks, getEmployeeTask } from "./taskHandler.js";

export const createMain = () => {
    const element = document.createElement('main');
    element.className = 'max-w-[100rem] w-full mx-auto px-24 sm:px-6 lg:px-8 py-6';
    element.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- TODO Column -->
            <div class="flex flex-col bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800">
                <div class="p-4 flex items-center justify-between border-b border-gray-800">
                    <div class="flex items-center gap-2">
                        <i class="fa-regular fa-circle-dot text-blue-400"></i>
                        <h2 class="font-semibold text-gray-200">TO-DO</h2>
                    </div>
                    <span id="todoCounter" class="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                        0
                    </span>
                </div>
                <div id="todoContainer" class="p-3 h-[calc(100vh-12rem)] overflow-y-auto space-y-3">
                </div>
            </div>

            <!-- IN PROGRESS Column -->
            <div class="flex flex-col bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800">
                <div class="p-4 flex items-center justify-between border-b border-gray-800">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-spinner text-amber-400"></i>
                        <h2 class="font-semibold text-gray-200">IN-PROGRESS</h2>
                    </div>
                    <span id="doingCounter" class="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                        0
                    </span>
                </div>
                <div id="doingContainer" class="p-3 h-[calc(100vh-12rem)] overflow-y-auto space-y-3">
                </div>
            </div>

            <!-- COMPLETED Column -->
            <div class="flex flex-col bg-gray-900/50 rounded-lg backdrop-blur-sm border border-gray-800">
                <div class="p-4 flex items-center justify-between border-b border-gray-800">
                    <div class="flex items-center gap-2">
                        <i class="fa-solid fa-check-circle text-emerald-400"></i>
                        <h2 class="font-semibold text-gray-200">COMPLETED</h2>
                    </div>
                    <span id="doneCounter" class="px-2.5 py-0.5 rounded-full text-sm font-medium bg-gray-800 text-gray-300">
                        0
                    </span>
                </div>
                <div id="doneContainer" class="p-3 h-[calc(100vh-12rem)] overflow-y-auto space-y-3">
                </div>
            </div>
        </div>
    `;
    
    fillContainer();
    return element;
};


export const fillContainer = async () => {
    const role = sessionStorage.getItem('role') || null;

    if (!role) {
        console.error("Role is not set in session storage.");
        return;
    }


    const tasks = role === 'supervisor' ? await getTasks() : role === 'employee' ? await getEmployeeTask() : [];

    const container = {
        todo: document.getElementById('todoContainer') as HTMLDivElement,
        doing: document.getElementById('doingContainer') as HTMLDivElement,
        done: document.getElementById('doneContainer') as HTMLDivElement,
    }

    const counters = {
        todo: document.getElementById('todoCounter') as HTMLDivElement,
        doing: document.getElementById('doingCounter') as HTMLDivElement,
        done: document.getElementById('doneCounter') as HTMLDivElement,
    }

    let todo = 0;
    let doing = 0;
    let done = 0;    

    if (tasks && tasks.length > 0 && container && counters) {
        container.todo.innerHTML = "";
        container.doing.innerHTML = "";
        container.done.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = createTask(task);

            if (task.status === 'to-do') {
                todo++;
                container.todo.appendChild(taskElement);
            } else if (task.status === 'in-progress') {
                doing++;
                container.doing.appendChild(taskElement);
            } else if (task.status === 'completed') {
                done++;
                container.done.appendChild(taskElement);
            }
        });

        counters.todo.textContent = String(todo);
        counters.doing.textContent = String(doing);
        counters.done.textContent = String(done);
    }

};

