import React from "react";

const Searchbar = () => {
  return (
    <form className="flex w-full max-w-md mx-auto">
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default Searchbar;
