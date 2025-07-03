import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/Token';
import toast from 'react-hot-toast';
import { increase } from '../redux/cart';

const Services = () => {
  const select = useSelector((state) => state.auth.isLogged);
  const dispatch = useDispatch();

  const handleLogout = () => {
    toast.success('You are logged out');
    dispatch(logout());
  };

  const CourseList = [
    {
      id: 1,
      name: 'Web development',
      desc: 'Learn modern web development with the latest technologies',
      btn: 'Add to Cart',
      price: '$100',
    },
    {
      id: 2,
      name: 'AI/ML',
      desc: 'Explore artificial intelligence and machine learning concepts',
      btn: 'Add to Cart',
      price: '$200',
    },
    {
      id: 3,
      name: 'Digital Marketing',
      desc: 'Master digital marketing strategies and tools.',
      btn: 'Add to Cart',
      price: '$150',
    },
  ];

  const handleAddToCart = (course) => {
    toast.success('Item added to cart');
    dispatch(increase(course));
  };

  return (
    <>
      {select ? (
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
            Our Courses
          </h1>

          <div className="flex flex-wrap justify-center gap-6">
            {CourseList.map((ele) => {
              return (
                <div
                  key={ele.id}
                  className="w-64 p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-200"
                >
                  <h2 className="text-xl font-semibold mb-4 text-gray-800">
                    {ele.name}
                  </h2>
                  <p className="text-gray-600 mb-4">{ele.desc}</p>
                  <p className="text-lg font-bold text-green-600 mb-4">{ele.price}</p>
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleAddToCart(ele)}
                      className="bg-yellow-600 hover:bg-blue-600 text-white px-4 py-2 rounded transition duration-200"
                    >
                      {ele.btn}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div className="p-8 text-center">
          <p className="text-red-600 text-lg">Please login to view services</p>
        </div>
      )}
    </>
  );
};

export default Services;