import React from 'react';
import { Heart, Star } from 'lucide-react';

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Air Jordan 1 Mid",
      price: "$120",
      originalPrice: "$150",
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.8,
      colors: ["Black", "White", "Red"]
    },
    {
      id: 2,
      name: "Nike Air Max 270",
      price: "$140",
      originalPrice: null,
      image: "https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.9,
      colors: ["White", "Blue", "Gray"]
    },
    {
      id: 3,
      name: "Nike React Infinity",
      price: "$160",
      originalPrice: "$200",
      image: "https://images.pexels.com/photos/1478442/pexels-photo-1478442.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.7,
      colors: ["Black", "White", "Pink"]
    },
    {
      id: 4,
      name: "Nike Dunk Low",
      price: "$100",
      originalPrice: null,
      image: "https://images.pexels.com/photos/1456706/pexels-photo-1456706.jpeg?auto=compress&cs=tinysrgb&w=800",
      rating: 4.6,
      colors: ["White", "Black", "Green"]
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600 text-lg">Discover our most popular sneakers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="group cursor-pointer">
              <div className="relative overflow-hidden rounded-lg bg-gray-50 mb-4">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors duration-200">
                  <Heart className="w-5 h-5 text-gray-600 hover:text-red-500" />
                </button>
                
                {product.originalPrice && (
                  <div className="absolute top-4 left-4 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
                    Sale
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-lg group-hover:text-red-600 transition-colors duration-200">
                  {product.name}
                </h3>
                
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm text-gray-600">{product.rating}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="font-bold text-lg">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>

                <div className="flex space-x-2">
                  {product.colors.map((color, index) => (
                    <div 
                      key={index}
                      className={`w-4 h-4 rounded-full border-2 border-gray-300 ${
                        color === 'Black' ? 'bg-black' : 
                        color === 'White' ? 'bg-white' :
                        color === 'Red' ? 'bg-red-500' :
                        color === 'Blue' ? 'bg-blue-500' :
                        color === 'Gray' ? 'bg-gray-500' :
                        color === 'Pink' ? 'bg-pink-500' :
                        'bg-green-500'
                      }`}
                    ></div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-full font-semibold hover:bg-gray-800 transition-colors duration-200 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gray-900 text-white px-8 py-3 rounded-full font-semibold hover:bg-black transition-colors duration-200">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;