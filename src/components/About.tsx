import React from 'react';

const About = () => {
  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Our Mission
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              To bring inspiration and innovation to every athlete in the world. 
              If you have a body, you are an athlete.
            </p>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Innovation</h3>
                  <p className="text-gray-400">Pushing the boundaries of athletic performance through cutting-edge technology.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
                  <p className="text-gray-400">Committed to creating a better future for sport and our planet.</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="w-3 h-3 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Community</h3>
                  <p className="text-gray-400">Building connections and inspiring athletes around the globe.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Nike Innovation" 
              className="rounded-lg shadow-2xl"
            />
            <div className="absolute -bottom-6 -right-6 bg-red-600 text-white p-6 rounded-lg shadow-xl">
              <div className="text-3xl font-bold">50+</div>
              <div className="text-sm">Years of Innovation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;