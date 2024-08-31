import React, { Fragment, useState} from 'react';

export const ControlledComponents = () => {
    const options = ['A', 'B', 'C'];
    const [, defaultSelectValue] = options;
    const [valueInput, setValueInput] = useState('');
    const [valueTextarea, setValueTextarea] = useState('');
    const [valueSelect, setValueSelect] = useState(defaultSelectValue);

    const handleChangeInput = (e) => setValueInput(e.target.value);
    const handleChangeTextarea = (e) => setValueTextarea(e.target.value);
    const handleChangeSelect = (e) => setValueSelect(e.target.value);

    return(
        <Fragment>
            <input type="text" value={valueInput} onChange={handleChangeInput} />
            <textarea value={valueTextarea} onChange={handleChangeTextarea}></textarea>
            <select onChange={handleChangeSelect} value={valueSelect}>
                {
                    options.map(title => <option key={title} value={title}>{title}</option>)
                }
            </select>
        </Fragment>
    );
}