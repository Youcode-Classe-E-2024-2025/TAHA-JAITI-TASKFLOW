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
export const createAddForm = () => {
    const element = document.createElement('section');
    element.id = "addContainer";
    element.className = 'fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4';
    element.innerHTML = `
        <div class="bg-gray-800/95 rounded-xl shadow-2xl w-full max-w-xl border border-gray-700 transform transition-">
            <form id="addForm" class="divide-y divide-gray-700">
                <!-- Header -->
                <div class="flex items-center justify-between p-6">
                    <div>
                        <h2 class="text-xl font-semibold text-gray-100">Create a new task</h2>
                        <p class="text-sm text-gray-400 mt-1">Fill in the details below</p>
                    </div>
                    <button id="closeAdd" class="p-2 hover:bg-gray-700 rounded-full transition-colors text-gray-400 hover:text-gray-200">
                        <i class="fa-solid fa-times text-xl"></i>
                    </button>
                </div>

                <!-- Form Body -->
                <div class="p-6 space-y-6">
                    <!-- Title -->
                    <div class="space-y-1">
                        <label for="title" class="block text-sm font-medium text-gray-300">
                            <i class="fa-solid fa-heading mr-2 text-purple-400"></i>Title
                        </label>
                        <input type="text" id="title" name="title" required 
                            class="input" 
                            placeholder="Enter task title"/>
                    </div>

                    <!-- Description -->
                    <div class="space-y-1">
                        <label for="description" class="block text-sm font-medium text-gray-300">
                            <i class="fa-solid fa-align-left mr-2 text-purple-400"></i>Description
                        </label>
                        <textarea id="description" name="description" rows="4" required 
                            class="input" 
                            placeholder="Describe the task in detail"></textarea>
                    </div>

                    <!-- Type and Status Grid -->
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <label for="type" class="block text-sm font-medium text-gray-300">
                                <i class="fa-solid fa-tag mr-2 text-purple-400"></i>Type
                            </label>
                            <select id="type" name="type" required class="input">
                                <option value="task">Basic</option>
                                <option value="feature">Feature</option>
                                <option value="bug">Bug</option>
                            </select>
                        </div>

                        <div class="space-y-1">
                            <label for="status" class="block text-sm font-medium text-gray-300">
                                <i class="fa-solid fa-list-check mr-2 text-purple-400"></i>Status
                            </label>
                            <select id="status" name="status" required class="input">
                                <option value="to-do">To-Do</option>
                                <option value="in-progress">In-Progress</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>
                    </div>

                    <!-- Deadline -->
                    <div class="space-y-1">
                        <label for="deadline" class="block text-sm font-medium text-gray-300">
                            <i class="fa-regular fa-calendar mr-2 text-purple-400"></i>Deadline
                        </label>
                        <input type="date" id="deadline" name="deadline" required class="input" />
                    </div>

                    <!-- Assignees -->
                    <div class="space-y-1">
                        <label for="assignUsers" class="block text-sm font-medium text-gray-300">
                            <i class="fa-solid fa-users mr-2 text-purple-400"></i>Assign Employees
                        </label>
                        <select id="assignUsers" name="assignUsers" multiple class="input min-h-[100px]">
                        </select>
                        <p class="text-xs text-gray-400 mt-1">Hold Ctrl/Cmd to select multiple employees</p>
                    </div>
                </div>

                <!-- Footer -->
                <div class="p-6">
                    <button id="submitAdd" class="w-full btn_primary flex items-center justify-center gap-2">
                        <i class="fa-solid fa-plus"></i>
                        Create Task
                    </button>
                </div>
            </form>
        </div>
    `;
    const form = element.querySelector("#addForm");
    const selectElement = element.querySelector('#assignUsers');
    fillSelect(selectElement);
    element.addEventListener('click', (e) => {
        if (e.target === element) {
            element.remove();
        }
    });
    const closeBtn = element.querySelector('#closeAdd');
    closeBtn.addEventListener('click', () => {
        element.remove();
    });
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);
        handleAdd(data, element);
    });
    return element;
};
const handleAdd = (data, container) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(data);
    //     0: title → "Hic obcaecati duis m"
    //     1: description → "Magnam perspiciatis"
    //     2: type → "bug"
    //     3: status → "to-do"
    //     4: deadline → "1971-07-12"
    //     5: assignUsers → "dsfsd"
    //     6: assignUsers → "dsfsd"
    if (data) {
        const title = data.get('title');
        const description = data.get('description');
        const type = data.get('type');
        const status = data.get('status');
        const deadline = data.get('deadline');
        const assignUsers = data.getAll('assignUsers');
        const detectType = type === 'task' ? 'task' : type === 'bug' ? 'bug' : 'feature';
        try {
            const result = yield fetch(`http://localhost/api/create?type=${detectType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, description, type, status, deadline, assignUsers })
            });
            const response = yield result.json();
            if (result.ok) {
                container.remove();
                fillContainer();
            }
        }
        catch (err) {
            console.error(err);
            alert('an error happened regestering');
        }
    }
});
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost/api/users', { method: 'GET' });
        if (response.ok) {
            const users = yield response.json();
            return users;
        }
    }
    catch (err) {
        console.error(err);
        alert('error getting users');
    }
    return null;
});
const fillSelect = (select) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield getUsers();
    if (select && users) {
        select.innerHTML = '';
        const options = users.map((user) => {
            const option = document.createElement('option');
            option.value = String(user.id);
            option.textContent = user.username;
            return option;
        });
        select.append(...options);
    }
});
