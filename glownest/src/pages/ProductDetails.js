// src/pages/ProductDetails.js
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = ({ products }) => {
  const { name } = useParams();
  const product = products.find(p => p.name.toLowerCase() === name.toLowerCase());

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} style={{ maxWidth: '300px' }} />
      <p>Price: ₹{product.price}</p>
      <p>This is a detailed description of the {product.name}.</p>
    </div>
  );
};

export default ProductDetails;
