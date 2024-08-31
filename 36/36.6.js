const header = <Header title="Заголовок" />;

return (
    <div className="App">
        <LayoutPage 
            header={header} 
            footer={<footer>Текст как текст...</footer>} 
        />
    </div>
);