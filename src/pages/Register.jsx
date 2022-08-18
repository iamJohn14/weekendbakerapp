//Register.js


import { useState, useEffect, useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import UserContext from '../UserContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Register() {

    const { user } = useContext(UserContext);
    const navigate = useNavigate();


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [verifyPassword, setVerifyPassword] = useState('');


    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if ((email !== '' && password !== '' && verifyPassword !== '') && (password === verifyPassword)) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }
    }, [email, password, verifyPassword])


    function registerUser(e) {
        e.preventDefault();

        fetch('https://weekendbakermnl.herokuapp.com/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => response.json())
            .then(data => {

            })


        //Clear input fields
        setEmail('');
        setPassword('');
        setVerifyPassword('');

        Swal.fire({
            title: 'Yaaaaaaaaaaaay!',
            icon: 'success',
            text: 'You have successfully registered!'
        })

        navigate('/login')
    }


    return (

        (user.accessToken !== null) ?

            <Navigate to="/register" />

            :
            <div className='d-flex flex-column justify-content-center align-items-center m-0 p-0'>
                <Form className='register shadow' onSubmit={e => registerUser(e)}>
                    <h1 className='text-center'>Register</h1>
                    <Form.Group className='pb-3'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter your email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='pb-3'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter your password"
                            required
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className='pb-3'>
                        <Form.Label>Verify Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Verify your password"
                            required
                            value={verifyPassword}
                            onChange={e => setVerifyPassword(e.target.value)}
                        />
                    </Form.Group>
                    {isActive ?
                        <div className='d-flex align-items-center flex-column'>
                            <Button variant="primary" type="submit" className="mt-3">Submit</Button>
                        </div>
                        :
                        <div className='d-flex align-items-center flex-column'>
                            <Button variant="primary" type="submit" className="mt-3" disabled>Submit</Button>
                        </div>
                    }


                </Form>

            </div>

    )
}