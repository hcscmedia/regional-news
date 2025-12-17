import { Link } from 'react-router-dom';

const NewsCard = ({ news }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Politik': 'bg-red-100 text-red-800',
      'Wirtschaft': 'bg-green-100 text-green-800',
      'Sport': 'bg-blue-100 text-blue-800',
      'Kultur': 'bg-purple-100 text-purple-800',
      'Lokales': 'bg-yellow-100 text-yellow-800',
      'Verschiedenes': 'bg-gray-100 text-gray-800',
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
            {news.category}
          </span>
          <span className="text-sm text-gray-500">{formatDate(news.date)}</span>
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition">
          <Link to={`/news/${news._id}`}>{news.title}</Link>
        </h3>
        <p className="text-gray-700 mb-4 line-clamp-3">
          {news.content.substring(0, 150)}...
        </p>
        <Link
          to={`/news/${news._id}`}
          className="inline-block text-blue-600 font-medium hover:text-blue-800 transition"
        >
          Weiterlesen →
        </Link>
      </div>
    </div>
  );
};

export default NewsCard;
