const form = document.querySelector('.Todoform');
const input = document.querySelector('.text-input');
const noteList = document.querySelector('.note-list');

function renderTask(taskObject) {
    const taskItem = document.createElement('li');
    const taskItemContent = document.createElement('label');
    const taskItemBtnEdit = document.createElement('button');
    const taskItemBtnComplete = document.createElement('button');
    const taskItemBtnRemove = document.createElement('button');
    const editInput = document.createElement('input');
    const taskItemBtnSave = document.createElement('button');
    const taskItemBtnCancel = document.createElement('button');

    editInput.type = 'text';

    taskItem.classList.add('note-list__item');
    taskItemBtnEdit.classList.add('edit');
    taskItemBtnComplete.classList.add('complete');
    taskItemBtnRemove.classList.add('remove');
    taskItemBtnSave.classList.add('save');
    taskItemBtnCancel.classList.add('cancel');



    taskItemBtnEdit.innerText = 'Edit';
    taskItemBtnComplete.innerText = 'Complete';
    taskItemBtnRemove.innerText = 'Remove';
    taskItemContent.innerText = taskObject.value;
    taskItemBtnSave.innerText = 'Save';
    taskItemBtnCancel.innerText = 'Cancel';

    taskItem.appendChild(editInput);
    taskItem.appendChild(taskItemContent);
    taskItem.appendChild(taskItemBtnComplete);
    taskItem.appendChild(taskItemBtnRemove);
    taskItem.appendChild(taskItemBtnEdit);
    taskItem.appendChild(taskItemBtnSave);
    taskItem.appendChild(taskItemBtnCancel);

    taskItem.setAttribute('data-id', taskObject.id);

    taskItem.querySelector('.save').hidden = true;
    taskItem.querySelector('.cancel').hidden = true;
    taskItem.querySelector('input').hidden = true;

    if (taskObject.completed) {
        taskItem.classList.add('note-list__item--completed');
        taskItemBtnEdit.disabled = true;
    }
    return taskItem;
}

let taskList = [];
const start = 16;
const end = 24;
form.addEventListener('submit', e => {
    e.preventDefault();

    if (input.value.trim()) {
        const task = {
            value: input.value,
            completed: false,
            id: String(new Date).slice(start, end)
        };

        taskList.unshift(task);
        noteList.prepend(renderTask(task));
    }

    input.value = '';
});

noteList.addEventListener('click', e => {
    const element = e.target;
    const targetClassName = element.className;
    let currentId;
    const taskId = element.closest('li');


    if (targetClassName === 'complete' || targetClassName === 'remove' || targetClassName === 'edit' || targetClassName === 'save'|| targetClassName === 'cancel') {
        currentId = element.closest('li').getAttribute('data-id');
    }

    if (targetClassName === 'complete') {
        taskList.find(task => task.id === currentId).completed = true;

        noteList.innerHTML = '';

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });

    } else if (targetClassName === 'remove') {
        noteList.innerHTML = '';

        taskList = taskList.filter(task => task.id !== currentId);

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
    } else if (targetClassName === 'edit') {

        taskId.querySelector('.remove').hidden = true;
        taskId.querySelector('.complete').hidden = true;
        taskId.querySelector('.edit').hidden = true;
        taskId.querySelector('.save').hidden = false;
        taskId.querySelector('.cancel').hidden = false;
        taskId.querySelector('input').hidden = false;
        taskId.querySelector('label').hidden = true;
        element.closest('li').firstChild.value = taskList.find(task => task.id === currentId).value;

        element.closest('li').classList.add('edit');

    }
    else if (targetClassName === 'save') {
        if (element.closest('li').classList.contains('edit')) {
            taskList.find(task => task.id === currentId).value = element.closest('li').firstChild.value;

            noteList.innerHTML = '';

            taskList.forEach(task => {
                noteList.append(renderTask(task));
            });
        }
    }
    else if (targetClassName === 'cancel') {
        taskId.querySelector('input').hidden = true;

        noteList.innerHTML = '';

        taskList.forEach(task => {
            noteList.append(renderTask(task));
        });
    }
});