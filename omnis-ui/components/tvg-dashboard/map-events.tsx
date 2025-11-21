"use client";

import { useEffect } from "react";
import { useMapEvents } from "react-leaflet";
import { useMapContext } from "./map-context";

interface MapEventsProps {
  onZoomChange?: (zoom: number) => void;
  onMapClick?: (e: L.LeafletMouseEvent) => void;
}

export default function MapEvents({
  onZoomChange,
  onMapClick,
}: MapEventsProps) {
  const { setSelectedRegion } = useMapContext();

  const map = useMapEvents({
    zoom: () => {
      const zoom = map.getZoom();
      if (onZoomChange) {
        onZoomChange(zoom);
      }
    },
    click: (e) => {
      // Clear selected region when clicking on empty map
      setSelectedRegion(null);

      if (onMapClick) {
        onMapClick(e);
      }
    },
  });

  useEffect(() => {
    // Add any additional map event setup here
    return () => {
      // Cleanup any event listeners if needed
    };
  }, [map]);

  return null;
}
