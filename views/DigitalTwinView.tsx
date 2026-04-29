import React, { useEffect, useRef, useState } from 'react';
import { 
  Compass, Maximize2, Activity, 
  AlertCircle, Zap, Play, Pause,
  Settings, Database, SlidersHorizontal, Crosshair,
  ShieldCheck, ArrowRight, Radio, Cpu, Layers, Search
} from 'lucide-react';
import { Card, Button } from '../components/CoreUI';
import { CLOUD_ENERGI_ASSETS } from '../data/mockGeoData';
import { DigitalTwinSidebar } from '../components/DigitalTwinSidebar';
import { GasAsset } from '../types';

declare global {
  interface Window { L: any; }
}

interface DigitalTwinViewProps {
  initialFocusAssetId?: string;
  onClearFocus?: () => void;
}

export const DigitalTwinView: React.FC<DigitalTwinViewProps> = ({ initialFocusAssetId, onClearFocus }) => {
  const mapRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAsset, setSelectedAsset] = useState<GasAsset | null>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>(['STATION', 'CUSTOMER_SITE', 'TRUCK']);
  const [isPlaybackRunning, setIsPlaybackRunning] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current || !window.L || mapRef.current) return;

    // Center map on UAE (KEZAD/Dubai corridor)
    const map = window.L.map(containerRef.current, {
      center: [24.6, 54.75], 
      zoom: 9,
      zoomControl: false,
      attributionControl: false
    });

    // Use a high-performance tile layer
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}{r}.png').addTo(map);
    mapRef.current = map;

    // Force map to recognize container size after render to prevent grey tiles
    setTimeout(() => {
      map.invalidateSize();
    }, 200);

    updateMarkers();

    // Check for initial focus
    if (initialFocusAssetId) {
      const asset = CLOUD_ENERGI_ASSETS.find(a => a.id === initialFocusAssetId);
      if (asset) {
        setSelectedAsset(asset);
        map.flyTo([asset.location.lat, asset.location.lng], 12, { duration: 1.5 });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Update Markers based on status and filters
  const updateMarkers = () => {
    if (!mapRef.current) return;
    
    mapRef.current.eachLayer((layer: any) => {
      if (layer instanceof window.L.Marker) {
        mapRef.current.removeLayer(layer);
      }
    });

    CLOUD_ENERGI_ASSETS.filter(a => activeLayers.includes(a.type as string)).forEach(asset => {
      const getStatusColor = (status: string) => {
        if (status === 'CRITICAL') return '#ef4444'; // rose-500
        if (status === 'WARNING') return '#f59e0b';  // amber-500
        return '#10b981'; // emerald-500
      };

      const color = getStatusColor(asset.status);
      const isCritical = asset.status === 'CRITICAL';

      const markerHtml = `
        <div class="relative flex items-center justify-center">
          <div style="width:16px; height:16px; background:${color}; border:2px solid white; border-radius:50%; box-shadow:0 0 12px ${color}88"></div>
          ${isCritical ? `<div class="absolute w-8 h-8 rounded-full border-2 border-red-500 animate-ping opacity-20"></div>` : ''}
          <div class="absolute bottom-5 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none">
            <span class="text-[10px] font-bold text-slate-800 uppercase tracking-tight">${asset.name}</span>
          </div>
        </div>
      `;

      const icon = window.L.divIcon({
        className: 'asset-marker-circle group',
        html: markerHtml,
        iconSize: [16, 16]
      });

      const marker = window.L.marker([asset.location.lat, asset.location.lng], { icon }).addTo(mapRef.current);
      marker.on('click', () => {
        setSelectedAsset(asset);
        mapRef.current.flyTo([asset.location.lat, asset.location.lng], 12, { duration: 1 });
      });
    });
  };

  useEffect(() => {
    updateMarkers();
  }, [activeLayers, CLOUD_ENERGI_ASSETS]);

  return (
    <div className="h-[calc(100vh-140px)] flex gap-6 animate-in fade-in duration-500">
      {/* Map Content Area */}
      <div className="flex-1 flex flex-col gap-4">
        {/* Simple Control Bar */}
        <div className="flex justify-between items-center bg-white/70 backdrop-blur-md p-2 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2">
            {['STATION', 'CUSTOMER_SITE', 'TRUCK'].map(l => (
              <button 
                key={l}
                onClick={() => setActiveLayers(prev => prev.includes(l) ? prev.filter(x => x !== l) : [...prev, l])}
                className={`px-4 py-1.5 text-[10px] font-bold uppercase rounded-xl transition-all flex items-center gap-2 ${activeLayers.includes(l) ? 'bg-slate-900 text-white' : 'text-slate-400 hover:bg-slate-100'}`}
              >
                {l.replace('_', ' ')}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 pr-2">
            <Search size={16} className="text-slate-400" />
            <input type="text" placeholder="Locate Asset..." className="text-[10px] font-bold bg-transparent outline-none w-32 uppercase tracking-widest" />
          </div>
        </div>

        <div className="flex-1 relative bg-white rounded-[32px] overflow-hidden border border-slate-200 shadow-xl">
          <div ref={containerRef} className="absolute inset-0 z-0" />
          
          {/* Timeline Controller */}
          <div className="absolute bottom-6 left-6 right-6 z-10 flex justify-center pointer-events-none">
            <div className="w-full max-w-2xl pointer-events-auto">
              <Card className="p-3 bg-white/95 backdrop-blur-xl border-slate-200 shadow-2xl flex items-center gap-6">
                <button 
                  onClick={() => setIsPlaybackRunning(!isPlaybackRunning)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-900 text-white rounded-xl hover:bg-blue-600 transition-colors"
                >
                  {isPlaybackRunning ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                </button>
                <div className="flex-1 space-y-1.5">
                  <div className="flex justify-between text-[9px] font-black text-slate-400 uppercase tracking-widest px-1">
                    <span>-24H HISTORY</span>
                    <span className="text-blue-600">SYNCED: 08:07 PM</span>
                    <span>LIVE FEED</span>
                  </div>
                  <div className="h-1 bg-slate-100 rounded-full relative overflow-hidden group cursor-pointer">
                    <div className="h-full bg-blue-500 w-[92%] rounded-full relative" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Right Hand Side Sidebar */}
      <div className="w-[420px] h-full animate-in slide-in-from-right duration-500">
        <DigitalTwinSidebar 
          selectedAsset={selectedAsset} 
          onDeselect={() => { setSelectedAsset(null); onClearFocus?.(); }}
        />
      </div>
    </div>
  );
};