var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { displayTask, deleteTask } from "./taskController.js";
export const createTask = (task) => {
    const role = sessionStorage.getItem('role') || null;
    const checkRole = role === "supervisor" ?
        '<button id="deleteTask" class="group p-2 hover:bg-red-500/10 rounded-full transition-colors">' +
            '<i class="fa-solid fa-trash text-red-400 group-hover:text-red-500 transition-colors"></i>' +
            '</button>' : '';
    const assignees = task.assignees.split(',').map(a => a.trim());
    const limitDesc = task.description.length > 50
        ? task.description.slice(0, 50) + '...'
        : task.description;
    const typeColor = {
        basic: 'slate',
        bug: 'rose',
        feature: 'emerald'
    }[task.type];
    const statusColors = {
        'to-do': 'bg-slate-600',
        'in-progress': 'bg-amber-600',
        'completed': 'bg-emerald-600'
    }[task.status];
    const element = document.createElement('div');
    element.className = `
        bg-gray-800 hover:bg-gray-900 
        border border-gray-700 
        rounded-lg shadow-lg 
        p-4 transition-all 
        hover:shadow-xl 
        cursor-pointer 
        transform hover:-translate-y-0.5
    `;
    element.id = `task${task.id}`;
    element.innerHTML = `
        <div class="space-y-3">
            <!-- Header -->
            <div class="flex justify-between items-start">
                <h3 class="text-lg font-semibold text-gray-100">${task.title}</h3>
                <div class="flex items-center gap-1">
                    ${checkRole}
                    <button class="p-2 hover:bg-blue-500/10 rounded-full transition-colors">
                        <i class="fa-solid fa-pen-to-square text-blue-400 hover:text-blue-500 transition-colors"></i>
                    </button>
                </div>
            </div>

            <!-- Description -->
            <p class="text-gray-400 text-sm">${limitDesc}</p>

            <!-- Meta Information -->
            <div class="pt-2 border-t border-gray-700">
                <div class="flex flex-wrap items-center gap-2 text-xs">
                    <!-- Status Badge -->
                    <span class="${statusColors} px-2 py-1 rounded-full font-medium">
                        ${task.status.toUpperCase()}
                    </span>

                    <!-- Type Badge -->
                    <span class="bg-${typeColor}-900/50 text-${typeColor}-400 px-2 py-1 rounded-full font-medium">
                        ${task.type.toUpperCase()}
                    </span>

                    <!-- Deadline Badge -->
                    <span class="bg-orange-900/50 text-orange-400 px-2 py-1 rounded-full font-medium flex items-center gap-1">
                        <i class="fa-regular fa-clock text-xs"></i>
                        ${task.deadline}
                    </span>
                </div>
            </div>

            <!-- Footer -->
            <div class="flex items-center justify-between pt-2">
                <div class="flex items-center gap-2">
                    <div class="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                        <span class="text-xs font-medium">${task.created_by_name.charAt(0)}</span>
                    </div>
                    <span class="text-gray-400 text-sm">${task.created_by_name}</span>
                </div>
                
                <!-- Assignees -->
                <div class="flex -space-x-2">
                    ${assignees.slice(0, 3).map(assignee => `
                        <div class="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                            <span class="text-xs font-medium">${assignee.charAt(0)}</span>
                        </div>
                    `).join('')}
                    ${assignees.length > 3 ? `
                        <div class="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                            <span class="text-xs font-medium">+${assignees.length - 3}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        </div>
    `;
    const delBtn = element.querySelector('#deleteTask');
    if (delBtn) {
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTask(task);
        });
    }
    element.addEventListener('click', (e) => {
        e.stopPropagation();
        displayTask(task);
    });
    return element;
};
export const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost/api/tasks', { method: 'GET' });
        if (response.ok) {
            const tasks = yield response.json();
            return tasks;
        }
    }
    catch (err) {
        console.error(err);
        alert('failed getting tasks');
    }
    return null;
});
export const getEmployeeTask = () => __awaiter(void 0, void 0, void 0, function* () {
    const employeeId = sessionStorage.getItem('user_id');
    try {
        const response = yield fetch('http://localhost/api/mytasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: employeeId }),
        });
        if (response.ok) {
            const data = yield response.json();
            const tasks = data.data;
            return tasks;
        }
    }
    catch (err) {
        console.error(err);
        alert('failed getting tasks');
    }
    return null;
});
