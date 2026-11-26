import React, { useState } from 'react';
import {
  Users,
  MessageCircle,
  ThumbsUp,
  Share2,
  CheckCircle,
  Award,
  AlertTriangle,
  PlusCircle,
  X,
  Send,
  Sparkles
} from 'lucide-react';

interface PostComment {
  id: string;
  author: string;
  isExpert: boolean;
  role: string;
  text: string;
  time: string;
}

interface CommunityPost {
  id: string;
  authorName: string;
  district: string;
  timeAgo: string;
  crop: string;
  title: string;
  description: string;
  imageUrl?: string;
  likes: number;
  comments: PostComment[];
  status: 'Open' | 'Solved by Expert';
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: 'post-1',
      authorName: 'முத்துவேல் (Muthuvel)',
      district: 'Thanjavur',
      timeAgo: '2 hours ago',
      crop: 'Paddy CR 1009',
      title: 'Brown planthopper (BPH) notice in 50-day Samba crop - Need organic advice',
      description: 'Found small brown insects at the base of the paddy tillers near water level. Foliage turning slightly yellow. How to control without damaging beneficial spiders?',
      imageUrl: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=600&q=80',
      likes: 18,
      status: 'Solved by Expert',
      comments: [
        {
          id: 'c1',
          author: 'Dr. K. Ramasamy',
          isExpert: true,
          role: 'TNAU Entomologist (Verified Expert)',
          text: 'Drain the standing water completely for 3-4 days to expose the tiller base to sunlight. Spray 5% Neem Seed Kernel Extract (NSKE) directly targeting the basal stems early morning. Avoid synthetic pyrethroids which cause BPH resurgence by killing natural mirid bugs.',
          time: '1 hour ago'
        }
      ]
    },
    {
      id: 'post-2',
      authorName: 'அருண்குமார் (Arunkumar)',
      district: 'Pollachi, Coimbatore',
      timeAgo: '4 hours ago',
      crop: 'Coconut',
      title: 'Button shedding reduced by 70% after Boron & Sunnhemp trial',
      description: 'Wanted to share my success story: In my 4-acre grove, heavy button shedding occurred in June. Following KVK advice, applied 50g Borax + Sunnhemp green manuring in each palm basin. Nut retention has increased dramatically!',
      imageUrl: 'https://images.unsplash.com/photo-1544427920-c49ccfb85579?auto=format&fit=crop&w=600&q=80',
      likes: 42,
      status: 'Open',
      comments: [
        {
          id: 'c2',
          author: 'Shanmugam Farmer',
          isExpert: false,
          role: 'Farmer, Udumalpet',
          text: 'Great result Arunkumar! Did you apply Borax along with farmyard manure or directly to the drip emitter?',
          time: '3 hours ago'
        }
      ]
    }
  ]);

  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCrop, setNewCrop] = useState('Paddy (நெல்)');
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});

  const handleLike = (id: string) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId];
    if (!text || !text.trim()) return;

    const newComment: PostComment = {
      id: `comm-${Date.now()}`,
      author: 'You (Farmer)',
      isExpert: false,
      role: 'Registered Farmer',
      text,
      time: 'Just now'
    };

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return { ...p, comments: [...p.comments, newComment] };
      }
      return p;
    }));

    setCommentInputs({ ...commentInputs, [postId]: '' });
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'செல்வராஜ் முனியப்பன் (Selvaraj)',
      district: 'Thanjavur',
      timeAgo: 'Just now',
      crop: newCrop,
      title: newTitle,
      description: newDesc,
      likes: 1,
      comments: [],
      status: 'Open'
    };

    setPosts([created, ...posts]);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            <Users className="w-3.5 h-3.5" />
            <span>Farmer-to-Farmer & Agronomist Network</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Farmer Community (விவசாய சமுதாயம்)</h1>
          <p className="text-sm text-emerald-200/80 mt-1">
            Share field problems, post crop photographs, and receive advice from verified TNAU scientists.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl shadow-emerald-900/50 transition self-start"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask Question (கேள்வி கேட்க)</span>
        </button>
      </div>

      {/* Feed Posts */}
      <div className="space-y-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-[#091f13]/90 backdrop-blur-md border border-emerald-900/60 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-4"
          >
            {/* Post Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-700/60 flex items-center justify-center text-white font-bold text-sm">
                  {post.authorName[0]}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">{post.authorName}</h4>
                  <span className="text-xs text-emerald-400/80">{post.district} • {post.timeAgo}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-[#05140b] text-emerald-300 px-3 py-1 rounded-full border border-emerald-800">
                  {post.crop}
                </span>
                {post.status === 'Solved by Expert' && (
                  <span className="text-xs bg-emerald-600/30 text-emerald-300 px-3 py-1 rounded-full border border-emerald-500/40 font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Solved</span>
                  </span>
                )}
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-white">{post.title}</h3>
              <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">{post.description}</p>
            </div>

            {post.imageUrl && (
              <div className="rounded-2xl overflow-hidden max-h-72 border border-emerald-900/50">
                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center gap-4 pt-2 text-xs text-gray-400">
              <button
                onClick={() => handleLike(post.id)}
                className="flex items-center gap-1.5 hover:text-emerald-400 transition"
              >
                <ThumbsUp className="w-4 h-4" />
                <span>{post.likes} Helpful</span>
              </button>

              <div className="flex items-center gap-1.5 text-gray-400">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments.length} Responses</span>
              </div>
            </div>

            {/* Comments List */}
            {post.comments.length > 0 && (
              <div className="space-y-3 pt-3 border-t border-emerald-900/50">
                {post.comments.map((comm) => (
                  <div
                    key={comm.id}
                    className={`p-4 rounded-2xl border text-xs ${
                      comm.isExpert
                        ? 'bg-[#062013] border-emerald-500/50 text-emerald-100 shadow-md'
                        : 'bg-[#05140b] border-emerald-900/40 text-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{comm.author}</span>
                        {comm.isExpert && (
                          <span className="flex items-center gap-1 bg-emerald-600/40 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                            <Award className="w-3 h-3 text-amber-300" />
                            <span>{comm.role}</span>
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-gray-400">{comm.time}</span>
                    </div>
                    <p className="leading-relaxed">{comm.text}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Comment Input */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                placeholder="Write a response or question..."
                value={commentInputs[post.id] || ''}
                onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                className="flex-1 bg-[#05140b] border border-emerald-800/60 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500"
              />
              <button
                onClick={() => handleAddComment(post.id)}
                className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white transition"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Ask Question */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#091f13] border border-emerald-700/60 rounded-3xl p-6 max-w-lg w-full shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-emerald-800/60 mb-4">
              <h3 className="text-base font-bold text-white">Ask Community & Agri Experts</h3>
              <button onClick={() => setShowNewPostModal(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-gray-300 mb-1 font-medium">Crop Affected / In Question</label>
                <input
                  type="text"
                  required
                  value={newCrop}
                  onChange={(e) => setNewCrop(e.target.value)}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-medium">Title of Problem</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Yellow leaves in turmeric field after heavy rain"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1 font-medium">Detailed Description & Symptoms</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe soil moisture, age of crop, fertilizers applied..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-[#05140b] border border-emerald-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-emerald-800">
                <button
                  type="button"
                  onClick={() => setShowNewPostModal(false)}
                  className="px-4 py-2 rounded-xl bg-gray-800 text-gray-300 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/50"
                >
                  Publish to Community
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
