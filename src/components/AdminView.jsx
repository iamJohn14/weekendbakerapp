import { Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import ArchiveProduct from './ArchiveProduct';




export default function AdminView(props) {

    const { productsData, fetchData } = props;

    const [products, setProducts] = useState([])


    useEffect(() => {

        const productArr = productsData.map(product => {
            return (
                <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{parseFloat(product.price).toFixed(2)}</td>
                    <td className={product.isActive ? "text-success" : "text-danger"}>{product.isActive ? "Available" : "Unavailable"}</td>
                    <td>
                        <EditProduct product={product._id} fetchData={fetchData} />
                    </td>
                    <td>
                        <ArchiveProduct product={product._id} isActive={product.isActive} fetchData={fetchData} />
                    </td>
                </tr>
            )
        })

        setProducts(productArr)
    }, [productsData])

    return (
        <>
            <div className='text-center my-4'>
                <h1> Admin Dashboard</h1>
                <AddProduct fetchData={fetchData} />
            </div>
            <Table striped bordered hover responsive>
                <thead className='bg-dark text-white'>
                    <tr>
                        <th>ID</th>
                        <th>NAME</th>
                        <th>DESCRIPTION</th>
                        <th>PRICE</th>
                        <th>AVAILABILITY</th>
                        <th Colspan='2' className='text-center'>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {products}
                </tbody>
            </Table>
        </>
    )
}