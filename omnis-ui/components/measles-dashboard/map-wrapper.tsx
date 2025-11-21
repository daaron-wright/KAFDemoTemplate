"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
} from "react-leaflet";
import L from "leaflet";

// Define props interface
export interface MapWrapperProps {
  cases: Array<{
    lat: number;
    lng: number;
    location: string;
    cases: number;
    date: string;
  }>;
  vaccinationCenters: Array<{
    id: string;
    name: string;
    position: [number, number];
    capacity: number;
  }>;
  showRiskHeatmap: boolean;
  showVaccinationHeatmap: boolean;
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  setActiveDataPoint: (point: any) => void;
  mapId: string;
}

// Create a static Map component that will only be mounted once
const MapWrapper = ({
  cases,
  vaccinationCenters,
  showRiskHeatmap,
  showVaccinationHeatmap,
  selectedRegion,
  setSelectedRegion,
  setActiveDataPoint,
  mapId,
}: MapWrapperProps) => {
  // Track if map has been created
  const [isMapCreated, setIsMapCreated] = useState(false);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const mapInitializedRef = useRef(false);

  // Generate a truly unique and persistent ID for this specific map instance
  const uniqueMapId = useRef(
    `map-${mapId}-${Math.random().toString(36).substring(2, 9)}`
  );

  // Function to initialize the map
  const initializeMap = useCallback(() => {
    if (typeof window === "undefined") return;

    // Fix Leaflet icon issues
    if (!mapInitializedRef.current) {
      const iconDefault = L.Icon.Default.prototype as any;
      delete iconDefault._getIconUrl;

      L.Icon.Default.mergeOptions({
        iconUrl: "/images/marker-icon.png",
        iconRetinaUrl: "/images/marker-icon.png",
        shadowUrl: "/images/marker-shadow.png",
      });

      mapInitializedRef.current = true;
    }

    // Create the map only if it doesn't exist yet and container exists
    if (
      !mapInstanceRef.current &&
      document.getElementById(uniqueMapId.current)
    ) {
      try {
        console.log(`Creating new map with ID: ${uniqueMapId.current}`);

        // Create the map instance
        const map = L.map(uniqueMapId.current, {
          center: [24.4539, 54.3773],
          zoom: 7,
        });

        // Add the tile layer
        L.tileLayer(
          "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
          }
        ).addTo(map);

        mapInstanceRef.current = map;
        setIsMapCreated(true);
        console.log("Map is ready");
      } catch (error) {
        console.error("Error creating map:", error);
      }
    }
  }, [uniqueMapId]);

  // Update map markers when data changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isMapCreated) return;

    // Clear existing markers
    map.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.CircleMarker) {
        map.removeLayer(layer);
      }
    });

    // Add case markers
    cases.forEach((point, index) => {
      // Add heatmap layers if enabled
      if (showRiskHeatmap) {
        const heatCircle = L.circleMarker([point.lat, point.lng], {
          radius: Math.min(25, Math.max(10, point.cases * 1.5)),
          fillColor: "#FF5500",
          color: "transparent",
          fillOpacity: 0.15,
          weight: 0,
        }).addTo(map);
      }

      // Add case markers
      const caseMarker = L.circleMarker([point.lat, point.lng], {
        radius: Math.min(15, Math.max(4, point.cases / 3)),
        fillColor: "#ff5233",
        color: "#ff2200",
        fillOpacity: 0.6,
        weight: 1,
      }).addTo(map);

      caseMarker.bindPopup(`
        <div class="p-1">
          <h3 class="font-bold text-sm">${point.location}</h3>
          <p class="text-xs">Cases: ${point.cases}</p>
          <p class="text-xs">Date: ${new Date(
            point.date
          ).toLocaleDateString()}</p>
        </div>
      `);

      caseMarker.on("click", () => {
        setActiveDataPoint(point);
      });
    });

    // Add vaccination centers if enabled
    if (showVaccinationHeatmap) {
      vaccinationCenters.forEach((center) => {
        const marker = L.marker(center.position).addTo(map);

        marker.bindPopup(`
          <div class="p-1">
            <h3 class="font-bold text-sm">${center.name}</h3>
            <p class="text-xs">Daily Capacity: ${center.capacity}</p>
          </div>
        `);

        marker.on("click", () => {
          setActiveDataPoint({
            id: center.id,
            name: center.name,
            capacity: center.capacity,
            type: "vaccinationCenter",
          });
        });
      });
    }
  }, [
    cases,
    vaccinationCenters,
    showRiskHeatmap,
    showVaccinationHeatmap,
    isMapCreated,
    setActiveDataPoint,
  ]);

  // Initialize map on mount and clean up on unmount
  useEffect(() => {
    // Set a small timeout to ensure DOM is ready
    const timer = setTimeout(() => {
      initializeMap();
    }, 200);

    // Clean up function
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        console.log("Removing map instance");
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        setIsMapCreated(false);
      }
    };
  }, [initializeMap]);

  // Return just the map container div
  return (
    <div
      id={uniqueMapId.current}
      className="w-full h-full relative"
      style={{ zIndex: 1 }}
    />
  );
};

export default MapWrapper;
