import ProductCard from "./ProductCard";
import { useState, useEffect } from 'react';


export default function UserView({ productsData }) {

    const [products, setProducts] = useState([])
    useEffect(() => {

        const productsArr = productsData.map(product => {
            if (product.isActive === true) {
                return (
                    <ProductCard key={product._id} productProp={product} />
                )
            } else {
                return null
            }
        })

        setProducts(productsArr)

    }, [productsData])



    return (

        <>
            {products}
        </>
    )
}