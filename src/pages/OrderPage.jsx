import React from 'react'
import { useState, useEffect } from 'react';
import OrderCard from '../components/OrderCard';
import Banner from '../components/Banner';

export default function OrderPage() {
    const [order, setOrder] = useState([]);
    const [userId, setUserId] = useState([]);

    const fetchData = () => {
        {
            fetch('https://weekendbakermnl.herokuapp.com/users/details', {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }

            })
                .then(response => response.json())
                .then(data1 => {
                    setUserId(data1._id)

                    fetch(`https://weekendbakermnl.herokuapp.com/orders/${data1._id}/view`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                        },
                        parameters: {
                            userId: data1._id
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            setOrder(data)
                        })

                })


        }


    }

    useEffect(() => {
        fetchData()
    }, [])

    if (!order) return null



    return (
        <>
            <div className="banner3 p-0">
                <Banner title="Order History" />
            </div>
            <div>
                <OrderCard ordersData={order} />
            </div>
        </>
    )

}
