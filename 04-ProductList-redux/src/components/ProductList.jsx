// src/components/ProductList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/feature/productSlice';

function ProductList() {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) return <p className="text-blue-500">Loading products...</p>;
    if (error) return <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="grid grid-cols-2 gap-4">
            {products.map((product) => (
                <div key={product.id} className="p-4 border rounded shadow">
                    <img src={product.image} alt={product.title} className="h-32 object-contain mx-auto mb-2" />
                    <h3 className="text-sm font-semibold">{product.title}</h3>
                    <p className="text-xs text-gray-500">${product.price}</p>
                </div>
            ))}
        </div>
    );
}

export default ProductList;
