import React, { Fragment } from 'react';

export const LayoutPage = ({ header, footer }) => {
    return (
        <Fragment>
            {header}
            <main>
                Здесь располагается другой JSX
            </main>
            {footer}
        </Fragment>
    );
}

export const Header = ({ title }) => (
    <header>
        {title}
    </header>
);

export const Footer = ({ text }) => (
    <footer>
        {text}
    </footer>
)

function App() {
  
    return (
      <div className="App">
        <LayoutPage header={<Header title="Заголовок" />} footer={<Footer text="Текст как текст..." />} />
      </div>
    );
  }
  
export default App;
