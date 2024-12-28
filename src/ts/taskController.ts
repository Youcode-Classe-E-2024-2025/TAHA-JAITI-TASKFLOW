import { fillContainer } from "./main.js";
import { getTasks } from "./taskHandler.js";

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
    assignees: string
}

const root = document.getElementById('root');

if (!root){
    throw new Error('root not found');
}

export const displayTask = (task: task) => {
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

    

    const closeBtn = element.querySelector('#closeDisplay') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        element.remove();
    });

    element.addEventListener('click', (e: Event) => {
        if (e.target === element) {
            closeBtn.click();
        }
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