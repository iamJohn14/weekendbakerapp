import { useState, useEffect, useContext } from 'react';
import { Form, Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Login() {


    const navigate = useNavigate();


    const { user, setUser } = useContext(UserContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (email !== '' && password !== '') {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password])

    function authentication(e) {
        e.preventDefault();


        fetch('https://weekendbakermnl.herokuapp.com/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {


                if (data.accessToken !== undefined) {
                    localStorage.setItem('accessToken', data.accessToken);
                    setUser({
                        accessToken: data.accessToken
                    })

                    Swal.fire({
                        title: 'Yay!',
                        icon: 'success',
                        text: `You are now logged in!`
                    })

                    fetch('https://weekendbakermnl.herokuapp.com/users/details', {
                        headers: {
                            Authorization: `Bearer ${data.accessToken}`
                        }
                    })
                        .then(res => res.json())
                        .then(data => {


                            if (data.isAdmin === true) {
                                localStorage.setItem('isAdmin', data.isAdmin)

                                setUser({
                                    isAdmin: data.isAdmin
                                })

                                navigate('/products')

                            } else {
                                navigate('/')
                            }
                        })
                } else {
                    Swal.fire({
                        title: 'Ooopsss',
                        icon: 'error',
                        text: 'Something went wrong. Check your Credentials'
                    })

                }
                setEmail('')
                setPassword('')
            })
    }


    return (

        (user.accessToken !== null) ?

            <Navigate to="/products" />

            :
            <div className='container-fluid d-flex flex-column align-items-center m-0 p-0' id="login1" >
                <Form className="shadow p-5 mt-5 row" id="login" onSubmit={e => authentication(e)}>
                    <h1 className='text-center'>Login</h1>
                    <Form.Group className='pt-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="pt-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    {isActive ?
                        <div className='d-flex align justify-content-center'>
                            <Button variant="primary" type="submit" className="mt-3 text-center">
                                Submit
                            </Button>
                        </div>
                        :
                        <div className='d-flex align justify-content-center'>
                            <Button variant="primary" type="submit" className="mt-3 text-center" disabled>
                                Submit
                            </Button>
                        </div>
                    }
                </Form>
            </div>
    )
}