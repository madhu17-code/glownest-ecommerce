import React from 'react';

const About = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Founder & CEO",
      image: "/images/founder.jpeg",
      bio: "Dermatologist with 15+ years of experience in natural skincare formulations."
    },
    {
      id: 2,
      name: "Maria Rodriguez",
      role: "Head of Product Development",
      image: "/images/hair.jpeg",
      bio: "Cosmetic chemist passionate about creating effective, natural skincare solutions."
    },
    {
      id: 3,
      name: "Alex Chen",
      role: "Sustainability Director",
      image: "/images/director.jpeg",
      bio: "Environmental advocate ensuring our products and packaging are eco-friendly."
    }
  ];

  const values = [
    {
      icon: "🌿",
      title: "Natural Ingredients",
      description: "We use only the finest natural ingredients sourced from sustainable farms."
    },
    {
      icon: "🔬",
      title: "Scientifically Proven",
      description: "Every formula is backed by research and dermatologist-approved."
    },
    {
      icon: "🌍",
      title: "Sustainable",
      description: "Committed to eco-friendly practices and reducing our environmental impact."
    },
    {
      icon: "❤️",
      title: "Customer Care",
      description: "Your satisfaction and skin health are our top priorities."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 via-white to-glow-50 py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              About{' '}
              <span className="text-primary-500">
                GlowNest
              </span>
            </h1>
            <p className="text-xl text-gray-600">
              We're on a mission to help everyone discover their natural radiance through 
              science-backed, natural skincare that truly works.
            </p>
          </div>
        </div>
      </div>

      {/* Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  GlowNest was born from a simple belief: everyone deserves to feel confident 
                  in their own skin. Our journey began in 2020 when our founder, Dr. Sarah Johnson, 
                  discovered that many people were struggling to find skincare products that worked 
                  for their unique skin types.
                </p>
                <p>
                  Frustrated by the lack of effective, natural options in the market, we decided 
                  to change that by creating a line of products that combines the best of nature 
                  with modern science. Every formula is carefully crafted and tested to ensure 
                  it delivers real results.
                </p>
                <p>
                  Today, we're proud to serve thousands of customers who trust us with their 
                  skincare journey. Our commitment to quality, sustainability, and customer care 
                  remains at the heart of everything we do.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-200 to-glow-200 rounded-2xl h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-6 glow-effect">
                    <svg className="w-16 h-16 text-primary-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-primary-600 font-medium text-lg">Our Journey</p>
                  <p className="text-sm text-primary-500">From idea to reality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600">
              The passionate people behind GlowNest
            </p>
          </div>
          
          <div className="grid grid-cols-3 gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center p-6 bg-white rounded-xl shadow-md h-full">
                <div className="relative mb-6">
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden ring-4 ring-primary-100 hover:ring-primary-200 transition-all">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-primary-50 to-glow-50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-xl text-gray-600">
            To provide high-quality, natural skincare products that help people achieve 
            healthy, glowing skin while promoting self-confidence and self-care.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About; 