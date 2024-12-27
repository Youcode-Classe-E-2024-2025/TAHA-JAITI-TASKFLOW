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
                    <option value="basic">Basic</option>
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
                    <option value="dsfsd">HEHE</option>
                    <option value="dsfsd">sdffs</option>
                    <option value="dsfsd">sfsdlsdf</option>
                </select>
            </div>
            <button class="w-full btn_primary">
                Create Task
            </button>
        </form>`
    
    const closeBtn = element.querySelector('#closeAdd') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        element.remove();
    });

    return element;
};