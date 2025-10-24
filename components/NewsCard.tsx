
import React from 'react';
import type { NewsCategory } from '../types';

interface NewsCardProps {
  category: NewsCategory;
  index: number;
}

const NewsCard: React.FC<NewsCardProps> = ({ category, index }) => {
  const animationDelay = `${index * 150}ms`;

  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 transform transition-all duration-500 hover:scale-105 hover:shadow-blue-500/20 animate-fade-in-up"
      style={{ animationDelay }}
    >
      <h2 className="text-2xl font-bold text-blue-400 mb-4 border-b border-gray-700 pb-2">{category.categoryName}</h2>
      <ul className="space-y-4">
        {category.news.map((article, articleIndex) => (
          <li key={articleIndex} className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-semibold text-lg text-gray-100">{article.headline}</h3>
            <p className="text-gray-400 text-sm mt-1">{article.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsCard;
