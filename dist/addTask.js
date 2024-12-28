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
    element.className = 'h-screen w-screen bg-black/20 fixed top-0 backdrop-blur-sm flex justify-center items-center';
    element.innerHTML = `<form id="addForm" class="bg-gray-800 rounded-md shadow-md p-6 space-y-4 w-1/3">
            <div class="flex justify-between">
                <p class="text-2xl">Create a new task</p>
                <button id="closeAdd">X</button>
            </div>
            <div>
                <label for="title" class="block text-sm font-medium text-gray-300">Title</label>
                <input type="text" id="title" name="title" required class="input" />
            </div>
            <div>
                <label for="description" class="block text-sm font-medium text-gray-300">Description</label>
                <textarea id="description" name="description" rows="4" required class="input"></textarea>
            </div>
            <div>
                <label for="type" class="block text-sm font-medium text-gray-300">Type</label>
                <select id="type" name="type" required class="input">
                    <option value="task">Basic</option>
                    <option value="feature">Feature</option>
                    <option value="bug">Bug</option>
                </select>
            </div>
            <div>
                <label for="status" class="block text-sm font-medium text-gray-300">Status</label>
                <select id="status" name="status" required class="input">
                    <option value="to-do">To-Do</option>
                    <option value="in-progress">In-Progress</option>
                    <option value="completed">Completed</option>
                </select>
            </div>
            <div>
                <label for="deadline" class="block text-sm font-medium text-gray-300">Deadline</label>
                <input type="date" id="deadline" name="deadline" required class="input" />
            </div>
            <div>
                <label for="assignUsers" class="block text-sm font-medium text-gray-300">Assign Employees</label>
                <select id="assignUsers" name="assignUsers" multiple class="input">
                </select>
            </div>
            <button id="submitAdd" class="w-full btn_primary">
                Create Task
            </button>
        </form>`;
    const form = element.querySelector("#addForm");
    const selectElement = element.querySelector('#assignUsers');
    fillSelect(selectElement);
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
