import { Carousel, Button } from 'react-bootstrap';



export default function Highlights() {
    return (


        <>
            {/* MOBILE */}
            <div className='d-block d-md-none justify-content-center' id="carousel1">
                < Carousel>
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg-mobile px-2"
                            src="https://images.pexels.com/photos/9316530/pexels-photo-9316530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg-mobile px-2"
                            src="https://images.pexels.com/photos/1169790/pexels-photo-1169790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Second slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg-mobile px-2"
                            src="https://images.pexels.com/photos/3602269/pexels-photo-3602269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Third slide"
                        />

                    </Carousel.Item>
                </Carousel >
            </div >

            {/* MD - LG */}

            <div className='d-none d-md-block justify-content-center' id="carousel2">
                <Carousel id="carousel4">
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg px-5"
                            src="https://images.pexels.com/photos/9316530/pexels-photo-9316530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="First slide"
                        />

                    </Carousel.Item>
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg px-5"
                            src="https://images.pexels.com/photos/1169790/pexels-photo-1169790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Second slide"
                        />


                    </Carousel.Item>
                    <Carousel.Item interval={5000} className="py-3">
                        <img
                            className="d-flex carouselimg px-5"
                            src="https://images.pexels.com/photos/3602269/pexels-photo-3602269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            alt="Third slide"
                        />

                        <Carousel.Caption>

                        </Carousel.Caption>

                    </Carousel.Item>
                </Carousel>
            </div>
        </>



    )
}