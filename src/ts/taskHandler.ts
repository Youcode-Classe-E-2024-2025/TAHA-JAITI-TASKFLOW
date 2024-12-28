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
    const limitDesc = task.description.length > 20 
        ? task.description.slice(0, 20) + '...' 
        : task.description;

    const color = task.type === 'basic' ? 'gray' : task.type === 'bug' ? 'orange' : 'green';

    const element = document.createElement('div');
    element.className = `bg-${color}-700 w-full h-fit p-2 rounded-sm drop-shadow-lg`;
    element.id = `task${task.id}`;
    element.innerHTML = `<div class="flex justify-between items-center">
                        <h3>${task.title}</h3>
                        <div class="flex gap-2">
                            <p>DEL</p>
                            <p>EDIT</p>
                        </div>
                    </div>
                    <p>${limitDesc}</p>
                    <p>${task.deadline}</p>
                    <div class="flex justify-between items-center">
                        <p>By: ${task.created_by_name}</p>
                        <p class="bg-green-800 px-2 rounded-sm">${task.type.toUpperCase()}</p>
                    </div>`;
    

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


// <div class="bg-gray-700 w-full h-fit p-2 rounded-sm drop-shadow-lg">
//                     <div class="flex justify-between items-center">
//                         <h3>TITLE</h3>
//                         <div class="flex gap-2">
//                             <p>DEL</p>
//                             <p>EDIT</p>
//                         </div>
//                     </div>
//                     <p>DESCIPRION</p>
//                     <div class="flex justify-between items-center">
//                         <p>CREATED BY</p>
//                         <p class="bg-green-800 px-2 rounded-sm">BUG</p>
//                     </div>
//                 </div>