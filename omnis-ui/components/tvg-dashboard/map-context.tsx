"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface MapContextType {
  selectedRegion: string | null;
  setSelectedRegion: (region: string | null) => void;
  showRiskHeatmap: boolean;
  setShowRiskHeatmap: (show: boolean) => void;
  showVaccinationHeatmap: boolean;
  setShowVaccinationHeatmap: (show: boolean) => void;
  activeDataPoint: any | null;
  setActiveDataPoint: (point: any | null) => void;
  visibleLayers: {
    cases: boolean;
    social: boolean;
    vaccine: boolean;
  };
  toggleLayer: (layer: string) => void;
  showLegend: boolean;
  toggleLegend: () => void;
}

const defaultContext: MapContextType = {
  selectedRegion: null,
  setSelectedRegion: () => {},
  showRiskHeatmap: true,
  setShowRiskHeatmap: () => {},
  showVaccinationHeatmap: false,
  setShowVaccinationHeatmap: () => {},
  activeDataPoint: null,
  setActiveDataPoint: () => {},
  visibleLayers: {
    cases: true,
    social: false,
    vaccine: false,
  },
  toggleLayer: () => {},
  showLegend: true,
  toggleLegend: () => {},
};

const MapContext = createContext<MapContextType>(defaultContext);

export const useMapContext = () => useContext(MapContext);

export const MapProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(true);
  const [showVaccinationHeatmap, setShowVaccinationHeatmap] = useState(false);
  const [activeDataPoint, setActiveDataPoint] = useState<any | null>(null);
  const [visibleLayers, setVisibleLayers] = useState({
    cases: true,
    social: false,
    vaccine: false,
  });
  const [showLegend, setShowLegend] = useState(true);

  const toggleLayer = (layer: string) => {
    setVisibleLayers((prev) => ({
      ...prev,
      [layer]: !prev[layer as keyof typeof prev],
    }));
  };

  const toggleLegend = () => {
    setShowLegend((prev) => !prev);
  };

  return (
    <MapContext.Provider
      value={{
        selectedRegion,
        setSelectedRegion,
        showRiskHeatmap,
        setShowRiskHeatmap,
        showVaccinationHeatmap,
        setShowVaccinationHeatmap,
        activeDataPoint,
        setActiveDataPoint,
        visibleLayers,
        toggleLayer,
        showLegend,
        toggleLegend,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export type { MapContextType };
