"use client";

import { useMapContext } from "./map-context";

export const MapLegend = () => {
  const {
    showRiskHeatmap,
    setShowRiskHeatmap,
    showVaccinationHeatmap,
    setShowVaccinationHeatmap,
    showLegend,
    toggleLegend,
  } = useMapContext();

  return (
    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-md border border-gold/30 shadow-md z-10 transition-all duration-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Map Legend</h3>
        <button
          onClick={toggleLegend}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={
            showLegend ? "Hide legend details" : "Show legend details"
          }
        >
          {showLegend ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          )}
        </button>
      </div>

      {showLegend && (
        <div className="space-y-2">
          <div className="flex items-center text-xs">
            <div className="w-3 h-3 rounded-full bg-gold mr-2"></div>
            <span>Selected Region</span>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={showRiskHeatmap}
                onChange={() => setShowRiskHeatmap(!showRiskHeatmap)}
                className="mr-1 w-3 h-3"
              />
              <div className="w-3 h-3 rounded-full bg-red-500 mr-1"></div>
              <span>Measles Cases</span>
            </label>
          </div>

          <div className="flex items-center gap-2">
            <label className="flex items-center text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={showVaccinationHeatmap}
                onChange={() =>
                  setShowVaccinationHeatmap(!showVaccinationHeatmap)
                }
                className="mr-1 w-3 h-3"
              />
              <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
              <span>Vaccination Centers</span>
            </label>
          </div>

          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="flex items-center text-xs">
              <div className="mr-2 flex items-center">
                <div className="w-3 h-3 rounded-full bg-gray-500"></div>
                <span className="ml-1">City</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
