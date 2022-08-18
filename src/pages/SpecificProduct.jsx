import { useState, useContext, useEffect } from 'react';
import { Table, Card, Button, Form } from 'react-bootstrap';
import UserContext from '../UserContext';
import Swal from 'sweetalert2';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Banner from '../components/Banner';
//useParams() contains any values we are trying to pass in the URL stored
//useParams is how we receive the courseId passed via the URL

export default function SpecificProduct() {

    const navigate = useNavigate();

    const { productId } = useParams();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [userId, setUserId] = useState('');


    function add() {
        setQuantity(quantity + 1)
    }

    function subtract() {
        if (quantity <= 0) return
        setQuantity(quantity - 1)
    }



    useEffect(() => {

        fetch(`https://weekendbakermnl.herokuapp.com/products/${productId}/detail`)
            .then(res => res.json())
            .then(data => {
                setName(data.name)
                setDescription(data.description)
                setPrice(data.price)
            })

    }, [])

    const { user } = useContext(UserContext);


    //add to cart function
    const addToCart = (userId) => {

        fetch('https://weekendbakermnl.herokuapp.com/users/details', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserId(data._id)



                fetch(`https://weekendbakermnl.herokuapp.com/carts/${data._id}/add`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    parameters: {
                        userId: userId
                    },
                    body: JSON.stringify({
                        productId: productId,
                        quantity: quantity
                    })
                })
                    .then(res => res.json())
                    .then(data => {

                        if (data) {
                            if (quantity == 0) {
                                Swal.fire({
                                    title: 'error!',
                                    icon: 'error',
                                    text: 'Something went wrong, please try again'
                                })

                            } else {
                                if (quantity == 1) {
                                    Swal.fire({
                                        title: 'Added to cart successfully!',
                                        icon: 'success',
                                        text: `You have successfully added ${quantity} order of ${name} to cart`
                                    });
                                    navigate('/products');

                                } else {
                                    Swal.fire({
                                        title: 'Added to cart successfully!',
                                        icon: 'success',
                                        text: `You have successfully added ${quantity} orders of ${name} to cart`
                                    });
                                    navigate('/products');
                                }
                            }

                        } else {
                            Swal.fire({
                                title: 'error!',
                                icon: 'error',
                                text: 'Something went wrong, please try again'
                            })
                        }
                    })
            })
    }
    return (
        <>
            <div className="banner1 p-0 m-0">
                <Banner title="Our Products" />
            </div>

            {/* <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                    <div class="col-md-4">
                        <img src="" class="img-fluid rounded-start" alt="..." />
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">Card title</h5>
                            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                </div>
            </div> */}


            <div className='d-flex justify-content-center align-items-center mt-3 row'>



                <Card className='shadow specificCard col-10 col-md-7 px-0 my-5'>
                    <Card.Header>
                        <h2 className='text-center py-3'>{name}</h2>
                    </Card.Header>

                    <Card.Body className='text-center'>
                        <h3>{description}</h3>
                        <h3>Price: Php {price} </h3>

                        <div className='d-flex justify-content-center'>

                            <h3 className='pe-3'>Quantity</h3>

                            <div className='d-flex flex-row align-items-center justify-content-center'>
                                <Button className="col-4" onClick={() => subtract(quantity)}>-</Button>
                                <div className='col-4 quantity2'>
                                    <div>{quantity} </div>
                                </div>
                                <Button className="col-4" onClick={() => add(quantity)}>+</Button>
                            </div>


                        </div>
                    </Card.Body>
                    <Card.Footer>
                        {user.accessToken !== null ?
                            <div className='d-flex align-items-center justify-content-center'>
                                <Button variant="primary" onClick={() => addToCart(productId)}>Add to cart</Button>
                            </div>

                            :
                            <div className='d-flex align-items-center justify-content-center'>
                                <Button variant="warning" as={Link} to="/login">Login to add to cart</Button>
                            </div>
                        }


                    </Card.Footer>
                </Card>
            </div >
        </>
    )
}