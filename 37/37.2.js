import React, { Fragment } from 'react';

export const TodoItem = ({ title }) => {
    
    const [checked, setChecked] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleClick = () => setChecked(checked => !checked);

    const handleMouseMove = (e) => {
        console.log(e);
    }

    return (
        <li onClick={handleClick} onMouseMove={handleMouseMove}>
            <input type="checkbox" checked={checked} />
            { title }
        </li>
    );
}

export const TodoList = ({ todoList }) => {
    return (
        <Fragment>
            {
                todoList.map(({ id, title }) => <TodoItem key={id} title={title} />)
            }
        </Fragment>
    );
}

function App() {

    const todoList = [
        { id: 't45Iza', title: 'Сбрить бороду', },
        { id: 'z9saq1', title: 'Отварить курицу', },
        { id: 'u3en27', title: 'Сделать упражнения', }
    ];
    return (
      <div className="App">
        <TodoList todoList={todoList} />
      </div>
    );
  }
  
  export default App;