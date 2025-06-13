import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Main Hero */}
      <div className="relative h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
        <img 
          src="https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=1600" 
          alt="Nike Hero" 
          className="absolute inset-0 w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            JUST DO IT
          </h1>
          <p className="text-xl md:text-2xl mb-8 font-light">
            Bring the world of Nike to your fingertips
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 transform hover:scale-105">
              Shop Now
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Banner */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">MOVE TO ZERO</h2>
          <p className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto">
            Nike's journey toward zero carbon and zero waste to help protect the future of sport
          </p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;