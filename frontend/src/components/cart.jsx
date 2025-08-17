
import React, { useState, useEffect } from 'react';
import { Plus, Minus, Trash2, Calendar, BookOpen, Clock } from 'lucide-react';

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0-7432-7356-5",
      borrowPrice: 2.50,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0-06-112008-4",
      borrowPrice: 3.00,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=300&fit=crop"
    },
    {
      id: 3,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0-452-28423-4",
      borrowPrice: 2.75,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200&h=300&fit=crop"
    }
  ]);

  const [borrowDuration, setBorrowDuration] = useState(14); // days
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);

  const calculateEndDate = (start, duration) => {
    const endDate = new Date(start);
    endDate.setDate(endDate.getDate() + duration);
    return endDate.toISOString().split('T')[0];
  };

  const updateQuantity = (id, change) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return newQuantity === 0 ? null : { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean)
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.borrowPrice * item.quantity), 0);
  const serviceFee = subtotal * 0.05; // 5% service fee
  const total = subtotal + serviceFee;
  const totalBooks = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="w-full mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-6">
            <div className="flex items-center gap-3">
              <BookOpen className="text-white" size={28} />
              <div>
                <h1 className="text-2xl font-bold text-white">Book Borrowing Cart</h1>
                <p className="text-blue-100">Review your selections and borrow duration</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Borrow Duration Section */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Calendar className="text-blue-600" size={20} />
                <h3 className="text-lg font-semibold text-gray-800">Borrow Duration</h3>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Borrow Period (days)
                  </label>
                  <select 
                    value={borrowDuration} 
                    onChange={(e) => setBorrowDuration(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={7}>7 days</option>
                    <option value={14}>14 days</option>
                    <option value={21}>21 days</option>
                    <option value={30}>30 days</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Return By
                  </label>
                  <div className="p-2 bg-gray-100 rounded-md border">
                    <div className="flex items-center gap-2">
                      <Clock className="text-gray-500" size={16} />
                      <span className="text-sm font-medium">
                        {formatDate(calculateEndDate(startDate, borrowDuration))}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 mb-6">
              <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                <BookOpen size={20} />
                Cart Items ({totalBooks} {totalBooks === 1 ? 'book' : 'books'})
              </h3>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <BookOpen className="mx-auto text-gray-300 mb-4" size={48} />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400">Add some books to get started</p>
                </div>
              ) : (
                cartItems.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-20 object-cover rounded-md shadow-sm"
                    />
                    
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.author}</p>
                      <p className="text-gray-500 text-xs">ISBN: {item.isbn}</p>
                      <p className="text-blue-600 font-semibold mt-1">
                        ${item.borrowPrice.toFixed(2)}/book
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-3">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 size={18} />
                      </button>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-semibold text-gray-800">
                          ${(item.borrowPrice * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Billing Summary */}
            {cartItems.length > 0 && (
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Summary</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal ({totalBooks} {totalBooks === 1 ? 'book' : 'books'})</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service Fee (5%)</span>
                    <span className="font-medium">${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Borrow Duration</span>
                    <span className="font-medium">{borrowDuration} days</span>
                  </div>
                  <hr className="my-3" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
                    Proceed to Checkout
                  </button>
                  <button className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors">
                    Continue Browsing
                  </button>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Return Reminder:</strong> Please return all books by {formatDate(calculateEndDate(startDate, borrowDuration))} to avoid late fees.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Cart;
