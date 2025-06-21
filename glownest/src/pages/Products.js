import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();

  const products = [
    {
      id: 1,
      name: "Herbal Cleanser",
      price: "₹799",
      image: "/images/cleanser.jpeg",
      description: "Gentle daily cleanser with natural herbs",
      category: "cleanser"
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      price: "₹1,299",
      image: "/images/serum.jpeg",
      description: "Brightening serum with potent Vitamin C",
      category: "serum"
    },
    {
      id: 3,
      name: "Hydra Moisturizer",
      price: "₹999",
      image: "/images/moisturizer.jpeg",
      description: "Deep hydration for all skin types",
      category: "moisturizer"
    },
    {
      id: 4,
      name: "Sunscreen SPF 50",
      price: "₹899",
      image: "/images/sunscreen.jpeg",
      description: "Broad spectrum protection",
      category: "sunscreen"
    },
    {
      id: 5,
      name: "Clay Face Mask",
      price: "₹599",
      image: "/images/facemask.jpeg",
      description: "Weekly treatment for glowing skin",
      category: "mask"
    },
    {
      id: 6,
      name: "Rose Water Toner",
      price: "₹699",
      image: "/images/toner.jpeg",
      description: "Balance and refresh your skin",
      category: "toner"
    },
    {
      id: 7,
      name: "Revitalizing Eye Cream",
      price: "₹899",
      image: "/images/eyecream.jpeg",
      description: "Reduce dark circles and fine lines",
      category: "eye-care"
    },
    {
      id: 8,
      name: "Overnight Repair Cream",
      price: "₹1,199",
      image: "/images/nightcream.jpeg",
      description: "Repair and restore while you sleep",
      category: "moisturizer"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'cleanser', name: 'Cleansers' },
    { id: 'serum', name: 'Serums' },
    { id: 'moisturizer', name: 'Moisturizers' },
    { id: 'sunscreen', name: 'Sunscreen' },
    { id: 'mask', name: 'Masks' },
    { id: 'toner', name: 'Toners' },
    { id: 'eye-care', name: 'Eye Care' }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-50 to-glow-50 py-16">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Our Products
            </h1>
            <p className="text-xl text-gray-600">
              Discover our complete range of natural skincare products designed to 
              enhance your natural beauty and promote healthy, glowing skin.
            </p>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b">
        <div className="container py-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container py-12">
        <div className="grid grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="card overflow-hidden">
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover hover:scale-110 transition-transform"
                />
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">
                    {product.price}
                  </span>
                  <button onClick={() => addToCart(product)} className="btn btn-primary text-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try selecting a different category or check back later.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products; 