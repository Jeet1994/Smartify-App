
import React, { useState, useCallback } from 'react';
import type { NewsCategory } from './types';
import fetchTopNews from './services/geminiService';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import NewsCard from './components/NewsCard';

const App: React.FC = () => {
  const [newsData, setNewsData] = useState<NewsCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchNews = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setNewsData(null);
    try {
      const data = await fetchTopNews();
      setNewsData(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return (
        <div className="text-center bg-red-900/50 border border-red-700 p-6 rounded-lg">
          <h2 className="text-2xl font-bold text-red-400 mb-2">Oops! Something went wrong.</h2>
          <p className="text-red-300">{error}</p>
          <button
            onClick={handleFetchNews}
            className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      );
    }

    if (newsData) {
      return (
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsData.map((category, index) => (
            <NewsCard key={category.categoryName} category={category} index={index} />
          ))}
        </div>
      );
    }

    return (
      <div className="text-center">
        <button
          onClick={handleFetchNews}
          disabled={isLoading}
          className="px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xl font-bold rounded-full shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Make Me Smart
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        <style>{`
        @keyframes fade-in-up {
            0% {
                opacity: 0;
                transform: translateY(20px);
            }
            100% {
                opacity: 1;
                transform: translateY(0);
            }
        }
        .animate-fade-in-up {
            animation: fade-in-up 0.5s ease-out forwards;
            opacity: 0;
        }
    `}</style>
      <div className="w-full bg-black/30 backdrop-blur-xl rounded-2xl p-4 flex-grow flex flex-col">
        <Header />
        <main className="flex-grow flex items-center justify-center py-10">
          {renderContent()}
        </main>
        {newsData && (
          <footer className="text-center py-4">
             <button
            onClick={() => setNewsData(null)}
            className="px-6 py-2 bg-gray-700 text-gray-300 font-semibold rounded-lg hover:bg-gray-600 transition-colors duration-300"
            >
                Start Over
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
