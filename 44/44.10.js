import React, { Fragment, useId } from 'react';

const productList = [{title: 'Булка'}, {title: 'Хлеб'}, {title: 'Рогалик'}];

export const ProductList = () => {
    return (<Fragment>
        {
            productList.map(title => {
                const key = useId();

                return <div key={key}>{title}</div>;
            })
        }
    </Fragment>);
}