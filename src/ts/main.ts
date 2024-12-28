import { createTask, getTasks } from "./taskHandler.js";

export const createMain = () => {
    const element = document.createElement('main');
    element.className = 'h-full w-full flex justify-between gap-10 p-4';
    element.innerHTML = `<!-- TODO -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>TO-DO</p>
                                <p class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="todoContainer" class="container flex flex-col gap-2 p-2">
                               
                            </div>

                        </div>

                        <!-- IN PROGRESS -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>IN-PROGRESS</p>
                                <p class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="doingContainer" class="container flex flex-col gap-2 p-2">


                            </div>

                        </div>

                        <!-- COMPLETED -->
                        <div class="h-fit pb-1 w-1/3 bg-white/50 flex flex-col">
                            <!-- HEADER -->
                            <div class="bg-slate-950 h-fit p-4 flex justify-between items-center">
                                <p>COMPLETED</p>
                                <p class="bg-purple-950 px-2 text-center rounded-sm">0</p>
                            </div>
                            <!-- container -->
                            <div id="doneContainer" class="container flex flex-col gap-2 p-2 ">

                            </div>

                        </div>`;

    fillContainer();

    return element;
};

const fillContainer = async () => {
    const tasks = await getTasks();

    const container = {
        todo: document.getElementById('todoContainer') as HTMLDivElement,
        doing: document.getElementById('doingContainer') as HTMLDivElement,
        done: document.getElementById('doneContainer') as HTMLDivElement,
    }

    if (tasks && container) {
        tasks.forEach(task => {

            const taskElement = createTask(task);

            if (task.status === 'to-do') {
                container.todo.appendChild(taskElement);
            } else if (task.status === 'in-progress') {
                container.doing.appendChild(taskElement);
            } else if (task.status === 'completed') {
                container.done.appendChild(taskElement);
            }

        });
    }

};

