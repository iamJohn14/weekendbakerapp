import React from 'react'
import { useState, useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import RemoveItem from './RemoveItem';




export default function CartView(props) {

    const navigate = useNavigate();
    const { ordersData, orders1Data, userData } = props;
    const [order, setOrders] = useState([])
    const [userId, setUserId] = useState([])


    useEffect(() => {

        const ordersArr = ordersData.map(order => {
            return (

                <div key={order._id} className="container py-5 ps-5 m-0 shadow" >
                    <div className="row d-flex justify-content-center">
                        <div className='col-12 col-md-3'>
                            <h5 className="m-0 py-3 text-center">
                                {order.productName}
                            </h5>
                        </div>
                        <div className='d-none d-md-flex col-md-3  justify-content-center'>
                            <h5 className="m-0 py-3 text-center">
                                {order.productPrice.toLocaleString('en', { useGrouping: true })}
                            </h5>
                        </div>
                        <div className='d-none d-md-flex col-md-2  justify-content-center'>
                            <h5 className="m-0 py-3 text-center">
                                {order.quantity.toLocaleString('en', { useGrouping: true })}
                            </h5>
                        </div>
                        <div className='col-12 col-md-2 d-flex justify-content-center'>
                            <h5 className="m-0 py-3 text-center">
                                {order.subTotal.toLocaleString('en', { useGrouping: true })}
                            </h5>
                        </div>
                        <div className='col-1 py-3 text-center'>
                            <RemoveItem product={order._id} user={userData} />
                        </div>
                    </div>
                </div>


            )
        })

        setOrders(ordersArr)
    }, [ordersData])

    const checkout = () => {


        fetch(`https://weekendbakermnl.herokuapp.com/orders/${userData}/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            parameters: {
                userId: userData
            },
        })
            .then(res => res.json())
            .then(data => {
                setUserId(userData)

                if (data) {

                    Swal.fire({
                        title: 'Successfully checked out!',
                        icon: 'success',
                        text: `You have successfully checked out your cart`
                    });
                    navigate('/orders')



                } else {
                    Swal.fire({
                        title: 'error!',
                        icon: 'error',
                        text: 'Something went wrong, please try again'
                    })
                }
            })
    }



    return (
        <div className='shadow m-0 p-0 container-fluid'>
            <div className='row m-5 p-0'>
                <div className='col-12 col-md-8 p-0 m-0'>
                    <div key={order._id} className="p-5 m-0 shadow" >
                        <div className="row d-flex justify-content-center">
                            <div className='col-12 col-md-3'>
                                <h5 className="m-0 gray py-3 text-center">
                                    PRODUCT
                                </h5>
                            </div>
                            <div className='col-12 col-md-3 d-none d-md-flex justify-content-center'>
                                <h5 className="m-0 gray py-3 text-center">
                                    PRICE
                                </h5>
                            </div>
                            <div className='d-none d-md-flex col-md-2 justify-content-center'>
                                <h5 className="m-0 gray py-3 text-center">
                                    QTY
                                </h5>
                            </div>
                            <div className='col-12 col-md-2 d-flex justify-content-center'>
                                <h5 className="m-0 gray py-3 text-center">
                                    TOTAL
                                </h5>
                            </div>
                            <div className='col-12 col-md-1 py-3'>

                            </div>
                        </div>
                    </div>

                    <div className='py-3'>
                        {order}
                    </div>

                </div>
                <div className='col-12 col-md-4 ps-2 m-0'>
                    <div className='row buttons p-4 m-0'>
                        <div className='row pb-5'>
                            <div className='col-12 py-3 m-0'>
                                <h5 className='text-center m-0 p-2 gray'>
                                    CART TOTAL    <span className='pricetag'>   {orders1Data.toLocaleString('en', { useGrouping: true })}</span>
                                </h5>
                            </div>
                        </div>

                        {order.length > 0 ?
                            <div className='row pt-5'>
                                <Button variant="primary" className="col-12 m-0 py-3" id="buttons" onClick={() => checkout(userId)}>
                                    CHECK OUT
                                </Button>
                            </div>
                            :
                            <div className='row'>
                                <Button variant="primary" className="col-12 m-0 py-3" id="buttons" disabled>
                                    <h5 className="m-0">
                                        CHECK OUT
                                    </h5>
                                </Button>
                            </div>
                        }


                    </div>
                </div>
            </div>
        </div>

    )
}
