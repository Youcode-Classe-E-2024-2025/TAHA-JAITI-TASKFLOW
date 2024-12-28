import { displayTask } from "./displayTask.js"

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
    const checkRole = role === "supervisor" ? 'block' : 'none';

    const limitDesc = task.description.length > 50 
        ? task.description.slice(0, 50) + '...' 
        : task.description;

    const typeColor = task.type === 'basic' ? 'gray' : task.type === 'bug' ? 'red' : 'green';

    const element = document.createElement('div');
    element.className = `bg-gray-700 w-full h-fit p-2 rounded-sm drop-shadow-lg cursor-pointer`;
    element.id = `task${task.id}`;

    element.innerHTML = `<div class="flex justify-between items-center">
                        <h3>${task.title}</h3>
                        <div class="flex items-center justify-center gap-4">
                            <i class="fa-solid fa-trash text-red-500" style="display: ${checkRole}"></i>
                            <i class="fa-solid fa-pen-to-square text-blue-400"></i>
                        </div>
                    </div>
                    <p>${limitDesc}</p>
                    <p>${task.deadline}</p>
                    <div class="flex justify-between items-center">
                        <p>By: ${task.created_by_name}</p>
                        <p class="bg-${typeColor}-800 px-2 rounded-sm">${task.type.toUpperCase()}</p>
                    </div>`;
    
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


