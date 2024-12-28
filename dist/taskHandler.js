var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const createTask = (task) => {
    const limitDesc = task.description.length > 50
        ? task.description.slice(0, 50) + '...'
        : task.description;
    const typeColor = task.type === 'basic' ? 'gray' : task.type === 'bug' ? 'red' : 'green';
    const element = document.createElement('div');
    element.className = `bg-gray-700 w-full h-fit p-2 rounded-sm drop-shadow-lg`;
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
                        <p class="bg-${typeColor}-800 px-2 rounded-sm">${task.type.toUpperCase()}</p>
                    </div>`;
    return element;
};
export const getTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch('http://localhost/api/tasks', { method: 'GET' });
        if (response.ok) {
            const tasks = yield response.json();
            return tasks;
        }
    }
    catch (err) {
        console.error(err);
        alert('failed getting tasks');
    }
    return null;
});
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
