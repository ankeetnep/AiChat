import React from 'react';

const Logo = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Explore more about <span className="text-blue-600">Gen-AI</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
          Discover the power of artificial intelligence and how it's transforming the future of technology.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold mb-2">AI Learning</h3>
            <p className="text-gray-600">Master the fundamentals of artificial intelligence</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">💻</div>
            <h3 className="text-xl font-semibold mb-2">Web Development</h3>
            <p className="text-gray-600">Build modern web applications with latest technologies</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-xl font-semibold mb-2">Digital Marketing</h3>
            <p className="text-gray-600">Learn effective digital marketing strategies</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Logo;