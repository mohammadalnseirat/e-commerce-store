import React from "react";
import CategoryItem from "../components/CategoryItem";

const categories = [
  { href: "/jeans", name: "Jeans", imageUrl: "/jeans.jpg" },
  { href: "/t-shirts", name: "T-shirts", imageUrl: "/tshirts.jpg" },
  { href: "/shoes", name: "Shoes", imageUrl: "/shoes.jpg" },
  { href: "/glasses", name: "Glasses", imageUrl: "/glasses.png" },
  { href: "/jackets", name: "Jackets", imageUrl: "/jackets.jpg" },
  { href: "/suits", name: "Suits", imageUrl: "/suits.jpg" },
  { href: "/bags", name: "Bags", imageUrl: "/bags.jpg" },
];
const HomePage = () => {
  return (
    <div className="relative min-h-screen text-gray-50 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-5xl font-bold font-mono text-center sm:text-6xl text-emerald-400 mb-4">
          Explore Our Collection
        </h1>
        <p className="text-gray-200 text-center text-lg mb-12">
          Discover the latest trends in eco-friendly fashion
        </p>
        {/* Categories here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {
            categories.map((category)=>(
              <CategoryItem key={category.name} category={category}/>
            ))
          }

        </div>
      </div>
    </div>
  );
};

export default HomePage;
