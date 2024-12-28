var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createTask, getTasks, getEmployeeTask } from "./taskHandler.js";
export const createMain = () => {
    const element = document.createElement('main');
    element.className = 'h-full w-full flex justify-between gap-10 p-4';
    element.innerHTML = `<!-- TODO -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>TO-DO</p>
                                <p id="todoCounter" class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="todoContainer" class="container h-[50rem] overflow-auto flex flex-col gap-2 p-2">
                               
                            </div>

                        </div>

                        <!-- IN PROGRESS -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>IN-PROGRESS</p>
                                <p id="doingCounter" class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="doingContainer" class="container h-[50rem] overflow-auto flex flex-col gap-2 p-2">


                            </div>

                        </div>

                        <!-- COMPLETED -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>COMPLETED</p>
                                <p id="doneCounter" class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="doneContainer" class="container h-[50rem] overflow-auto flex flex-col gap-2 p-2 ">

                            </div>

                        </div>`;
    fillContainer();
    return element;
};
export const fillContainer = () => __awaiter(void 0, void 0, void 0, function* () {
    const role = sessionStorage.getItem('role') || null;
    if (!role) {
        console.error("Role is not set in session storage.");
        return;
    }
    const tasks = role === 'supervisor' ? yield getTasks() : role === 'employee' ? yield getEmployeeTask() : [];
    const container = {
        todo: document.getElementById('todoContainer'),
        doing: document.getElementById('doingContainer'),
        done: document.getElementById('doneContainer'),
    };
    const counters = {
        todo: document.getElementById('todoCounter'),
        doing: document.getElementById('doingCounter'),
        done: document.getElementById('doneCounter'),
    };
    let todo = 0;
    let doing = 0;
    let done = 0;
    console.log('HEHE', tasks);
    if (tasks && tasks.length > 0 && container && counters) {
        container.todo.innerHTML = "";
        container.doing.innerHTML = "";
        container.done.innerHTML = "";
        tasks.forEach(task => {
            const taskElement = createTask(task);
            if (task.status === 'to-do') {
                todo++;
                container.todo.appendChild(taskElement);
            }
            else if (task.status === 'in-progress') {
                doing++;
                container.doing.appendChild(taskElement);
            }
            else if (task.status === 'completed') {
                done++;
                container.done.appendChild(taskElement);
            }
        });
        counters.todo.textContent = String(todo);
        counters.doing.textContent = String(doing);
        counters.done.textContent = String(done);
    }
});
