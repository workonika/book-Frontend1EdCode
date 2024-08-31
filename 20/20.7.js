//  селекторы выбирающие все элементы
const [selectAllTodos, selectAllTasks, selectSelectDiapason] = [
    'todos', 'tasks', 'selectDiapason'
].map((branch) => (state) => state[branch]);
//  селекторы выбирающие элементы по id
const [selectTodoById, selectTasksById] = [
    'todos', 'tasks'
].map((branch) => (state, id) => state[branch].find((item) => item.id === id));