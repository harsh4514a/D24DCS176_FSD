import React from 'react';
import { useSelector } from 'react-redux';

const LeftSidebar = ({ onCategorySelect }) => {
  const { theme } = useSelector((state) => state.themeSliceApp);
  const categories = ['All', 'Java', 'Javascript', 'React Js', 'Git', 'Mongo DB'];

  return (
    <div className={`w-64 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>
      <h2 className="text-lg font-semibold mb-4">Filter by Category</h2>
      <ul className="space-y-2">
        {categories.map((category) => (
          <li key={category}>
            <button
              onClick={() => onCategorySelect(category === 'All' ? '' : category)}
              className={`w-full text-left p-2 rounded-md transition-colors ${
                theme === 'dark'
                  ? 'hover:bg-gray-700 text-gray-300'
                  : 'hover:bg-gray-200 text-gray-700'
              }`}
            >
              {category}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
