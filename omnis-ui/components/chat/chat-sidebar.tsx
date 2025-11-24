"use client";

import { Home, Plus, Expand, Upload } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VideoPopup } from "@/components/VideoPopup";
import { ConcatenatedLogo } from "@/components/ui/concatenated-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";

// Dynamically import the 3D component to avoid SSR issues
const ThreeDimensionalDAG = dynamic(() => import("@/components/3dm2m/mock-3d-dag"), {
  ssr: false,
  loading: () => (
    <div className="h-full flex items-center justify-center">
      <div className="w-10 h-10 border-4 border-blue/30 border-t-blue rounded-full animate-spin"></div>
      <span className="ml-3">Preparing 3D visualization...</span>
    </div>
  ),
});

interface ChatSidebarContentProps {
  children: React.ReactNode;
}

function ChatSidebarContent({ children }: ChatSidebarContentProps) {
  const [isM2MPopupOpen, setIsM2MPopupOpen] = useState(false);
  const [isM2MLoading, setIsM2MLoading] = useState(true);
  const [showVideoPopup, setShowVideoPopup] = useState(false);

  const toggleM2MPopup = () => {
    setIsM2MPopupOpen((prev) => {
      if (!prev) {
        // Start loading when opening
        setIsM2MLoading(true);
        // Simulate loading time
        setTimeout(() => {
          setIsM2MLoading(false);
        }, 1500);

        // Add 2-second delay before showing video popup
        // setTimeout(() => {
        //   setShowVideoPopup(true);
        // }, 2000); // DISABLED: Video popup deactivated
      }
      return !prev;
    });
  };

  const { state, toggleSidebar } = useSidebar();

  const handleSidebarClick = (e: React.MouseEvent) => {
    // Only expand if collapsed and not clicking on interactive elements
    if (state === "collapsed") {
      const target = e.target as HTMLElement;
      // Don't expand if clicking on buttons or links
      if (!target.closest('button') && !target.closest('a')) {
        toggleSidebar();
      }
    }
  };

  return (
    <>
      <Sidebar 
        variant="sidebar" 
        collapsible="icon" 
        className="border-r"
        onClick={handleSidebarClick}
      >
        <SidebarHeader className="flex items-center justify-center border-b bg-white">
          {/* Kyndryl + L&G Concatenated Logos */}
          <div className="flex items-center justify-center py-2">
            <ConcatenatedLogo
              width={state === "expanded" ? 200 : 60}
              height={state === "expanded" ? undefined : 20}
              className="chat-sidebar__concatenated-logo transition-all duration-300"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="flex flex-col gap-0">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <Link href="/prompt">
                      <Home className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <button
                      onClick={async () => {
                        try {
                          if (typeof window !== "undefined") {
                            localStorage.setItem("starting_new_chat", "true");
                          }
                          window.location.href = "/prompt";
                        } catch (error) {
                          console.error("Error starting new chat:", error);
                        }
                      }}
                    >
                      <Plus className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>New Chat</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t bg-gray-50/50" style={{ background: '#fff'}}>
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                <button onClick={toggleSidebar}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M11 19l-7-7 7-7" />
                    <path d="M21 19l-7-7 7-7" />
                  </svg>
                  <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Collapse</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset>
        {children}
      </SidebarInset>

      {/* 3D DAG Dialog */}
      <Dialog
        open={isM2MPopupOpen}
        onOpenChange={(open) => {
          // Only allow Dialog to close if video popup is not open
          if (!showVideoPopup) {
            setIsM2MPopupOpen(open);
          } else if (!open) {
            // If trying to close while video is playing, don't close
            // This prevents interactions with the video from closing the DAG dialog
            return;
          }
        }}
      >
        <DialogContent className="p-0 m-0 max-w-[99vw] w-[99vw] max-h-[99vh] h-[99vh] overflow-hidden border-0 rounded-none">
          <DialogTitle className="sr-only">3D M2M DAG</DialogTitle>
          <DialogDescription className="sr-only">
            Interactive 3D visualization showing relationships between
            government entities and health services
          </DialogDescription>
          <div className="h-full w-full flex flex-col">
            <div className="bg-white py-1 px-3 border-b border-blue/30 flex justify-between items-center shrink-0 shadow-sm z-10">
              <h2 className="text-lg font-semibold">3D M2M DAG</h2>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsM2MPopupOpen(false)}
                className="border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              >
                Close
              </Button>
            </div>
            <div className="w-full h-[calc(99vh-40px)] bg-white">
              {isM2MLoading ? (
                <div className="h-full flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-blue/30 border-t-blue rounded-full animate-spin"></div>
                  <span className="ml-3">Preparing 3D visualization...</span>
                </div>
              ) : (
                <div className="h-full w-full">
                  <ThreeDimensionalDAG />
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Popup */}
      <VideoPopup
        isOpen={showVideoPopup}
        onClose={() => setShowVideoPopup(false)}
        videoSrc="/videos/55 Entities.mp4"
        autoClose={true}
      />
    </>
  );
}

export function ChatSidebar({ children }: ChatSidebarContentProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <ChatSidebarContent>{children}</ChatSidebarContent>
    </SidebarProvider>
  );
}
