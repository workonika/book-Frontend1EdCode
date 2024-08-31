/* весь предыдущий код как в листинге 35.3 */
    .then(person => setPerson(person));

    return () => { controller.abort() };
}, []);