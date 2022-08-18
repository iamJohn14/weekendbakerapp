import UserView from "../components/UserView.jsx";
import AdminView from "../components/AdminView.jsx";
import { useContext, useEffect, useState } from "react";
import UserContext from "../UserContext";
import Banner from "../components/Banner.jsx";



export default function ProductPage() {


    const [allProducts, setAllProducts] = useState([])


    const fetchData = () => {
        fetch('https://weekendbakermnl.herokuapp.com/products/all')
            .then(res => res.json())
            .then(data => {

                setAllProducts(data)
            })
    }


    useEffect(() => {
        fetchData()
    }, [])

    const { user } = useContext(UserContext);

    return (
        <>
            <div className="banner1 p-0 m-0">
                <Banner title="Our Products" />
            </div>
            {(user.isAdmin === true) ?
                <AdminView productsData={allProducts} fetchData={fetchData} />

                :

                <section className="container py-4">
                    <div className="row justify-content-start">
                        <UserView productsData={allProducts} />
                    </div>
                </section>
            }


        </>
    )
}