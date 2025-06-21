import React from 'react';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: "Herbal Cleanser",
      price: "₹799",
      image: "/images/cleanser.jpeg",
      description: "Gentle daily cleanser with natural herbs"
    },
    {
      id: 2,
      name: "Vitamin C Serum",
      price: "₹1,299",
      image: "/images/serum.jpeg",
      description: "Brightening serum with potent Vitamin C"
    },
    {
      id: 3,
      name: "Hydra Moisturizer",
      price: "₹999",
      image: "/images/moisturizer.jpeg",
      description: "Deep hydration for all skin types"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Glow{' '}
              <span className="text-primary-500">
                Naturally
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover nature-powered skincare essentials that reveal your natural radiance. 
              Every product is crafted with love and science.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="btn btn-primary text-lg w-full sm:w-auto">
                Shop Now
              </button>
              <button className="btn btn-secondary text-lg w-full sm:w-auto">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose GlowNest?
            </h2>
            <p className="text-xl text-gray-600">
              We believe in the power of natural ingredients combined with modern science 
              to create skincare that truly works.
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Natural Ingredients</h3>
              <p className="text-gray-600">Pure, organic ingredients sourced from nature's finest resources.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scientifically Proven</h3>
              <p className="text-gray-600">Backed by research and dermatologist-approved formulations.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Visible Results</h3>
              <p className="text-gray-600">See the difference in your skin's health and radiance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-gray-600">
              Start your skincare journey with our most loved products
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card p-6">
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover hover:scale-105 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary-600">{product.price}</span>
                  <button className="btn btn-primary">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
