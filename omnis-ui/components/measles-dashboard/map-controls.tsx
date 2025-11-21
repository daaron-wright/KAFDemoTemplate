"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";
import { useMapContext } from "./map-context";

export function MapControls() {
  const [showSimpleLegend, setShowSimpleLegend] = useState(false); // Toggle simple legend

  // Toggle the simple legend
  const toggleLegend = () => {
    setShowSimpleLegend(!showSimpleLegend);
  };

  return (
    <>
      {/* Legend Toggle Button */}
      <div className="absolute top-4 right-4 z-[1000]">
        <button
          onClick={toggleLegend}
          className="flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-md border border-gold/30 hover:bg-gold/10 transition-colors text-gold"
          aria-expanded={showSimpleLegend}
          aria-label="Toggle map legend"
        >
          <Info className="h-5 w-5" />
        </button>
      </div>

      {/* Simple Legend Popup */}
      {showSimpleLegend && (
        <div className="absolute top-16 right-4 z-[1000] w-[220px]">
          <Card className="bg-white/95 backdrop-blur-md border-gold/30 shadow-md rounded-xl overflow-hidden">
            <div className="divide-y divide-gray-100">
              <div className="p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-red-500 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Measles Cases</span>
              </div>

              <div className="p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Social Media</span>
              </div>

              <div className="p-3 flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-400 flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Vaccination Rates</span>
              </div>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}
