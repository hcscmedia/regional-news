import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { newsApi } from '../api/newsApi';

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Politik', 'Wirtschaft', 'Sport', 'Kultur', 'Lokales', 'Verschiedenes'];

  useEffect(() => {
    fetchNews();
  }, [selectedCategory, searchTerm]);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getAllNews(selectedCategory, searchTerm);
      setNews(response.data);
    } catch (err) {
      setError('Fehler beim Laden der Nachrichten. Bitte stellen Sie sicher, dass der Server läuft.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchTerm('');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedCategory('');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Aktuelle Nachrichten</h1>
        
        <SearchBar onSearch={handleSearch} />
        
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategoryChange}
        />

        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Lade Nachrichten...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {!loading && !error && news.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Keine Nachrichten gefunden.</p>
          </div>
        )}

        {!loading && !error && news.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
