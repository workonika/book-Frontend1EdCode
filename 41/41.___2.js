import React, { Fragment, useState, useEffect } from 'react';
import { CategoriesMenu } from './CategoriesMenu';
import { PageShoppingCart } from './PageShoppingCart';
import { SpecialOffers } from './SpecialOffers';

export const ProductCard = () => {};

export const ProductListItem = ({ data }) => {
    const handleClick = (productId, amount) => {
        setOrderedProducts();
        onProductOrder({ productId, amount });
    }
};

export const ProductList = ({ onProductOrder }) => {
    
    const [currentProduct, setCurrentProduct] = useState(0);
    const [productList, setProductList] = useState([]);
   
    useEffect(() => {
        fetch('/product/list?count=10')
            .then(response => response.json())
            .then(data => setProductList(data));
    }, []);

    useEffect(() => {
        const timerId = setTimeout(() => setCurrentProduct(current => current + 1), 5000);
        return () => clearTimeout(timerId);
    }, [currentProduct]);
    
    return (<Fragment>
        {
            productList.map(({ id, data }) => 
                <ProductListItem key={id} data={data} />)
        }
    </Fragment>);
};

export const ProductCategory = () => (<Fragment>
    <PageShoppingCart />
    <CategoriesMenu />
    <SpecialOffers />
    <ProductList />
</Fragment>);