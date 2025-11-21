"use client";

import React, { useState, useEffect, useRef } from "react";
import { Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TVGDashboard from "./index";

// Generate a static ID for the dashboard to ensure it doesn't get recreated
const DASHBOARD_ID = `tvg-dashboard-${Math.random().toString(36).substring(2, 9)}`;

export function TVGChatDashboard() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [shouldRenderDashboard, setShouldRenderDashboard] = useState(false);
  const dashboardMountedRef = useRef(false);

  useEffect(() => {
    console.log("TVGChatDashboard mounted for retail analytics");

    // Only mount the dashboard once it hasn't been mounted yet
    if (!dashboardMountedRef.current) {
      // Add a slight delay to ensure DOM is ready
      const timer = setTimeout(() => {
        setShouldRenderDashboard(true);
        dashboardMountedRef.current = true;
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, []);

  return (
    <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-100 p-2 flex justify-between items-center border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-700">
          Kyndryl + L&G - ESG Analytics Platform
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            console.log("Expand TVG dashboard button clicked");
            setIsDialogOpen(true);
          }}
          className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
          title="View in fullscreen"
        >
          <Maximize2 className="h-4 w-4" />
          <span className="sr-only">Expand dashboard</span>
        </Button>
      </div>

      <div
        className="h-[450px] relative overflow-auto"
        id={`tvg-dashboard-container-${DASHBOARD_ID}`}
      >
        {shouldRenderDashboard ? (
          <TVGDashboard key={DASHBOARD_ID} />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <span className="ml-3">Loading retail analytics...</span>
          </div>
        )}
      </div>

      {/* Full-screen dialog */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
        }}
      >
        <DialogContent className="p-0 m-0 max-w-[99vw] w-[99vw] max-h-[99vh] h-[99vh] overflow-auto border-0 rounded-none">
          <DialogTitle className="sr-only">
            TVG Retail Analytics - Back-to-School Emily Campaign Dashboard
          </DialogTitle>
          <div className="h-full w-full flex flex-col">
            <div className="bg-white py-1 px-3 border-b flex justify-between items-center shrink-0 shadow-sm z-10">
              <h2 className="text-lg font-semibold">
                TVG Retail Analytics - Back-to-School Emily Campaign Dashboard
              </h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsDialogOpen(false)}
              >
                Close
              </Button>
            </div>
            <div
              className="w-full h-[calc(99vh-40px)]"
              id={`fullscreen-tvg-dashboard-${DASHBOARD_ID}`}
            >
              {shouldRenderDashboard && (
                <TVGDashboard key={`fullscreen-${DASHBOARD_ID}`} />
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 