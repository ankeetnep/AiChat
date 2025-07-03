import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { increase, decrease, remove, loadCart } from '../redux/cart';

const Cart = () => {
  const selector = useSelector((state) => state.cart.items);
  const totalCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('_cart');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        if (parsedCart.length > 0) {
          dispatch(loadCart(parsedCart));
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    }
  }, [dispatch]);

  // Calculate total price
  const calculateTotal = () => {
    return selector
      .reduce((total, item) => {
        // Handle both "$100" and "150$" formats
        const priceStr = item.price.toString();
        const price = parseFloat(priceStr.replace(/[$]/g, '')) || 0;
        return total + price * (item.quantity || 1);
      }, 0)
      .toFixed(2);
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(increase(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(decrease(item));
  };

  if (selector.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
          <p className="text-gray-500 text-sm mt-2">
            Add some courses to get started!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Shopping Cart
      </h1>

      <div className="space-y-4">
        {selector.map((item) => {
          return (
            <div
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition duration-200"
              key={item.id}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 mt-1">{item.desc}</p>
                  <p className="font-bold text-green-600 text-lg mt-2">
                    {item.price}
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleDecreaseQuantity(item)}
                      disabled={item.quantity <= 1}
                      className="bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      -
                    </button>
                    <span className="font-semibold text-lg min-w-[3rem] text-center">
                      {item.quantity || 1}
                    </span>
                    <button
                      onClick={() => handleIncreaseQuantity(item)}
                      className="bg-green-500 hover:bg-green-600 text-white w-8 h-8 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => dispatch(remove(item.id))}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition duration-200"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8 bg-gray-50 rounded-lg p-6">
        <div className="flex justify-between items-center text-lg">
          <span className="font-semibold">Total Items: {totalCount}</span>
          <span className="font-bold text-2xl text-green-600">
            Total: ${calculateTotal()}
          </span>
        </div>
        <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-200">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
