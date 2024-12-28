import { fillContainer } from "./main.js";

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

const root = document.getElementById('root');

if (!root){
    throw new Error('root not found');
}

export const displayTask = (task: task) => {
    const typeColor = task.type === 'basic' ? 'gray' : task.type === 'bug' ? 'red' : 'green';
    const date = new Date(task.created_at);

    const element = document.createElement('div');
    element.className = 'fixed flex justify-center items-center top-0 inset-0 backdrop-blur-sm h-screen w-screen bg-black/20';
    element.innerHTML = `<div class="bg-gray-700 flex flex-col gap-4 p-4 h-fit w-1/2 rounded-sm drop-shadow-lg">
                            <div class="flex justify-between">
                                <p class="text-2xl">${task.title}</p>
                                <button id="closeDisplay" class="text-2xl">X</button>
                            </div>
                            <p>DESCRIPTION</p>
                            <p class="h-fit rounded-sm w-full bg-gray-800 p-2">
                                ${task.description}
                            </p>
                            <p>ASSIGNEES</p>
                            <div class="h-fit rounded-sm w-full bg-gray-800 p-2">
                                ${task.assignees}
                            </div>
                            <div class="flex justify-between">
                                <p class="bg-${typeColor}-800 px-2 rounded-sm">${task.type.toUpperCase()}</p>
                                <p class="bg-orange-800 px-2 rounded-sm">DEADLINE:  ${task.deadline}</p>
                                <p class="bg-yellow-800 px-2 rounded-sm">CREATED AT:  ${date.toISOString().split('T')[0]}</p>
                                <p class="bg-blue-900 px-2 rounded-sm">BY: ${task.created_by_name}</p>
                            </div>
                        </div>`;
    
    const closeBtn = element.querySelector('#closeDisplay') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        element.remove();
    });


    root.appendChild(element);
};

export const deleteTask = async (task: task) => {
    try {
        const result = await fetch(`http://localhost/api/tasks`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...task})
        });

        const response = await result.json();

        if (result.ok){
            alert(response.message);
            fillContainer();
            return true;
        }

    } catch (err){
        console.error(err);
        return null;
    }
}