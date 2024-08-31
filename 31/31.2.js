import React from 'react';

export class ClassComponent extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            count: 0,
        }
    }

    handleClick(){
        this.setState(state => ({
            count: state.count + 1,
        }));
    }

    componentDidUpdate(prevProps, prevState){
        if (prevState.count !== this.state.count) {
            document.title = `Вы нажали на кнопку ${this.state.count} раз`;
        }
    }

    render(){
        console.log('render')
        return (
            <section>
                <h3>Добрый день {this.props.title}!</h3>
                <p>
                    Вы нажали на кнопку {this.state.count} раз.
                </p>
                <button onClick={() => this.handleClick()}>Нажать</button>
            </section>
        );
    }
}