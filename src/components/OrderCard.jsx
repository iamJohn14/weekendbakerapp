import React from 'react'
import { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';




export default function OrderCard(props) {
    const { ordersData } = props;
    const [order, setOrders] = useState([])


    useEffect(() => {

        const ordersArr = ordersData.map(order => {
            return (

                <>
                    <div className='d-none d-md-flex col-md-4 ps-5 pe-2 py-5  border-bottom'>
                        <h5 className="text-center">{order._id}</h5>
                    </div>
                    <div className='col-6 col-md-4 px-2 py-5  border-bottom'>
                        <ul className='list-unstyled'>
                            <h5 className='ps-3'> {order.Product.map(product => {
                                return (<li key={product.productId}>
                                    {`${(product.productName)} - ${(product.quantity)}`}
                                </li>)

                            })}
                            </h5>
                        </ul>
                    </div>
                    <div className='col-6 col-md-4 px-2 py-5  border-bottom'>
                        <h5 className="text-center">{order.totalAmount.toLocaleString('en', { useGrouping: true })}</h5>
                    </div>
                </>
            )
        })

        setOrders(ordersArr)
    }, [ordersData])



    return (

        <div className='container'>
            <div className='row shadow'>
                <div className='d-none d-md-flex col-md-4 ps-5 pe-2 py-5 border-bottom'>
                    <h3 className='gray text-center'>ID</h3>
                </div>
                <div className='col-6 col-md-4 px-2 py-5 border-bottom'>
                    <h3 className='gray text-center'>PRODUCT</h3>
                </div>
                <div className='col-6 col-md-4 px-2 py-5 border-bottom'>
                    <h3 className='gray text-center'>TOTAL</h3>
                </div>
            </div>
            <div className='row shadow'>
                {order}
            </div>
        </div>


    )
}
