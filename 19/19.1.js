const initialState = {
    list: ['Современная фронтенд-разработка']
};
const action_1 = {type: 'ADD_PHRASE', payload: 'Вышла на новый уровень'};
const action_2 = {type: 'ADD_PHRASE', payload: 'И мы многое изучим'};
const action_3 = {type: 'ADD_PHRASE', payload: 'И познакомимся с нейросетями'};
//  Обратите внимание этот редьюсер из листинга 18.1
const reducer = (state, action) => {
    const { type, payload } = action;

    if (type === 'ADD_PHRASE') {
        return {
            list: [...state.list, payload]
        }
    }

    return state;
}

const newState = [action_1, action_2, action_3].reduce(reducer, initialState);

console.log(newState);