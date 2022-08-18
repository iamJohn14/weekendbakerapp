import { useContext, useState, useEffect } from 'react';
import { Navbar, Nav, Offcanvas, NavbarBrand } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';


export default function AppNavbar() {

    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [userId, setUserId] = useState('');


    //add to cart function
    const viewCart = (userId) => {

        fetch('https://weekendbakermnl.herokuapp.com/users/details', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => response.json())
            .then(data => {
                setUserId(data._id)



                fetch(`https://weekendbakermnl.herokuapp.com/carts/${data._id}/view`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                    })
                navigate(`/carts/${data._id}/view`)



            })
    }


    return (
        <Navbar variant='light' className='d-flex flex-row justify-content-between ps-3'>
            {/* Mobile Nav */}

            <Navbar.Toggle className='d-block d-md-none' aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${false}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
                placement="start"
                className='canvass'
            >
                <Offcanvas.Header closeButton className='justify-content-start'>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${false}`}>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body >
                    <Nav className="flex-grow-1 pe-3">
                        <Nav.Link id='navlink2' className='px-4 text-center' as={Link} to="/">Home</Nav.Link>
                        <Nav.Link id='navlink2' className='px-4 text-center' as={Link} to="/products">Products</Nav.Link>
                        {(user.accessToken !== null) ?
                            <Nav.Link id='navlink2' className='px-4 text-center' as={Link} to="/orders">Orders</Nav.Link>
                            :

                            <>
                            </>
                        }
                    </Nav>
                </Offcanvas.Body>
            </Navbar.Offcanvas>

            <Nav>
                <Nav.Link as={Link} to="/">
                    <NavbarBrand className='ms-3 d-none d-md-block'>WeekendBaker MNL</NavbarBrand></Nav.Link>
            </Nav>





            <Nav className='d-none d-md-flex'>
                <Nav.Link id='navlink' className='px-4' as={Link} to="/">Home</Nav.Link>
                <Nav.Link id='navlink' className='px-4' as={Link} to="/products">Products</Nav.Link>
                {(user.accessToken !== null) ?
                    <Nav.Link id='navlink' as={Link} to="/orders">Orders</Nav.Link>
                    :

                    <>
                    </>
                }
            </Nav>
            <Nav className='me-3'>
                {(user.accessToken !== null) ?
                    <>
                        <Nav.Link className='navlogo' as={Link} to="/carts"><img className="img-fluid navlogo2" alt="cart" src={require('../images/cart.png')} /></Nav.Link>
                    </>
                    :
                    <></>
                }


                {(user.accessToken !== null) ?
                    <Nav.Link id='navlink' as={Link} to="/logout">Logout</Nav.Link>
                    :
                    <>
                        <Nav.Link id='navlink' as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link id='navlink' as={Link} to="/register">Register</Nav.Link>
                    </>
                }

            </Nav>
        </Navbar >


    )
}

