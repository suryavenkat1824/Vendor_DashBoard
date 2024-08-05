import React, { useState, useEffect } from 'react';
import { API_URL } from '../../data/apiPath';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const AllProducts = () => {
    const [products, setProducts] = useState([]);

    const productsHandler = async () => {
        const firmId = localStorage.getItem('firmId');
        try {
            const response = await fetch(`${API_URL}/product/${firmId}/products`);
            const newProductsData = await response.json();
            setProducts(newProductsData.products);
            console.log(newProductsData);
        } catch (error) {
            console.error("failed to fetch products", error);
            toast.error("Failed to fetch products");
            toast.info(`${error}`);
        }
    };

    useEffect(() => {
        productsHandler();
        console.log('this is useEffect');
    }, []);

    const deleteProductById = async (productId) => {
        const deletedProduct = products.find(product => product._id === productId);

        // Show confirmation dialog using SweetAlert
        Swal.fire({
            title: `Are you sure you want to delete ${deletedProduct.productName}?`,
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // Perform the delete request
                    const response = await fetch(`${API_URL}/product/${productId}`, {
                        method: 'DELETE',
                    });

                    // Check if the response is OK
                    if (response.ok) {
                        // Remove the product from state
                        setProducts(products.filter(product => product._id !== productId));

                        // Show success message using SweetAlert
                        Swal.fire(
                            'Deleted!',
                            `${deletedProduct.productName} has been deleted.`,
                            'success'
                        );
                    } else {
                        // Handle errors from server response
                        const errorText = await response.text();
                        throw new Error(`Server error: ${errorText}`);
                    }
                } catch (error) {
                    console.error('Failed to delete product:', error.message);
                    toast.error("Failed to delete product");
                    toast.info(`${error.message}`);
                }
            }
        });
    };

    return (
        <div className='productSection'>
            {!products ? (
                <p>No products added</p>
            ) : (
                <table className="product-table">
                    <thead>
                        <tr>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>{item.productName}</td>
                                <td>₹{item.price}</td>
                                <td>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}/uploads/${item.image}`}
                                            alt={item.productName}
                                            style={{ width: '50px', height: '50px' }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        onClick={() => deleteProductById(item._id)}
                                        className='deleteBtn'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default AllProducts;
