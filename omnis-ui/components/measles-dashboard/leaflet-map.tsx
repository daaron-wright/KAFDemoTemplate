"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { divIcon } from "leaflet";

// Define types for our props
interface LeafletMapProps {
  center: [number, number];
  zoom: number;
  regions: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    risk: string;
    cases: number;
  }>;
  cases: Array<{
    id: string;
    lat: number;
    lng: number;
    confirmed: boolean;
    active: boolean;
    age: number;
    timeline: number;
  }>;
  vaccinationCenters: Array<{
    id: string;
    name: string;
    lat: number;
    lng: number;
    type: string;
    dailyCapacity: number;
  }>;
  showRiskHeatmap: boolean;
  showVaccinationHeatmap: boolean;
  selectedRegion: string | null;
  onRegionSelect: (region: string | null) => void;
  onMarkerSelect: (point: any) => void;
}

// Use memo to prevent unnecessary re-renders of the entire component
function LeafletMapComponent(props: LeafletMapProps) {
  const {
    center,
    zoom,
    regions,
    cases,
    vaccinationCenters,
    showRiskHeatmap,
    showVaccinationHeatmap,
    selectedRegion,
    onRegionSelect,
    onMarkerSelect,
  } = props;

  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapInstanceRef = useRef<any>(null);
  const [isMapMounted, setIsMapMounted] = useState(true);

  // Create a stable ID for the map container to prevent rerenders
  const mapId = useRef(
    `leaflet-map-${Math.random().toString(36).substring(2, 9)}`
  );

  // Track layers to avoid recreating the map
  const layersRef = useRef<{
    regionMarkers: any[];
    caseMarkers: any[];
    socialMarkers: any[];
    vaccinationMarkers: any[];
    legend: any | null;
  }>({
    regionMarkers: [],
    caseMarkers: [],
    socialMarkers: [],
    vaccinationMarkers: [],
    legend: null,
  });

  const prevCasesRef = useRef<typeof cases>([]);
  const casesJsonRef = useRef<string>("");

  // Mock social data (would typically come from props)
  const socialSentiments = [
    {
      id: "social1",
      lat: 25.3048,
      lng: 55.3708,
      volume: 35,
      sentiment: 0.5,
      timeline: 3,
    },
    {
      id: "social2",
      lat: 24.5539,
      lng: 54.4773,
      volume: 55,
      sentiment: -0.3,
      timeline: 5,
    },
    {
      id: "social3",
      lat: 25.4463,
      lng: 55.5209,
      volume: 48,
      sentiment: 0.2,
      timeline: 7,
    },
    {
      id: "social4",
      lat: 25.6111,
      lng: 55.6304,
      volume: 60,
      sentiment: -0.5,
      timeline: 9,
    },
  ];

  // Function to update case markers without recreating the map
  const updateCaseMarkers = useCallback(
    async (L: any, map: any, visibleCases: typeof cases) => {
      if (!map) return;

      try {
        // Remove existing case markers
        layersRef.current.caseMarkers.forEach((marker) => {
          marker.remove();
        });
        layersRef.current.caseMarkers = [];

        // Remove existing social markers
        layersRef.current.socialMarkers.forEach((marker) => {
          marker.remove();
        });
        layersRef.current.socialMarkers = [];

        // Only add case markers if heatmap is enabled
        if (showRiskHeatmap) {
          // Add new case markers
          visibleCases.forEach((casePoint) => {
            // Scale markers based on timeline (more recent cases are larger)
            const timelineScaleFactor = casePoint.timeline / 10; // Normalize to 0-1 range assuming max timeline is 10
            const baseSize = casePoint.active ? 6 : 4;

            // Enhanced formula that makes more recent cases significantly larger
            const timeMultiplier = Math.pow(1.5, timelineScaleFactor * 10);
            const sizeWithTimeline =
              baseSize + timelineScaleFactor * 10 * timeMultiplier;

            // Use CircleMarker with square root scaling
            const circleMarker = L.circleMarker(
              [casePoint.lat, casePoint.lng],
              {
                radius: Math.sqrt(sizeWithTimeline) * 2,
                fillColor: casePoint.confirmed
                  ? "rgba(239, 68, 68, 0.8)"
                  : "rgba(251, 146, 60, 0.8)",
                color: casePoint.confirmed
                  ? "rgba(248, 113, 113, 0.4)"
                  : "rgba(251, 146, 60, 0.4)",
                weight: 2,
                fillOpacity: 0.7,
                className: casePoint.timeline > 7 ? "pulsing-marker" : "", // Add pulsing effect to recent cases
              }
            ).addTo(map);

            // Add popup
            const popupContent = `
            <div class="p-1">
              <h3 class="font-semibold text-xs">
                ${casePoint.confirmed ? "Confirmed Case" : "Suspected Case"}
              </h3>
              <p class="text-xs text-gray-600 mt-1">
                Status: 
                <span class="font-medium ${
                  casePoint.active ? "text-red-600" : "text-green-600"
                }">
                  ${casePoint.active ? "Active" : "Recovered"}
                </span>
              </p>
              <p class="text-xs text-gray-600">
                Age: <span class="font-medium">${casePoint.age}</span>
              </p>
            </div>
          `;
            circleMarker.bindPopup(popupContent);

            // Handle click
            circleMarker.on("click", () => {
              onMarkerSelect(casePoint);
            });

            // Store reference to the marker
            layersRef.current.caseMarkers.push(circleMarker);
          });
        }

        // Update social sentiment markers based on visible cases
        const maxVisibleTimeline =
          visibleCases.length > 0
            ? Math.max(...visibleCases.map((c) => c.timeline))
            : 0;

        socialSentiments.forEach((socialPoint) => {
          if (socialPoint.timeline <= maxVisibleTimeline) {
            const timelineScaleFactor = socialPoint.timeline / 10;

            // Size based on both volume and timeline - more recent mentions are larger
            const size =
              Math.sqrt(socialPoint.volume) * (1 + timelineScaleFactor);

            // Use CircleMarker with different colors based on sentiment
            const circleMarker = L.circleMarker(
              [socialPoint.lat, socialPoint.lng],
              {
                radius: size,
                fillColor:
                  socialPoint.sentiment > 0
                    ? "rgba(59, 130, 246, 0.8)" // Blue for positive sentiment
                    : "rgba(251, 113, 133, 0.8)", // Pink for negative sentiment
                color:
                  socialPoint.sentiment > 0
                    ? "rgba(96, 165, 250, 0.4)"
                    : "rgba(251, 113, 133, 0.4)",
                weight: 2,
                fillOpacity: 0.6,
              }
            ).addTo(map);

            // Add popup for social sentiment
            const popupContent = `
            <div class="p-1">
              <h3 class="font-semibold text-xs">Social Media Activity</h3>
              <p class="text-xs text-gray-600 mt-1">
                Volume: <span class="font-medium">${
                  socialPoint.volume
                }</span> mentions
              </p>
              <p class="text-xs text-gray-600">
                Sentiment: <span class="font-medium ${
                  socialPoint.sentiment > 0 ? "text-blue-600" : "text-pink-600"
                }">
                  ${socialPoint.sentiment > 0 ? "Positive" : "Negative"}
                </span>
              </p>
            </div>
          `;
            circleMarker.bindPopup(popupContent);

            // Handle click
            circleMarker.on("click", () => {
              onMarkerSelect(socialPoint);
            });

            // Store reference to the marker
            layersRef.current.socialMarkers.push(circleMarker);
          }
        });
      } catch (error) {
        console.error("Error updating markers:", error);
      }
    },
    [showRiskHeatmap, onMarkerSelect]
  );

  // Initialize the map manually, only once
  useEffect(() => {
    setIsMapMounted(true);
    let isCleanedUp = false;

    // Function to initialize the map
    const initializeMap = async () => {
      try {
        // Import both the leaflet library and react-leaflet components
        const L = await import("leaflet");

        // Handle Leaflet CSS import dynamically to avoid import errors
        const linkEl = document.querySelector('link[href*="leaflet.css"]');
        if (!linkEl) {
          const newLinkEl = document.createElement("link");
          newLinkEl.rel = "stylesheet";
          newLinkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
          document.head.appendChild(newLinkEl);
        }

        // Fix Leaflet's default icon paths
        delete (L.Icon.Default.prototype as any)._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          shadowUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
        });

        // Wait to ensure DOM is ready and component still mounted
        if (!mapRef.current || isCleanedUp || !isMapMounted) return;

        // Safely clean up any existing map instance first
        if (mapInstanceRef.current) {
          console.log("Cleaning up previous map instance");
          mapInstanceRef.current.remove();
          mapInstanceRef.current = null;
        }

        // Make sure the container is clear of any previous Leaflet instances
        if (mapRef.current) {
          const container = L.DomUtil.get(mapRef.current);
          if (container) {
            // Reset the _leaflet_id to allow reuse
            if ((container as any)._leaflet_id) {
              (container as any)._leaflet_id = null;
            }
          }
        }

        // Create the map instance (only once)
        console.log("Creating new map instance");
        const map = L.map(mapRef.current, {
          zoomControl: false, // Disable default zoom control
          attributionControl: true, // Keep attribution
          fadeAnimation: true, // Enable fade animations
          zoomAnimation: true, // Enable zoom animations
          markerZoomAnimation: true, // Enable marker animations during zoom
        }).setView(center, zoom);

        mapInstanceRef.current = map;

        // Add tile layer (only once)
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Custom zoom control in a better position
        L.control
          .zoom({
            position: "bottomright",
          })
          .addTo(map);

        // Add region markers (static, only once)
        regions.forEach((region) => {
          // Use CircleMarker with square root scaling for bubble size
          const circleMarker = L.circleMarker([region.lat, region.lng], {
            radius: Math.sqrt(region.cases) * 2,
            fillColor:
              region.id === selectedRegion
                ? "rgba(234, 179, 8, 0.8)"
                : "rgba(75, 85, 99, 0.8)",
            color:
              region.id === selectedRegion
                ? "rgba(234, 179, 8, 0.4)"
                : "rgba(75, 85, 99, 0.4)",
            weight: 2,
            fillOpacity: 0.7,
          }).addTo(map);

          // Add popup
          const popupContent = `
            <div class="p-1">
              <h3 class="font-semibold text-sm">${region.name}</h3>
              <p class="text-xs text-gray-600 mt-1">
                Risk Level: <span class="font-medium text-red-600">${
                  region.risk
                }</span>
              </p>
              ${
                region.cases
                  ? `<p class="text-xs text-gray-600">
                Cases: <span class="font-medium">${region.cases}</span>
              </p>`
                  : ""
              }
            </div>
          `;
          circleMarker.bindPopup(popupContent);

          // Handle click
          circleMarker.on("click", () => {
            onRegionSelect(selectedRegion === region.id ? null : region.id);
          });

          // Store reference to the marker
          layersRef.current.regionMarkers.push(circleMarker);
        });

        // Initial render of case markers
        await updateCaseMarkers(L, map, cases);

        // Initial render of vaccination markers (static, only once)
        if (showVaccinationHeatmap) {
          vaccinationCenters.forEach((center) => {
            // Use CircleMarker with square root scaling for vaccine centers
            const capacity = center.dailyCapacity / 50;

            // Determine color based on capacity (using green with different shades)
            let fillColor, borderColor;
            if (center.dailyCapacity > 80) {
              fillColor = "rgba(16, 185, 129, 0.8)"; // Green for high capacity
              borderColor = "rgba(5, 150, 105, 0.4)";
            } else if (center.dailyCapacity > 60) {
              fillColor = "rgba(250, 204, 21, 0.8)"; // Yellow for medium capacity
              borderColor = "rgba(234, 179, 8, 0.4)";
            } else {
              fillColor = "rgba(59, 130, 246, 0.8)"; // Blue for lower capacity
              borderColor = "rgba(96, 165, 250, 0.4)";
            }

            const circleMarker = L.circleMarker([center.lat, center.lng], {
              radius: Math.sqrt(capacity) * 2,
              fillColor: fillColor,
              color: borderColor,
              weight: 2,
              fillOpacity: 0.7,
            }).addTo(map);

            // Add popup
            const popupContent = `
              <div class="p-1">
                <h3 class="font-semibold text-xs">${center.name}</h3>
                <p class="text-xs text-gray-600 mt-1">
                  Type: <span class="font-medium">${center.type}</span>
                </p>
                <p class="text-xs text-gray-600">
                  Daily Capacity: <span class="font-medium">${center.dailyCapacity}</span>
                </p>
              </div>
            `;
            circleMarker.bindPopup(popupContent);

            // Handle click
            circleMarker.on("click", () => {
              onMarkerSelect(center);
            });

            // Store reference to the marker
            layersRef.current.vaccinationMarkers.push(circleMarker);
          });
        }

        // Create a custom CSS class for pulse animations
        const style = document.createElement("style");
        style.textContent = `
          @keyframes pulse-red {
            0% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
            }
            70% {
              box-shadow: 0 0 0 15px rgba(239, 68, 68, 0);
            }
            100% {
              box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
            }
          }
          
          .leaflet-interactive.pulsing-marker {
            animation: pulse-red 1.5s infinite;
          }
          
          .leaflet-popup-content-wrapper {
            background: white;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            border: 1px solid rgba(234, 179, 8, 0.3);
          }
          
          .leaflet-popup-tip {
            background: white;
            box-shadow: none;
          }
          
          .leaflet-popup-close-button {
            color: #666 !important;
          }
        `;
        document.head.appendChild(style);

        // Store initial cases
        prevCasesRef.current = [...cases];
        casesJsonRef.current = JSON.stringify(cases);

        // Mark map as loaded
        setMapLoaded(true);
      } catch (error) {
        console.error("Error initializing map:", error);
      }
    };

    initializeMap();

    // Clean up on unmount
    return () => {
      console.log("Component unmounting, cleaning up map");
      isCleanedUp = true;
      setIsMapMounted(false);

      if (mapInstanceRef.current) {
        try {
          // Get Leaflet instance to properly clean up
          import("leaflet")
            .then((L) => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
              }

              // Clear layer references
              layersRef.current = {
                regionMarkers: [],
                caseMarkers: [],
                socialMarkers: [],
                vaccinationMarkers: [],
                legend: null,
              };

              // Ensure the container doesn't have a leaflet id
              if (mapRef.current) {
                const container = L.DomUtil.get(mapRef.current);
                if (container && (container as any)._leaflet_id) {
                  (container as any)._leaflet_id = null;
                }
              }
            })
            .catch((e) =>
              console.error("Error importing Leaflet for cleanup:", e)
            );
        } catch (e) {
          console.error("Error cleaning up map:", e);
        }
      }
    };
  }, [
    center,
    zoom,
    regions,
    // Remove cases from the dependencies to avoid re-initializing the map
    vaccinationCenters,
    showRiskHeatmap,
    showVaccinationHeatmap,
    selectedRegion,
    onRegionSelect,
    onMarkerSelect,
    updateCaseMarkers,
  ]);

  // Update only the markers when cases change
  useEffect(() => {
    // Skip during initial render
    if (!mapLoaded) return;

    const map = mapInstanceRef.current;
    if (!map) return;

    // Use a more efficient comparison
    const casesJson = JSON.stringify(cases);
    if (casesJsonRef.current !== casesJson) {
      // Dynamically import Leaflet and update markers
      import("leaflet").then((L) => {
        updateCaseMarkers(L, map, cases);
        // Store the new cases reference
        prevCasesRef.current = [...cases];
        casesJsonRef.current = casesJson;
      });
    }
  }, [cases, mapLoaded, updateCaseMarkers]);

  // Update region markers when selected region changes
  useEffect(() => {
    if (!mapLoaded || !mapInstanceRef.current) return;

    // Dynamically import Leaflet
    import("leaflet").then((L) => {
      // Update region marker colors
      regions.forEach((region, index) => {
        const marker = layersRef.current.regionMarkers[index];
        if (marker) {
          marker.setStyle({
            fillColor:
              region.id === selectedRegion
                ? "rgba(234, 179, 8, 0.8)"
                : "rgba(75, 85, 99, 0.8)",
            color:
              region.id === selectedRegion
                ? "rgba(234, 179, 8, 0.4)"
                : "rgba(75, 85, 99, 0.4)",
          });
        }
      });
    });
  }, [selectedRegion, regions, mapLoaded]);

  return (
    <div className="w-full h-full">
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-lg font-medium text-gray-600">
            Loading map...
          </div>
        </div>
      )}
      <div
        ref={mapRef}
        className="w-full h-full"
        style={{ minHeight: "500px", zIndex: 0, willChange: "transform" }}
        id={mapId.current}
      />
    </div>
  );
}

// Wrap component with memo to prevent unnecessary rerenders
const LeafletMap = memo(LeafletMapComponent);
export default LeafletMap;
