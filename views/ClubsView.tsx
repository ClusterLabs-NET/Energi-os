
import React, { useState, useEffect, useRef } from 'react';
import { Building2, Shield, Plus, MapPin, Mail, Phone, Users } from 'lucide-react';
import { Card, StatWidget, Button, StatusBadge, SegmentedControl, PieChartWidget } from '../components/CoreComponents';
import { MOCK_CLUBS, MOCK_ATHLETES } from '../mockData';
import { Club } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';

// Global Leaflet def
declare global {
  interface Window {
    L: any;
  }
}

export const ClubsView: React.FC = () => {
  const [viewMode, setViewMode] = useState('List');
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  // Initialize Map when switching to Map view
  useEffect(() => {
    // Logic to init map
    if (viewMode === 'Map' && mapContainerRef.current && window.L && !mapRef.current) {
        const map = window.L.map(mapContainerRef.current, {
           center: [31.2, 36.5],
           zoom: 8,
           minZoom: 7,
           maxBounds: [[29.1, 34.9], [33.5, 39.5]] // Restrict view to Jordan
        });
        
        // CartoDB Light - NO LABELS
        window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19
        }).addTo(map);

        // Custom Pulsating Icon
        const pulsatingIcon = window.L.divIcon({
           className: 'custom-div-icon',
           html: "<div class='pulsating-circle'></div>",
           iconSize: [14, 14],
           iconAnchor: [7, 7]
        });

        // Add Manual Labels for Jordan Only
        const addLabel = (lat: number, lng: number, text: string, isCountry = false) => {
           const labelIcon = window.L.divIcon({
              className: isCountry ? 'map-label-country' : 'map-label-city',
              html: text,
              iconSize: [100, 20],
              iconAnchor: [50, 10]
           });
           window.L.marker([lat, lng], { icon: labelIcon, interactive: false, zIndexOffset: isCountry ? -100 : 0 }).addTo(map);
        }

        addLabel(31.4, 37.0, "JORDAN", true);
        addLabel(31.9539, 35.9106, "AMMAN");
        addLabel(32.5568, 35.8469, "IRBID");
        addLabel(29.5319, 35.0061, "AQABA");
        addLabel(32.0643, 36.0942, "ZARQA");

        MOCK_CLUBS.forEach((club) => {
            if (club.coordinates) {
                window.L.marker([club.coordinates.lat, club.coordinates.lng], { icon: pulsatingIcon })
                    .addTo(map)
                    .bindPopup(`<b>${club.name}</b><br>${club.city}<br>Active Athletes: ${club.activeAthletes}`);
            }
        });

        mapRef.current = map;
    } 
    
    // Fix map rendering by invalidating size after render
    if (viewMode === 'Map' && mapRef.current) {
       setTimeout(() => {
          mapRef.current.invalidateSize();
       }, 100);
    }

    // Cleanup when leaving map view (not just unmount)
    if (viewMode !== 'Map' && mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
    }

    return () => {
        if (mapRef.current && viewMode !== 'Map') {
            mapRef.current.remove();
            mapRef.current = null;
        }
    }
  }, [viewMode]);


  // Chart Data
  const athletesPerClub = MOCK_CLUBS.slice(0, 10).map(c => ({
     name: c.name.substring(0, 15) + '...', // Shorten name
     Athletes: c.activeAthletes
  })).sort((a, b) => b.Athletes - a.Athletes);

  const statusData = [
     { name: 'Active', value: MOCK_CLUBS.filter(c => c.status === 'Active').length },
     { name: 'Pending', value: MOCK_CLUBS.filter(c => c.status === 'Pending Renewal').length },
     { name: 'Suspended', value: MOCK_CLUBS.filter(c => c.status === 'Suspended').length },
  ];

  if (selectedClub) {
     const clubAthletes = MOCK_ATHLETES.filter(a => a.clubId === selectedClub.id);
     
     return (
        <div className="space-y-6 animate-in slide-in-from-right-4">
           <button onClick={() => setSelectedClub(null)} className="text-sm text-slate-500 hover:text-slate-900 flex items-center gap-1">← Back to Registry</button>
           
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Club Profile Sidebar */}
              <div className="space-y-6">
                 <Card className="p-6 text-center">
                    <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full flex items-center justify-center text-slate-400 mb-4">
                       <Building2 size={40} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">{selectedClub.name}</h2>
                    <p className="text-slate-500 text-sm mb-4">Lic: {selectedClub.licenseNumber}</p>
                    <StatusBadge status={selectedClub.status} />
                    
                    <div className="mt-8 space-y-4 text-left">
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <MapPin size={16} /> {selectedClub.city}
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Users size={16} /> Head Coach: {selectedClub.headCoach}
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Mail size={16} /> {selectedClub.email}
                       </div>
                       <div className="flex items-center gap-3 text-sm text-slate-600">
                          <Phone size={16} /> {selectedClub.phone}
                       </div>
                    </div>
                 </Card>
                 
                 <Card className="p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Club Stats</h3>
                    <div className="space-y-4">
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Active Athletes</span>
                          <span className="font-bold">{clubAthletes.length}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">Black Belts</span>
                          <span className="font-bold">{clubAthletes.filter(a => a.belt.includes('Black')).length}</span>
                       </div>
                       <div className="flex justify-between items-center">
                          <span className="text-sm text-slate-500">National Squad Members</span>
                          <span className="font-bold text-blue-600">{clubAthletes.filter(a => a.squad).length}</span>
                       </div>
                    </div>
                 </Card>
              </div>

              {/* Club Athletes List */}
              <div className="lg:col-span-2 space-y-6">
                 <Card className="p-6">
                    <div className="flex justify-between items-center mb-6">
                       <h3 className="font-bold text-lg">Registered Athletes</h3>
                       <Button size="sm" variant="outline">Export List</Button>
                    </div>
                    <div className="overflow-x-auto">
                       <table className="w-full text-sm text-left">
                          <thead className="bg-slate-50 text-slate-500 uppercase text-xs">
                             <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Belt</th>
                                <th className="px-4 py-3">Squad</th>
                                <th className="px-4 py-3">WTF ID</th>
                                <th className="px-4 py-3">Points</th>
                             </tr>
                          </thead>
                          <tbody>
                             {clubAthletes.map(ath => (
                                <tr key={ath.id} className="border-b hover:bg-slate-50">
                                   <td className="px-4 py-3 font-medium">{ath.name}</td>
                                   <td className="px-4 py-3"><StatusBadge status={ath.belt} /></td>
                                   <td className="px-4 py-3">{ath.squad ? <span className="text-blue-600 font-bold text-xs">{ath.squad}</span> : '-'}</td>
                                   <td className="px-4 py-3 font-mono text-slate-500">{ath.wtfId}</td>
                                   <td className="px-4 py-3 font-bold">{ath.points}</td>
                                </tr>
                             ))}
                             {clubAthletes.length === 0 && (
                                <tr>
                                   <td colSpan={5} className="text-center py-8 text-slate-400">No athletes registered yet.</td>
                                </tr>
                             )}
                          </tbody>
                       </table>
                    </div>
                 </Card>
              </div>
           </div>
        </div>
     );
  }

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 w-full md:mr-6">
             <StatWidget title="Total Clubs" value={MOCK_CLUBS.length} icon={Building2} />
             <StatWidget title="Active" value={MOCK_CLUBS.filter(c => c.status === 'Active').length} icon={Shield} />
          </div>
          <div className="flex flex-col items-end gap-4 w-full md:w-auto">
             <div className="flex gap-2">
                <Button size="sm"><Plus size={16} className="mr-2"/> Register Club</Button>
                <SegmentedControl options={['List', 'Map']} value={viewMode} onChange={setViewMode} />
             </div>
          </div>
       </div>

       {/* Module Description */}
       <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-3 text-sm text-slate-600 mb-4">
          <p><strong>Club Registry Management:</strong> Monitor club statuses, view geographic distribution, and access detailed athlete rosters for each affiliated center.</p>
       </div>

       {/* Overview Charts */}
       {viewMode === 'List' && (
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 p-6">
               <h3 className="font-bold text-slate-900 mb-6">Athletes per Club (Top 10)</h3>
               <div className="h-64">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={athletesPerClub}>
                       <CartesianGrid strokeDasharray="3 3" vertical={false} />
                       <XAxis dataKey="name" tick={{fontSize: 10}} interval={0} />
                       <YAxis />
                       <RechartsTooltip />
                       <Bar dataKey="Athletes" fill="#0f172a" radius={[4, 4, 0, 0]} barSize={20} />
                    </BarChart>
                 </ResponsiveContainer>
               </div>
            </Card>
            <PieChartWidget title="Club Status" data={statusData} colors={['#10b981', '#fbbf24', '#ef4444']} />
         </div>
       )}

       {viewMode === 'List' ? (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_CLUBS.map(club => (
               <Card key={club.id} className="cursor-pointer hover:shadow-md transition-shadow">
                  <div onClick={() => setSelectedClub(club)} className="p-6">
                     <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500">
                           <Building2 size={24} />
                        </div>
                        <StatusBadge status={club.status} />
                     </div>
                     <h3 className="font-bold text-lg text-slate-900 mb-1 truncate">{club.name}</h3>
                     <p className="text-sm text-slate-500 mb-4 flex items-center gap-1"><MapPin size={12}/> {club.city}</p>
                     
                     <div className="flex justify-between text-sm py-3 border-t border-slate-100 mt-4">
                        <div className="text-center">
                           <span className="block font-bold text-slate-900">{club.activeAthletes}</span>
                           <span className="text-xs text-slate-400">Athletes</span>
                        </div>
                        <div className="text-center">
                           <span className="block font-bold text-slate-900">{club.licenseNumber}</span>
                           <span className="text-xs text-slate-400">License</span>
                        </div>
                        <div className="text-center">
                           <span className="block font-bold text-slate-900">{club.renewalDate.split('-')[0]}</span>
                           <span className="text-xs text-slate-400">Renewal</span>
                        </div>
                     </div>
                  </div>
               </Card>
            ))}
         </div>
       ) : (
         <div className="w-full h-[600px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200 relative z-0" ref={mapContainerRef}>
            {/* Map is injected here by Leaflet */}
         </div>
       )}
    </div>
  );
};
