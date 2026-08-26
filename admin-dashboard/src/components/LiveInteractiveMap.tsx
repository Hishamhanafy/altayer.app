'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  type: 'pickup' | 'destination' | 'driver' | 'parthona' | 'rider' | 'heat';
  rating?: number;
  car?: string;
  speed?: number;
}

interface LiveInteractiveMapProps {
  center?: [number, number]; // [lat, lng] Default Cairo: [30.0444, 31.2357]
  zoom?: number;
  markers?: MapMarker[];
  routePolyline?: [number, number][];
  height?: string;
  interactive?: boolean;
  onMapClick?: (lat: number, lng: number) => void;
  showLayerControl?: boolean;
}

export default function LiveInteractiveMap({
  center = [30.0444, 31.2357], // Cairo center
  zoom = 13,
  markers = [],
  routePolyline = [],
  height = '320px',
  interactive = true,
  onMapClick,
  showLayerControl = true,
}: LiveInteractiveMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const polylineLayerRef = useRef<any>(null);
  const [mapType, setMapType] = useState<'streets' | 'satellite' | 'dark'>('dark');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function initMap() {
      if (!mapContainerRef.current || mapInstanceRef.current) return;

      // Import Leaflet dynamically in browser
      const L = (await import('leaflet')).default;

      // Leaflet CSS Injection
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      const map = L.map(mapContainerRef.current, {
        center,
        zoom,
        zoomControl: false,
        dragging: interactive,
        touchZoom: interactive,
        scrollWheelZoom: interactive,
        doubleClickZoom: interactive,
        attributionControl: false,
      });

      // Layer providers
      const tileLayers = {
        dark: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 19,
          subdomains: 'abcd',
        }),
        streets: L.tileLayer('https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
          maxZoom: 20,
        }),
        satellite: L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
          maxZoom: 20,
        }),
      };

      tileLayers[mapType].addTo(map);

      // Add Zoom Control at bottom right
      if (interactive) {
        L.control.zoom({ position: 'bottomright' }).addTo(map);
      }

      // Layer groups for markers & routes
      const markersLayer = L.layerGroup().addTo(map);
      const polylineLayer = L.layerGroup().addTo(map);

      mapInstanceRef.current = { map, L, tileLayers, activeLayer: tileLayers[mapType] };
      markersLayerRef.current = markersLayer;
      polylineLayerRef.current = polylineLayer;

      if (onMapClick) {
        map.on('click', (e: any) => {
          onMapClick(e.latlng.lat, e.latlng.lng);
        });
      }

      if (isMounted) setIsLoaded(true);
    }

    initMap();

    return () => {
      isMounted = false;
      if (mapInstanceRef.current?.map) {
        mapInstanceRef.current.map.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update Layer when mapType changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const { map, tileLayers, activeLayer } = mapInstanceRef.current;
    if (activeLayer) map.removeLayer(activeLayer);
    const newLayer = tileLayers[mapType];
    newLayer.addTo(map);
    mapInstanceRef.current.activeLayer = newLayer;
  }, [mapType]);

  // Update Center / Zoom
  useEffect(() => {
    if (mapInstanceRef.current?.map) {
      mapInstanceRef.current.map.setView(center, zoom);
    }
  }, [center[0], center[1], zoom]);

  // Update Markers & Polyline
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current || !polylineLayerRef.current) return;
    const { L, map } = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;
    const polylineLayer = polylineLayerRef.current;

    markersLayer.clearLayers();
    polylineLayer.clearLayers();

    // Render Markers
    markers.forEach((m) => {
      let iconHtml = '';
      let className = '';

      if (m.type === 'pickup') {
        iconHtml = `<div style="background:#f59e0b; color:#020617; font-weight:900; font-size:12px; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid #ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.5); transform:translate(-50%, -50%);">📍</div>`;
      } else if (m.type === 'destination') {
        iconHtml = `<div style="background:#10b981; color:#ffffff; font-weight:900; font-size:12px; width:32px; height:32px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:3px solid #ffffff; box-shadow:0 4px 12px rgba(0,0,0,0.5); transform:translate(-50%, -50%);">🏁</div>`;
      } else if (m.type === 'parthona') {
        iconHtml = `<div style="background:#ec4899; color:#ffffff; font-size:16px; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #ffffff; box-shadow:0 4px 12px rgba(236,72,153,0.6); transform:translate(-50%, -50%); animation: pulse 2s infinite;">🌸</div>`;
      } else if (m.type === 'driver') {
        iconHtml = `<div style="background:#1e1b4b; color:#fbbf24; font-size:15px; width:34px; height:34px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2.5px solid #fbbf24; box-shadow:0 4px 12px rgba(0,0,0,0.6); transform:translate(-50%, -50%);">🚗</div>`;
      } else {
        iconHtml = `<div style="background:#3b82f6; color:#ffffff; font-size:14px; width:28px; height:28px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid #ffffff; transform:translate(-50%, -50%);">👤</div>`;
      }

      const customIcon = L.divIcon({
        html: iconHtml,
        className: 'custom-map-icon',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon }).addTo(markersLayer);
      
      const popupContent = `
        <div style="font-family:'Cairo',sans-serif; text-align:right; direction:rtl; padding:4px 2px; min-width:140px;">
          <div style="font-weight:bold; font-size:12px; color:#0f172a;">${m.title}</div>
          ${m.car ? `<div style="font-size:10px; color:#64748b;">${m.car}</div>` : ''}
          ${m.rating ? `<div style="font-size:10px; color:#f59e0b; font-weight:bold;">⭐ ${m.rating}</div>` : ''}
        </div>
      `;
      marker.bindPopup(popupContent);
    });

    // Render Route Polyline
    if (routePolyline && routePolyline.length > 1) {
      const poly = L.polyline(routePolyline, {
        color: '#f59e0b',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(polylineLayer);

      // Fit bounds to polyline
      map.fitBounds(poly.getBounds(), { padding: [40, 40] });
    }
  }, [markers, routePolyline]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-inner" style={{ height }}>
      {/* Map Canvas */}
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Layer Controls Switcher */}
      {showLayerControl && (
        <div className="absolute top-3 left-3 z-[400] flex items-center gap-1 bg-slate-900/90 backdrop-blur-md border border-slate-700/60 p-1 rounded-xl shadow-lg text-[10px] font-bold text-slate-200" dir="rtl">
          <button
            type="button"
            onClick={() => setMapType('dark')}
            className={`px-2 py-1 rounded-lg transition ${mapType === 'dark' ? 'bg-amber-500 text-slate-950 font-black' : 'hover:bg-slate-800'}`}
          >
            🌙 ليلي ملكي
          </button>
          <button
            type="button"
            onClick={() => setMapType('streets')}
            className={`px-2 py-1 rounded-lg transition ${mapType === 'streets' ? 'bg-amber-500 text-slate-950 font-black' : 'hover:bg-slate-800'}`}
          >
            🗺️ شوارع جوجل
          </button>
          <button
            type="button"
            onClick={() => setMapType('satellite')}
            className={`px-2 py-1 rounded-lg transition ${mapType === 'satellite' ? 'bg-amber-500 text-slate-950 font-black' : 'hover:bg-slate-800'}`}
          >
            🛰️ قمر صناعي
          </button>
        </div>
      )}

      {/* GPS Locate Button */}
      <div className="absolute bottom-3 left-3 z-[400]">
        <button
          type="button"
          onClick={() => {
            if (navigator.geolocation && mapInstanceRef.current?.map) {
              navigator.geolocation.getCurrentPosition(
                (pos) => {
                  mapInstanceRef.current.map.setView([pos.coords.latitude, pos.coords.longitude], 15);
                },
                () => {
                  // Fallback Cairo Center
                  mapInstanceRef.current.map.setView([30.0444, 31.2357], 14);
                }
              );
            }
          }}
          className="p-2 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-amber-400 rounded-xl shadow-lg transition flex items-center justify-center"
          title="تحديد موقعي الحالي"
        >
          🎯
        </button>
      </div>
    </div>
  );
}