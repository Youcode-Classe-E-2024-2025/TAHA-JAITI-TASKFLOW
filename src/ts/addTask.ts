interface user{
    id: number,
    username: string,
    email: string,
    role: 'employee' | 'supervisor',
    created_at: Date,
    updated_at: Date
}

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
        </form>`
    
    const form = element.querySelector("#addForm") as HTMLFormElement;
    const selectElement = element.querySelector('#assignUsers') as HTMLSelectElement;

    fillSelect(selectElement);

    const closeBtn = element.querySelector('#closeAdd') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        element.remove();
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(form);

        handleAdd(data);
    });

    return element;
};

const handleAdd = async (data: FormData) => {
    console.log(data);

//     0: title → "Hic obcaecati duis m"
//     1: description → "Magnam perspiciatis"
//     2: type → "bug"
//     3: status → "to-do"
//     4: deadline → "1971-07-12"
//     5: assignUsers → "dsfsd"
//     6: assignUsers → "dsfsd"

    if (data){
        const title = data.get('title') as string;
        const description = data.get('description') as string;
        const type = data.get('type') as string;
        const status = data.get('status') as string;
        const deadline = data.get('deadline') as  string;
        const assignUsers = data.getAll('assignUsers') as string[];

        const detectType = type === 'task' ? 'task' : type === 'bug' ? 'bug' : 'feature';

        try{
            const result = await fetch(`http://localhost/api/create?type=${detectType}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, description, type, status, deadline, assignUsers})
            });

            const response = await result.json();

            if (result.ok){
                console.log('TASK ADDED');
                console.log(response);
                
            }

        } catch (err){
            console.error(err);
            alert('an error happened regestering');
        }

    }
    
};

const getUsers = async (): Promise<user[] | null> => {
    try {
        const response = await fetch('http://localhost/api/users', {method: 'GET'});
        if (response.ok){
            const users: user[] = await response.json();
            return users;
        }

    } catch (err){
        console.error(err);
        alert('error getting users');
    }
    return null;
};

const fillSelect = async (select: HTMLSelectElement) => {
    const users: user[] | null = await getUsers();

    if (select && users){
        select.innerHTML = '';

        const options = users.map((user: {id: number, username: string}) => {
            const option = document.createElement('option');
            option.value = String(user.id);
            option.textContent = user.username;
            return option
        });

        select.append(...options);
    }
};