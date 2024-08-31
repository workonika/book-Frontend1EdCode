import React from 'react';

const ClockImitator = () => <div>13:15</div>;

const Header = ({ title }) => <h3>{title}</h3>;

const Paragraph = ({ text }) => <p>{text}</p>;

const ComponentWithChildren = ({ children }) => <div>{ children }</div>;

const Composition = () => (
    <ComponentWithChildren>
        <Header title="Недвигающиеся часы" />
        <ClockImitator />
        <Paragraph text="Нам не важно, что часы не идут, нам важно понять свойство children" />
    </ComponentWithChildren>
);