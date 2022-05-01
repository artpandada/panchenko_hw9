'use strict';

/* Дополнительное задание на реализацию функции mergeUnion(arr1, arr2, arr3),
которая принимает массивы и объединяет в один все уникальные значения*/

function mergeUnion(arr1, arr2, arr3) {
    const arrayForAll = arr1.concat(arr2, arr3);

    return arrayForAll.reduce(function (accum, elem, index, arr) {
        if (arr.indexOf(elem) === arr.lastIndexOf(elem)) {
            accum.push(elem);
        }
        return accum;
    }, [])

}


const a = [1, 3, 4, 5]
const b = ['asdd', 3, 'ddff', 5]
const c = ['asdd', 3, 'fff']


console.log(mergeUnion(a, b, c));

//Основное задание


const toDoList = {
    tasks: [{message: 'Сделать дз', status: true}, {message: 'Сдать дз', status: true}],

    addTask(task) {
        if (!this.checkTaskExists(task) && task.message !== "") {
            this.tasks.push(task);
            return true;
        }
        return false;
    },
    deleteTask(task) {
        if (this.checkTaskExists(task)) {
            this.tasks.splice(this.getTaskIndex(task), 1);
            return true;
        }
        return false;
    },
    editTask(task, newMessage) {
        if (this.checkTaskExists(task)) {
            this.tasks.splice(this.getTaskIndex(task), 1, newMessage);
            return true;
        }
        return false;
    },
    checkTaskExists(task) {
        return this.getTaskIndex(task) !== -1;
    },
    getTaskIndex(task) {
        return this.tasks.findIndex(elem => elem.message === task.message);
    },
    get summary() {
        return {
            total: this.tasks.length,
            completed: this.tasks.filter(elem => elem.status === true),
            queued: this.tasks.filter(elem => elem.status === false)
        };
    },
}

Object.defineProperties(toDoList, {
    addTask: {configurable:false},
    deleteTask: {configurable:false},
    editTask: {configurable:false},
    summary: {configurable:false}
})



const addTask = prompt('Добавте задачу', '');

if(toDoList.addTask({message: addTask, status: false})){
    alert("Задача добавлена!");
} else {
    alert("Задача уже существует");
}


const questionDelete = confirm(`На сегодня у вас ${toDoList.summary.total} задач, хотите что-то удалить ?`);

const question = `Выберете задачу из выполненных: \n${JSON.stringify(toDoList.summary.completed)} \nили не выполненных: \n${JSON.stringify(toDoList.summary.queued)} \nи введите ее название`;

if (questionDelete === true) {
    const taskForDelete = prompt(`${question}`, '');
    if (toDoList.deleteTask({message:taskForDelete})){
        alert("Задача удалена!");
    } else {
        alert('Задача не найдена');
    }

}
const questionEdit = confirm('Хотели бы вы отредактировать какую-то задачу?')
if (questionEdit === true) {
    const taskForEdit = prompt(`${question}`, '');
    if(toDoList.checkTaskExists({message:taskForEdit})){
        const newName = prompt('Введите исправленную версию заметки', '');
        const newStatus = confirm('Задача выполнена ?')
        toDoList.editTask({message:taskForEdit},{message:newName, status:newStatus})
    } else {
        alert('Задача не найдена');
    }
}
alert(`У вас осталось ${toDoList.summary.total} задач,\nиз выполненных: \n${JSON.stringify(toDoList.summary.completed)} \nиз не выполненных: \n${JSON.stringify(toDoList.summary.queued)} \n`)





