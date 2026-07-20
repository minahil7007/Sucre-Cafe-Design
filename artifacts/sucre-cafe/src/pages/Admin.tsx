import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { 
  Coffee, Calendar, Tag, Image as ImageIcon, MessageSquare, 
  LogOut, Plus, Trash2, Edit2, Check, X, Eye 
} from 'lucide-react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { initialMenuItems, initialOffers, initialEvents, initialGallery, initialTestimonials } from '@/data/initialData';

// Types
type Section = 'menu' | 'offers' | 'events' | 'gallery' | 'testimonials' | 'messages';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const [activeSection, setActiveSection] = useState<Section>('menu');

  // Data State
  const [menuItems, setMenuItems] = useLocalStorage('sucre_menu', initialMenuItems);
  const [offers, setOffers] = useLocalStorage('sucre_offers', initialOffers);
  const [events, setEvents] = useLocalStorage('sucre_events', initialEvents);
  const [gallery, setGallery] = useLocalStorage('sucre_gallery', initialGallery);
  const [testimonials, setTestimonials] = useLocalStorage('sucre_testimonials', initialTestimonials);
  const [messages, setMessages] = useLocalStorage('sucre_messages', [] as any[]);

  // Editor states (simplified for demo)
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<any>({});

  useEffect(() => {
    const auth = sessionStorage.getItem('sucre_admin_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sucre2024') {
      setIsAuthenticated(true);
      sessionStorage.setItem('sucre_admin_auth', 'true');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('sucre_admin_auth');
  };

  // Generic Handlers
  const handleDelete = (id: string, collection: any[], setter: (val: any) => void) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setter(collection.filter((item: any) => item.id !== id));
    }
  };

  const startEdit = (item: any) => {
    setIsEditing(item.id);
    setEditFormData({ ...item });
  };

  const cancelEdit = () => {
    setIsEditing(null);
    setEditFormData({});
  };

  const saveEdit = (collection: any[], setter: (val: any) => void) => {
    if (!editFormData.id) {
      // Create new
      setter([{ ...editFormData, id: Date.now().toString() }, ...collection]);
    } else {
      // Update existing
      setter(collection.map((item: any) => item.id === editFormData.id ? editFormData : item));
    }
    setIsEditing(null);
    setEditFormData({});
  };

  const addNew = () => {
    setIsEditing('new');
    setEditFormData({ id: '' });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#111111] text-white flex items-center justify-center p-4">
        <SEO title="Admin Login" />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#1a1a1a] p-8 md:p-12 border border-[#333] w-full max-w-md"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl mb-2">SUCRÉ Admin</h1>
            <p className="text-gray-400 text-sm">Please enter the master password to continue.</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-black border border-[#333] px-4 py-3 text-white focus:outline-none focus:border-[#C8A96A] transition-colors font-mono"
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-[#C8A96A] text-black font-medium uppercase tracking-widest py-3 hover:bg-[#b09255] transition-colors"
            >
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  const sidebarLinks = [
    { id: 'menu', label: 'Menu Items', icon: Coffee },
    { id: 'offers', label: 'Offers', icon: Tag },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-[#111] text-gray-200 flex flex-col md:flex-row font-sans">
      <SEO title="Admin Dashboard" />
      
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1a1a1a] border-r border-[#333] flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-[#333]">
          <h1 className="font-serif text-2xl text-white tracking-widest uppercase">SUCRÉ <span className="text-[#C8A96A] text-xs align-top">Admin</span></h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            return (
              <button
                key={link.id}
                onClick={() => { setActiveSection(link.id); cancelEdit(); }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm uppercase tracking-wider ${
                  activeSection === link.id 
                    ? 'bg-[#C8A96A]/10 text-[#C8A96A] border border-[#C8A96A]/20' 
                    : 'text-gray-400 hover:bg-[#222] hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                {link.label}
              </button>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-[#333]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-wider"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto h-screen">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#333]">
            <h2 className="font-serif text-3xl text-white capitalize">{activeSection}</h2>
            {activeSection !== 'messages' && (
              <button 
                onClick={addNew}
                className="flex items-center gap-2 bg-[#C8A96A] text-black px-4 py-2 text-sm uppercase tracking-wider font-medium hover:bg-[#b09255] transition-colors rounded-sm"
              >
                <Plus className="w-4 h-4" />
                Add New
              </button>
            )}
          </div>

          {/* Editor Form Modal/Inline */}
          <AnimatePresence>
            {isEditing && activeSection !== 'messages' && activeSection !== 'gallery' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-[#1a1a1a] border border-[#C8A96A]/30 p-6 mb-8 rounded-sm overflow-hidden"
              >
                <h3 className="font-serif text-xl text-white mb-6">
                  {editFormData.id ? 'Edit Item' : 'New Item'}
                </h3>
                
                <div className="grid gap-4 mb-6">
                  {Object.keys(activeSection === 'menu' ? menuItems[0] || {} : 
                               activeSection === 'offers' ? offers[0] || {} : 
                               activeSection === 'events' ? events[0] || {} : 
                               activeSection === 'testimonials' ? testimonials[0] || {} : {}).map((key) => {
                    if (key === 'id') return null;
                    return (
                      <div key={key}>
                        <label className="block text-xs uppercase tracking-widest text-gray-500 mb-2">{key}</label>
                        {key === 'description' || key === 'content' ? (
                          <textarea 
                            value={editFormData[key] || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                            className="w-full bg-black border border-[#333] px-3 py-2 text-white focus:border-[#C8A96A] outline-none min-h-[100px]"
                          />
                        ) : (
                          <input 
                            type={key === 'price' ? 'number' : key === 'date' || key === 'expiry' ? 'text' : 'text'}
                            value={editFormData[key] || ''}
                            onChange={(e) => setEditFormData({ ...editFormData, [key]: e.target.value })}
                            className="w-full bg-black border border-[#333] px-3 py-2 text-white focus:border-[#C8A96A] outline-none"
                            placeholder={key === 'date' ? 'YYYY-MM-DDTHH:mm:ss' : ''}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      if (activeSection === 'menu') saveEdit(menuItems, setMenuItems);
                      if (activeSection === 'offers') saveEdit(offers, setOffers);
                      if (activeSection === 'events') saveEdit(events, setEvents);
                      if (activeSection === 'testimonials') saveEdit(testimonials, setTestimonials);
                    }}
                    className="flex items-center gap-2 bg-[#C8A96A] text-black px-6 py-2 text-sm uppercase tracking-wider font-medium hover:bg-[#b09255] transition-colors rounded-sm"
                  >
                    <Check className="w-4 h-4" /> Save
                  </button>
                  <button 
                    onClick={cancelEdit}
                    className="flex items-center gap-2 bg-transparent border border-[#333] text-white px-6 py-2 text-sm uppercase tracking-wider font-medium hover:bg-[#333] transition-colors rounded-sm"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Lists */}
          <div className="bg-[#1a1a1a] border border-[#333] rounded-sm overflow-hidden">
            
            {activeSection === 'menu' && (
              <div className="divide-y divide-[#333]">
                {menuItems.map((item: any) => (
                  <div key={item.id} className="p-4 flex items-center justify-between hover:bg-[#222] transition-colors">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-sm border border-[#333]" />
                      <div>
                        <h4 className="text-white font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-500">{item.category} • {item.price} SAR</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(item)} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(item.id, menuItems, setMenuItems)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'offers' && (
              <div className="divide-y divide-[#333]">
                {offers.map((offer: any) => (
                  <div key={offer.id} className="p-4 flex items-center justify-between hover:bg-[#222] transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{offer.title}</h4>
                      <p className="text-sm text-gray-500">Code: {offer.code} • Expires: {offer.expiry}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(offer)} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(offer.id, offers, setOffers)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'events' && (
              <div className="divide-y divide-[#333]">
                {events.map((event: any) => (
                  <div key={event.id} className="p-4 flex items-center justify-between hover:bg-[#222] transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{event.title}</h4>
                      <p className="text-sm text-gray-500">{new Date(event.date).toLocaleDateString()} • {event.badge}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(event)} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(event.id, events, setEvents)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'testimonials' && (
              <div className="divide-y divide-[#333]">
                {testimonials.map((test: any) => (
                  <div key={test.id} className="p-4 flex items-center justify-between hover:bg-[#222] transition-colors">
                    <div>
                      <h4 className="text-white font-medium">{test.name}</h4>
                      <p className="text-sm text-gray-500">{test.role}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(test)} className="p-2 text-gray-400 hover:text-white"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(test.id, testimonials, setTestimonials)} className="p-2 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeSection === 'messages' && (
              <div className="divide-y divide-[#333]">
                {messages.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">No messages yet.</div>
                ) : (
                  messages.map((msg: any) => (
                    <div key={msg.id} className={`p-4 hover:bg-[#222] transition-colors ${!msg.read ? 'border-l-2 border-[#C8A96A]' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-white font-medium">{msg.name}</h4>
                          <p className="text-xs text-[#C8A96A]">{msg.email} {msg.phone ? `• ${msg.phone}` : ''}</p>
                        </div>
                        <span className="text-xs text-gray-500">{new Date(msg.date).toLocaleDateString()}</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-2 bg-black/50 p-3 rounded-sm">{msg.message}</p>
                      <div className="mt-3 flex justify-end gap-2">
                        {!msg.read && (
                          <button 
                            onClick={() => {
                              setMessages(messages.map((m: any) => m.id === msg.id ? { ...m, read: true } : m));
                            }}
                            className="text-xs uppercase tracking-widest text-[#C8A96A] hover:text-white transition-colors"
                          >
                            Mark Read
                          </button>
                        )}
                        <button 
                          onClick={() => handleDelete(msg.id, messages, setMessages)}
                          className="text-xs uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeSection === 'gallery' && (
              <div className="p-4">
                {isEditing === 'new' && (
                  <div className="mb-6 flex gap-4">
                    <input 
                      type="text"
                      placeholder="Image URL"
                      value={editFormData.url || ''}
                      onChange={(e) => setEditFormData({ ...editFormData, url: e.target.value })}
                      className="flex-1 bg-black border border-[#333] px-3 py-2 text-white focus:border-[#C8A96A] outline-none"
                    />
                    <button 
                      onClick={() => {
                        if (editFormData.url) {
                          setGallery([editFormData.url, ...gallery]);
                          cancelEdit();
                        }
                      }}
                      className="bg-[#C8A96A] text-black px-6 py-2 text-sm uppercase tracking-wider font-medium hover:bg-[#b09255] transition-colors"
                    >
                      Add
                    </button>
                  </div>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {gallery.map((url: string, idx: number) => (
                    <div key={idx} className="relative group aspect-square rounded-sm overflow-hidden border border-[#333]">
                      <img src={url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button 
                          onClick={() => {
                            if (confirm('Delete this image?')) {
                              setGallery(gallery.filter((u: string) => u !== url));
                            }
                          }}
                          className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

    </div>
  );
}
