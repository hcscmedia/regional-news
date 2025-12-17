import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { newsApi } from '../api/newsApi';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNewsDetail();
  }, [id]);

  const fetchNewsDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsApi.getNewsById(id);
      setNews(response.data);
    } catch (err) {
      setError('Fehler beim Laden der Nachricht. Bitte versuchen Sie es später erneut.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Lade Nachricht...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error || 'Nachricht nicht gefunden'}
          </div>
          <Link to="/" className="text-blue-600 hover:text-blue-800">
            ← Zurück zur Übersicht
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6">
          ← Zurück zur Übersicht
        </Link>

        <article className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getCategoryColor(news.category)}`}>
                {news.category}
              </span>
              <span className="text-gray-500">{formatDate(news.date)}</span>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">{news.title}</h1>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {news.content}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default NewsDetail;
