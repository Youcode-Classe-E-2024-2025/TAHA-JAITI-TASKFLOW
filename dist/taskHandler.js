"use strict";
const createTask = (task) => {
    const element = document.createElement('div');
    element.id = `task${task.id}`;
    element.innerHTML = `<div class="flex justify-between items-center">
                        <h3>${task.title}</h3>
                        <div class="flex gap-2">
                            <p>DEL</p>
                            <p>EDIT</p>
                        </div>
                    </div>
                    <p>${task.description}</p>
                    <div class="flex justify-between items-center">
                        <p>By: ${task.created_by}</p>
                        <p class="bg-green-800 px-2 rounded-sm">${task.type}</p>
                    </div>`;
    return element;
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
