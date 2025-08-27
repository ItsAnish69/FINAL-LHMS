import React from 'react';

// remove all the dark mode form this code
const Modal = ({ showModal, modalType, selectedUser, closeModal }) => {
  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`rounded-lg p-6 w-96 max-h-96 overflow-y-auto bg-white`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-lg font-semibold text-gray-900`}>
            {modalType === 'addUser' && 'Add New User'}
            {modalType === 'editUser' && 'Edit User'}
            {modalType === 'addBook' && 'Add New Book'}
            {modalType === 'viewUser' && 'User Details'}
          </h3>
          <button onClick={closeModal} className={`text-gray-500 hover:text-gray-700`}>
            ×
          </button>
        </div>
        
        {modalType === 'viewUser' && selectedUser && (
          <div className="space-y-3">
            <div>
              <label className={`text-sm font-medium text-gray-700`}>Name</label>
              <p className={`text-gray-900`}>{selectedUser.name}</p>
            </div>
            <div>
              <label className={`text-sm font-medium text-gray-700`}>Email</label>
              <p className={`text-gray-900`}>{selectedUser.email}</p>
            </div>
            <div>
              <label className={`text-sm font-medium text-gray-700`}>Role</label>
              <p className={`text-gray-900`}>{selectedUser.role}</p>
            </div>
            <div>
              <label className={`text-sm font-medium text-gray-700`}>Books Borrowed</label>
              <p className={`text-gray-900`}>{selectedUser.borrowed}</p>
            </div>
          </div>
        )}

        {(modalType === 'addUser' || modalType === 'editUser') && (
          <form className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Name</label>
              <input type="text" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Email</label>
              <input type="email" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Role</label>
              <select className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`}>
                <option>Borrower</option>
                <option>Librarian</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                {modalType === 'addUser' ? 'Add User' : 'Update User'}
              </button>
              <button type="button" onClick={closeModal} className={`flex-1 py-2 px-4 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300`}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {modalType === 'addBook' && (
          <form className="space-y-4">
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Title</label>
              <input type="text" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Author</label>
              <input type="text" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Category</label>
              <input type="text" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div>
              <label className={`block text-sm font-medium text-gray-700`}>Quantity</label>
              <input type="number" className={`mt-1 block w-full rounded-md border px-3 py-2 bg-white border-gray-300`} />
            </div>
            <div className="flex gap-3 mt-6">
              <button type="submit" className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700">
                Add Book
              </button>
              <button type="button" onClick={closeModal} className={`flex-1 py-2 px-4 rounded-md bg-gray-200 text-gray-900 hover:bg-gray-300`}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Modal;