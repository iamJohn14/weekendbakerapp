import { Card, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
export default function ProductCard({ productProp }) {

    const { _id, name, price } = productProp


    return (
        <div className='col-11 col-md-6 col-lg-4 mx-0 mb-4'>
            <Card className='p-0 shadow product'>
                <img className='cart-img-top img-fluid border-bottom' src={require('../images/logo1.jpg')} />
                <Card.Body>
                    <Card.Title className='text-center'> {name}</Card.Title>
                    <h5 className='my-3 text-center pricecolor'>Price:{price} </h5>

                    <div className="d-flex justify-content-center " >
                        <Button variant="primary" as={Link} to={`/products/${_id}/detail`}>Details</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}


ProductCard.propTypes = {
    productProp: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired
    })
}