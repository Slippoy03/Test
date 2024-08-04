const Sidebar = () => {
  return (
    <div className="w-64 bg-white shadow-md h-full">
      <div className="p-4">
        <h2 className="font-bold text-xl mb-4 text-gray-700">My Wish List</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              View Orders History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Purchased Products Review
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              View E-Coupons History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              View E-Vouchers History
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Finalized Preorder Payments
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Payment Confirmation
            </a>
          </li>
        </ul>
        <h2 className="font-bold text-xl mt-6 mb-4 text-gray-700">
          Account Settings
        </h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Personal Information
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Change Account
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Change Password
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Wish List
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Write Testimonial
            </a>
          </li>
        </ul>
        <h2 className="font-bold text-xl mt-6 mb-4 text-gray-700">
          Periplus Elite Card (PEC)
        </h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              PEC Member Details
            </a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Show E-PEC Barcode
            </a>
          </li>
        </ul>
        <h2 className="font-bold text-xl mt-6 mb-4 text-gray-700">
          Newsletter
        </h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Subscribe Or Unsubscribe
            </a>
          </li>
        </ul>
        <ul>
          <li className="mt-6">
            <a href="#" className="text-gray-700 hover:text-orange-500">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
