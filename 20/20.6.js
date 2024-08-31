const state = {
    todos: [{
            id: 'e4d41573',
            title: 'Сделать упражнение из книги "Современная фронтенд-разработка"',
            done: true,
        }, {
            id: '9fbb87aa',
            title: 'Изучить раздел о графах',
            done: true,
        }],
    tasks: {
        immediate: [{
            id: 'a849466e',
            title: 'Сделать вид, что работаю',
            done: false,
        }],
        priority: [{
            id: 'd78042ec',
            title: 'Продумать состав приложения',
            done: false,
        }],
    },
    selectDiapason: {
        from: { day: 17, month: 6, year: 2024, },
        to: { day: 25, month: 6, year: 2024, }
    }
};

const selectAllTodos = (state) => state.todos;
const selectAllTasks = (state) => state.tasks;
const selectTodoById = (state, id) => state.todos.find((todo) => todo.id === id);
const selectTasksById = (state, id) => state.tasks.find((task) => task.id === id);
const selectSelectDiapason = (state) => state.selectDiapason;
