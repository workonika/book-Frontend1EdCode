import React, { Fragment } from 'react';

export const Header = ({ title }) => (
    <header>
        {title}
    </header>
);

export const Footer = ({ text }) => (
    <footer>
        {text}
    </footer>
);
/** компоненты Header, Footer */
export const LayoutPage = ({ HeaderComponent, FooterComponent }) => {

    return (
        <Fragment>
            <HeaderComponent title="Заголовок" />
            <main>
                Здесь располагается другой JSX
            </main>
            <FooterComponent text="Текст футера" />
        </Fragment>
    );
};

function App() {
  
    return (
      <div className="App">
        <LayoutPage HeaderComponent={Header} FooterComponent={Footer} />
      </div>
    );
};
  
export default App;
