import React, { useEffect, useState } from 'react';
import api from '../api';
import AnimateOnScroll from './AnimateOnScroll'; // ADDED

// Using shared `api` instance from ../api.js — no inline base URL required

const Team = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTeam = async () => {
    try {
  // Use shared `api` instance for fetching team members (NO TOKEN IS PASSED)
  const res = await api.get(`/api/team`);
      // Ensure oldest members appear first (createdAt ascending)
      const list = res.data || [];
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      setTeam(list);
    } catch (error) {
      console.error('Error fetching team:', error);
      setTeam([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeam();
    const onStorage = (e) => {
      if (e.key === 'team-updated') fetchTeam();
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <AnimateOnScroll> {/* WRAPPED SECTION */}
      <section className="relative z-10 bg-gray-900/95 text-gray-200 py-16 md:py-24 border-b-4 border-gray-700 min-h-screen"> {/* ADDED relative z-10 bg-gray-900/95 */}
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center mb-12 md:mb-16">
             <h1 className="text-4xl md:text-6xl font-extrabold text-gray-50 font-serif">
    Our{" "}
    <span className="text-6xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
      Team
    </span>
  </h1>
            <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-gray-400">
              Meet the people who build SketchCode.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
            </div>
          ) : team.length === 0 ? (
            <div className="text-center p-12 bg-gray-800 rounded-2xl border border-gray-700 max-w-3xl mx-auto">
              <p className="text-gray-400 text-lg">No team members added yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
              {team.map((member) => (
                <article key={member._id} className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl transform transition-transform duration-300 hover:scale-[1.02] border border-gray-700 max-w-xs mx-auto w-full">
                  <div className="flex items-center justify-center p-4 border-b border-gray-600">
                    <div className="w-32 h-40 flex items-center justify-center">
                      {member.imageUrl ? (
                        <img src={member.imageUrl} alt={member.name} className="team-avatar" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                          {(() => {
                            const name = (member.name || '').trim();
                            if (!name) return '';
                            const parts = name.split(/\s+/);
                            if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
                            const first = parts[0][0] || '';
                            const second = parts[parts.length - 1][0] || '';
                            return (first + second).toUpperCase();
                          })()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-100 mb-1">{member.name}</h3>
                    <p className="text-blue-400 mb-3">{member.position}</p>
                    <p className="text-gray-400 mb-4 line-clamp-3">{member.bio}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {(member.skills || []).map((s, i) => (
                        <span key={i} className="bg-gray-700 text-gray-200 px-2 py-1 rounded-full text-xs">{s}</span>
                      ))}
                    </div>

                    <div className="flex gap-4 text-gray-400">
                      {member.socialLinks?.linkedin && (
                        <a href={member.socialLinks.linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-500">LinkedIn</a>
                      )}
                      {member.socialLinks?.github && (
                        <a href={member.socialLinks.github} target="_blank" rel="noreferrer" className="hover:text-gray-200">GitHub</a>
                      )}
                      {member.socialLinks?.twitter && (
                        <a href={member.socialLinks.twitter} target="_blank" rel="noreferrer" className="hover:text-blue-400">Twitter</a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </AnimateOnScroll> 
  );
};

export default Team;