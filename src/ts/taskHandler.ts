import { displayTask, deleteTask} from "./taskController.js"

interface task {
    id: number,
    title: string,
    description: string,
    status: 'to-do' | 'in-progress' | 'completed',
    type: 'basic' | 'feature' | 'bug',
    deadline: Date,
    created_at: Date,
    updated_at: string,
    created_by_name: string,
    assignees: string[]
}

export const createTask = (task: task) => {
    const role = sessionStorage.getItem('role') || null;
    const checkRole = role === "supervisor" ? '<i id="deleteTask" class="fa-solid fa-trash text-red-500 text-xl"></i>' : '';

    const limitDesc = task.description.length > 50 
        ? task.description.slice(0, 50) + '...' 
        : task.description;

    const typeColor = task.type === 'basic' ? 'gray' : task.type === 'bug' ? 'red' : 'green';

    const element = document.createElement('div');
    element.className = `bg-gray-700 w-full h-fit p-2 rounded-sm drop-shadow-lg cursor-pointer hover:bg-gray-800/80`;
    element.id = `task${task.id}`;

    element.innerHTML = `<div class="flex justify-between items-center">
                        <h3>${task.title}</h3>
                        <div class="flex items-center justify-center gap-4">
                            ${checkRole}
                            <i class="text-xl fa-solid fa-pen-to-square text-blue-400"></i>
                        </div>
                    </div>
                    <p>${limitDesc}</p>
                    <div class="flex justify-between items-center mt-4">
                        <p>By: ${task.created_by_name}</p>
                        <div class ="flex gap-2">
                            <p class="bg-orange-700 px-2 rounded-sm">${task.deadline}</p>
                            <p class="bg-${typeColor}-800 px-2 rounded-sm">${task.type.toUpperCase()}</p>
                        </div>
                    </div>`;
    
    const delBtn = element.querySelector('#deleteTask') as HTMLButtonElement;

    delBtn.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        deleteTask(task);
        
    });

    element.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        displayTask(task);
    })

    return element;
};


export const getTasks = async (): Promise<task[] | null> => {
    try {
        const response = await fetch ('http://localhost/api/tasks', {method: 'GET'})
        if (response.ok){
            const tasks: task[] = await response.json();
            return tasks;
        }
    } catch (err){
        console.error(err);
        alert('failed getting tasks');
    }
    return null;
};


