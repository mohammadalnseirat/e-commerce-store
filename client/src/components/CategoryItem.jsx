import React from "react";
import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  return (
    <div className="relative overflow-hidden h-96 w-full rounded-lg group border border-emerald-500 hover:border-emerald-600 transition-all duration-300">
      <Link to={"/category" + category.href}>
        <div className="w-full h-full cursor-pointer">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-80 z-10">
            <img
              src={category.imageUrl}
              alt={category.name}
              loading="lazy"
              className="w-full h-full object-cover transition-transform ease-out group-hover:scale-110  duration-300"
            />
            <div className="absolute left-0 right-0 bottom-0 p-4 z-20">
              <h3 className="text-emerald-500 text-2xl font-bold mb-2">
                {category.name}
              </h3>
              <p className="text-gray-300 text-sm">Explore {category.name}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryItem;
