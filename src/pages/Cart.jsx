/* eslint-disable no-lone-blocks */

import { useEffect, useState } from "react";
import CartView from "../components/CartView";
import Banner from "../components/Banner";

export default function Cart() {


    const [order, setOrder] = useState([]);
    const [order1, setOrder1] = useState([]);
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

                    fetch(`https://weekendbakermnl.herokuapp.com/carts/${data1._id}/view`, {
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
                            setOrder(data[0].Product)
                            setOrder1(data[0].totalAmount)
                        })

                })


        }
    }



    useEffect(() => {
        fetchData()
    }, [])





    return (
        <>
            <div className="banner2 p-0">
                <Banner title="Cart" />
            </div>
            <div className="pt-5 m-0">
                <CartView ordersData={order} orders1Data={order1} userData={userId} />
            </div>
        </>

    )
}