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

    const element = document.createElement('div');
    element.className = 'fixed flex justify-center items-center top-0 inset-0 backdrop-blur-sm h-screen w-screen bg-black/20';
    element.innerHTML = `<div class="bg-gray-700 flex flex-col gap-4 p-4 h-fit w-1/3 rounded-sm drop-shadow-lg">
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
                                <p class="bg-yellow-800 px-2 rounded-sm">CREATED AT:  ${task.created_at}</p>
                                <p class="bg-blue-900 px-2 rounded-sm">BY: ${task.created_by_name}</p>
                            </div>
                        </div>`;
    
    const closeBtn = element.querySelector('#closeDisplay') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => {
        element.remove();
    });


    root.appendChild(element);
    
};


// <div class="fixed flex justify-center items-center top-0 inset-0 backdrop-blur-sm h-screen w-screen bg-black/20">
//         <div class="bg-gray-800 flex flex-col gap-4 p-4 h-fit w-1/2 rounded-sm drop-shadow-lg">
//             <div class="flex justify-between">
//                 <p>TITLE</p>
//                 <p>X</p>
//             </div>
//             <p class="h-fit rounded-sm w-full bg-gray-700 p-2">
//                 DESCRIPTION
//             </p>
//             <div class="h-fit rounded-sm w-full bg-gray-700 p-2">
//                 Aiggned users
//             </div>
//             <div class="flex justify-between">
//                 <p class="bg-gray-500 px-2 rounded-sm">BUG</p>
//                 <p class="bg-gray-500 px-2 rounded-sm">DEADLINE</p>
//                 <p class="bg-gray-500 px-2 rounded-sm">CREATEDAT</p>
//                 <p class="bg-gray-500 px-2 rounded-sm">CREATEDBY</p>
//             </div>
//         </div>
//     </div>