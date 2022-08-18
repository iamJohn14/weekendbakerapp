import { Button } from 'react-bootstrap';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function RemoveItem(product, userData) {


    const [userId, setUserId] = useState('');


    const removeToggle = () => {

        fetch(`https://weekendbakermnl.herokuapp.com/carts/${userData}/remove`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            parameters: {
                userId: userData
            },
            body: JSON.stringify({
                _id: product
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data === true) {
                    setUserId(userData)
                    Swal.fire({
                        title: 'success',
                        icon: 'success',
                        text: 'Product successfully removed'
                    })
                } else {
                    Swal.fire({
                        title: 'error',
                        icon: 'error',
                        text: 'Something went wrong'
                    })
                }
            })
    }
    /*     ) */



    return (

        <>

            <Button variant="danger" size="sm" onClick={() => removeToggle(product)}>✖</Button>

        </>
    )
}