import { useEffect, useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { supabase, type BlogPost } from '../lib/supabase';
import { BookOpen, Calendar, Tag, ArrowRight } from 'lucide-react';

// Fallback mock data for when Supabase is unavailable
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: '5 Ayurvedic Tips for Better Sleep',
    slug: 'ayurvedic-tips-better-sleep',
    excerpt: 'Discover ancient Ayurvedic wisdom to improve your sleep quality naturally and wake up refreshed every morning.',
    content: '',
    category: 'ayurveda',
    tags: ['sleep', 'wellness', 'ayurveda'],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Yoga Poses for Stress Relief',
    slug: 'yoga-poses-stress-relief',
    excerpt: 'Learn simple yet effective yoga poses that can help you release tension and find calm in your busy day.',
    content: '',
    category: 'yoga',
    tags: ['stress', 'yoga', 'relaxation'],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'The Healing Power of Sound',
    slug: 'healing-power-of-sound',
    excerpt: 'Explore how sound vibrations can promote healing, reduce anxiety, and enhance your overall well-being.',
    content: '',
    category: 'sound-healing',
    tags: ['sound healing', 'meditation', 'wellness'],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Mindfulness for Beginners',
    slug: 'mindfulness-for-beginners',
    excerpt: 'Start your meditation journey with these simple mindfulness practices perfect for beginners.',
    content: '',
    category: 'meditation',
    tags: ['mindfulness', 'meditation', 'beginners'],
    is_published: true,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export default function Tips() {
  const { ref, isVisible } = useScrollAnimation();
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('is_published', true)
        .order('published_at', { ascending: false })
        .limit(4);

      if (!error && data && data.length > 0) {
        setPosts(data);
      }
      // If error or no data, keep using mockPosts
    }
    fetchPosts();
  }, []);

  const categoryColors = {
    ayurveda: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
    yoga: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    'sound-healing': 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400',
    meditation: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    wellness: 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400',
  };

  return (
    <section id="tips" className="py-24 bg-gradient-to-b from-white to-mint-50/30 dark:from-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref}
          className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
        >
          <div className="text-center mb-16">
            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 px-4 py-2 rounded-full mb-4">
              <BookOpen className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <span className="text-sm font-medium text-teal-700 dark:text-teal-300">
                Wellness Tips & Insights
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              Healing Wisdom
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Articles, guides, and practical tips for your wellness journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {posts.map((post, index) => (
              <article
                key={post.id}
                className={`group bg-slate-50 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 dark:border-slate-700 hover:-translate-y-2 ${isVisible ? 'animate-fade-in' : 'opacity-0'
                  }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="h-48 bg-gradient-to-br from-teal-100 to-amber-100 dark:from-slate-700 dark:to-slate-600 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-500">
                  {post.category === 'ayurveda' && '🌿'}
                  {post.category === 'yoga' && '🧘'}
                  {post.category === 'sound-healing' && '🔔'}
                  {post.category === 'meditation' && '☸️'}
                  {post.category === 'wellness' && '💚'}
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${categoryColors[post.category]
                        }`}
                    >
                      {post.category.replace('-', ' ')}
                    </span>
                    <span className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.published_at).toLocaleDateString()}</span>
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>

                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400"
                        >
                          <Tag className="w-3 h-3" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => alert(`Opening article: ${post.title}\n\nThis would navigate to the full blog post. In a complete implementation, this would link to /blog/${post.slug}`)}
                    className="flex items-center space-x-2 text-teal-600 dark:text-teal-400 font-semibold text-sm group-hover:translate-x-2 transition-transform"
                  >
                    <span>Read More</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Explore more healing wisdom and practical wellness guides
            </p>
            <button
              onClick={() => alert('View All Articles\n\nThis would navigate to the blog page showing all wellness articles. In a complete implementation, this would link to /blog')}
              className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 inline-flex items-center space-x-2"
            >
              <BookOpen className="w-5 h-5" />
              <span>View All Articles</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
