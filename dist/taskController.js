var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fillContainer } from "./main.js";
import { fillSelect } from "./addTask.js";
const root = document.getElementById('root');
if (!root) {
    throw new Error('root not found');
}
export const displayTask = (task) => {
    const assignees = task.assignees.split(',').map(a => a.trim());
    const typeColor = {
        basic: 'slate',
        bug: 'rose',
        feature: 'emerald'
    }[task.type];
    const date = new Date(task.created_at);
    const element = document.createElement('div');
    element.className = `fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50 `;
    element.innerHTML = `<div class="bg-gray-800 w-full max-w-2xl rounded-lg shadow-2xl p-6 space-y-6 ">
                            <!-- Header -->
                            <div class="flex justify-between items-start">
                                <h2 class="text-2xl font-bold text-gray-100">${task.title}</h2>
                                <button id="closeDisplay" class="
                                    p-2 
                                    hover:bg-gray-700 
                                    rounded-full 
                                    transition-colors 
                                    text-gray-400 
                                    hover:text-gray-200
                                ">
                                    <i class="fa-solid fa-times text-xl"></i>
                                </button>
                            </div>

                            <!-- Status and Type -->
                            <div class="flex flex-wrap gap-2">
                                <span class="bg-${typeColor}-900/50 text-${typeColor}-400 px-3 py-1 rounded-full text-sm font-medium">
                                    ${task.type.toUpperCase()}
                                </span>
                                <span class="bg-orange-900/50 text-orange-400 px-3 py-1 rounded-full text-sm font-medium">
                                    <i class="fa-regular fa-clock mr-1"></i>
                                    ${task.deadline}
                                </span>
                            </div>

                            <!-- Description Section -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Description</h3>
                                <div class="bg-gray-900/50 rounded-lg p-4 text-gray-300">
                                    ${task.description}
                                </div>
                            </div>

                            <!-- Assignees Section -->
                            <div class="space-y-2">
                                <h3 class="text-sm font-medium text-gray-400 uppercase tracking-wider">Assignees</h3>
                                <div class="bg-gray-900/50 rounded-lg p-4">
                                    <div class="flex flex-wrap gap-2">
                                        ${assignees.map(assignee => `
                                            <div class="flex items-center gap-2 bg-gray-800 px-3 py-1 rounded-full">
                                                <div class="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center">
                                                    <span class="text-xs font-medium">${assignee.charAt(0)}</span>
                                                </div>
                                                <span class="text-sm text-gray-300">${assignee}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                            </div>

                            <!-- Footer -->
                            <div class="border-t border-gray-700 pt-4 flex flex-wrap gap-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                                        <span class="text-sm font-medium">${task.created_by_name.charAt(0)}</span>
                                    </div>
                                    <div class="text-sm">
                                        <p class="text-gray-400">Created by</p>
                                        <p class="text-gray-200 font-medium">${task.created_by_name}</p>
                                    </div>
                                </div>

                                <div class="text-sm">
                                    <p class="text-gray-400">Created on</p>
                                    <p class="text-gray-200 font-medium">${date.toISOString().split('T')[0]}</p>
                                </div>
                            </div>
                        </div>
    `;
    const closeBtn = element.querySelector('#closeDisplay');
    closeBtn.addEventListener('click', () => {
        element.remove();
    });
    element.addEventListener('click', (e) => {
        if (e.target === element) {
            closeBtn.click();
        }
    });
    root.appendChild(element);
};
export const editDisplay = (task, role) => {
    const element = document.createElement('section');
    element.id = 'editContainer';
    element.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4';
    element.innerHTML = `<div class="bg-gray-800/95 rounded-xl shadow-2xl w-full max-w-xl border border-gray-700 transform transition-all animate-fadeIn">
                            <form id="editForm" class="divide-y divide-gray-700">
                                <!-- Header -->
                                <div class="flex items-center justify-between p-6">
                                    <div>
                                        <h2 class="text-xl font-semibold text-gray-100">Edit Task</h2>
                                        <p class="text-sm text-gray-400 mt-1">Modify task details below</p>
                                    </div>
                                    <button id="closeEdit" class="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-200">
                                        <i class="fa-solid fa-times text-xl"></i>
                                    </button>
                                </div>

                                <!-- Form Body -->
                                <div class="p-6 space-y-6">
                                    <!-- Title -->
                                    <div class="space-y-1">
                                        <label for="editTitle" class="block text-sm font-medium text-gray-300">
                                            <i class="fa-solid fa-heading mr-2 text-purple-400"></i>Title
                                        </label>
                                        <input type="text" value="${task.title}" id="editTitle" name="title" required class="input" placeholder="Enter task title"/>
                                    </div>

                                    <!-- Description -->
                                    <div class="space-y-1">
                                        <label for="editDescription" class="block text-sm font-medium text-gray-300">
                                            <i class="fa-solid fa-align-left mr-2 text-purple-400"></i>Description
                                        </label>
                                        <textarea id="editDescription"  name="description" rows="4" required class="input" placeholder="Describe the task in detail">${task.description.trim()}</textarea>
                                    </div>

                                    <!-- Type and Status Grid -->
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="space-y-1">
                                            <label for="editType" class="block text-sm font-medium text-gray-300">
                                                <i class="fa-solid fa-tag mr-2 text-purple-400"></i>Type
                                            </label>
                                            <select id="editType" name="type" required class="input">
                                                <option value="task" ${task.type === 'basic' ? 'selected' : ''}>Basic</option>
                                                <option value="feature" ${task.type === 'feature' ? 'selected' : ''}>Feature</option>
                                                <option value="bug" ${task.type === 'bug' ? 'selected' : ''}>Bug</option>
                                            </select>
                                        </div>

                                        <div class="space-y-1">
                                            <label for="editStatus" class="block text-sm font-medium text-gray-300">
                                                <i class="fa-solid fa-list-check mr-2 text-purple-400"></i>Status
                                            </label>
                                            <select id="editStatus" name="status" required class="input">
                                                <option value="to-do" ${task.status === 'to-do' ? 'selected' : ''}>To-Do</option>
                                                <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In-Progress</option>
                                                <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                                            </select>
                                        </div>
                                    </div>

                                    <!-- Deadline -->
                                    <div class="space-y-1">
                                        <label for="editDeadline" class="block text-sm font-medium text-gray-300">
                                            <i class="fa-regular fa-calendar mr-2 text-purple-400"></i>Deadline
                                        </label>
                                        <input type="date" id="editDeadline" name="deadline" value="${task.deadline}" required class="input" />
                                    </div>

                                    <!-- Assignees -->
                                    <div class="space-y-1">
                                        <label for="editAssignUsers" class="block text-sm font-medium text-gray-300">
                                            <i class="fa-solid fa-users mr-2 text-purple-400"></i>Assign Employees
                                        </label>
                                        <select id="editAssignUsers" name="assignUsers" multiple class="input min-h-[100px]">
                                            <!-- Add options dynamically -->
                                        </select>
                                        <p class="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple employees</p>
                                    </div>
                                </div>

                                <!-- Footer -->
                                <div class="p-6">
                                    <button type="submit" class="w-full btn_primary flex items-center justify-center gap-2">
                                        <i class="fa-solid fa-save"></i>
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>`;
    const select = element.querySelector('#editAssignUsers');
    fillSelect(select);
    const closeBtn = element.querySelector('#closeEdit');
    if (closeBtn) {
        closeBtn.addEventListener('click', (e) => {
            element.remove();
        });
    }
    element.addEventListener('click', (e) => {
        if (e.target === element) {
            closeBtn.click();
        }
    });
    const editForm = element.querySelector('#editForm');
    editForm.addEventListener('submit', (e) => {
        const data = new FormData(editForm);
    });
    root.appendChild(element);
};
export const deleteTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fetch(`http://localhost/api/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({}, task))
        });
        const response = yield result.json();
        if (result.ok) {
            alert(response.message);
            fillContainer();
            return true;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
export const updateTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield fetch(`http://localhost/api/tasks`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Object.assign({}, task))
        });
        const response = yield result.json();
        if (result.ok) {
            alert(response.message);
            fillContainer();
            return true;
        }
    }
    catch (err) {
        console.error(err);
        return null;
    }
});
