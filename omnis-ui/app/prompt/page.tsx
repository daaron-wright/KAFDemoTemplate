"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus, Home, Settings, LogOut, Upload, File, X } from "lucide-react";
import Image from "next/image";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { useAuth } from "@/lib/auth-provider";
import { useChat } from "@/lib/chat-provider";
import { useInitialPrompt } from "@/hooks/useInitialPrompt";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
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
import "./prompt-page.css";

interface PromptSidebarContentProps {
  children: React.ReactNode;
}

const curatedPrompts = [
  {
    id: "msat",
    label: "MSAT Investigate production deviation",
    prompt:
      "How can I use our document-intelligence workspace to analyze a production deviation? I need to monitor logs, auto-fetch batch metadata, run semantic search across deviation reports and SOPs, validate document versions, summarize historical corrective actions, and draft a compliance-ready resolution. Please ensure the workflow uses agentic orchestration, natural language search, and version-controlled sources, and updates the knowledge graph for future queries.",
    summary:
      "Monitor logs, auto-fetch batch metadata, validate versions, summarize corrective actions, and push updates into the knowledge graph.",
  },
  {
    id: "rd",
    label: "R&D Retrieve Experiment Results",
    prompt:
      "How can I use our document-intelligence workspace to gather experiment results for a new study? I need to run semantic search across protocols and experiment clusters, validate the latest versions, summarize findings, compare evidence across multiple sources, and generate a decision memo. Please ensure the workflow uses agentic orchestration, natural language search, version-controlled sources, and updates the knowledge graph for future insights.",
    summary:
      "Search protocols, confirm latest revisions, synthesize findings across sources, and generate a decision memo with knowledge graph updates.",
  },
];

function PromptSidebarContent({ children }: PromptSidebarContentProps) {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      console.log("Logging out user");
      await signOut();
      setIsUserModalOpen(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
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
        className="page-sidebar border-r"
        onClick={handleSidebarClick}
      >
        <SidebarHeader className="page-sidebar__header flex items-center justify-center border-b bg-white">
          {/* Kyndryl + L&G Concatenated Logos */}
          <div className="page-sidebar__logo-wrapper flex items-center justify-center py-2">
            <ConcatenatedLogo
              width={state === "expanded" ? 200 : 60}
              height={state === "expanded" ? undefined : 20}
              className="page-sidebar__concatenated-logo transition-all duration-300"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="page-sidebar__content flex flex-col gap-0">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <Link href="/dashboard">
                      <Home className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <Link href="/prompt">
                      <Plus className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>New Prompt</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="mt-auto border-t bg-gray-50/50">
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

            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                <Link href="/settings">
                  <Settings className="h-5 w-5" />
                  <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            
            <SidebarMenuItem>
              <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                <button
                  onClick={() => {
                    console.log("User logout button clicked, opening modal");
                    setIsUserModalOpen(true);
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Account</span>
                </button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="page__sidebar-main prompt-sidebar-inset">
        {children}
      </SidebarInset>

      {/* User Account Modal */}
      {isUserModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsUserModalOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-2xl p-6 w-96 max-w-[90vw] mx-4">
            {/* Close button */}
            <button
              onClick={() => setIsUserModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-700"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Account</h3>
              <p className="text-sm text-gray-600 mt-1">
                {user?.email || "User"}
              </p>
              <p className="text-xs text-gray-500 mt-1">Signed in</p>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
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
                >
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" x2="9" y1="12" y2="12" />
                </svg>
                Sign out
              </button>

              <button
                onClick={() => setIsUserModalOpen(false)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function PromptSidebar({ children }: PromptSidebarContentProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <PromptSidebarContent>{children}</PromptSidebarContent>
    </SidebarProvider>
  );
}

export default function InitialPromptPage() {
  const router = useRouter();
  const { setInitialPrompt } = useInitialPrompt();
  const { user, session } = useAuth();
  const { sendMessage } = useChat();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Simple debugging for auth status in prompt page
  useEffect(() => {
    console.log("Prompt page - Auth state:", {
      hasUser: !!user,
      userEmail: user?.email,
      hasSession: !!session,
    });
  }, [user, session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Prepare the prompt (files are handled separately, no need for notes in prompt)
      let enhancedPrompt = trimmedInput;

      // First store the prompt in localStorage for persistence
      setInitialPrompt(enhancedPrompt);

      console.log(`Processing query: ${enhancedPrompt}`);
      if (uploadedFiles.length > 0) {
        console.log(`With ${uploadedFiles.length} uploaded files:`, uploadedFiles.map(f => f.name));
      }

      // Store the preferred tab in localStorage
      localStorage.setItem("preferredTab", "DAG");

      // Navigate to chat page
      console.log("Navigating to chat page with DAG tab preference");
      router.push("/chat");
    } catch (error) {
      console.error("Error submitting prompt:", error);
      setIsSubmitting(false);
      // Show an error message to the user
      alert("There was an error submitting your prompt. Please try again.");
    }
  };

  // File upload handlers
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    addFiles(files);
  };

  const handleFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
    const files = Array.from(event.dataTransfer.files);
    addFiles(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragOver(false);
  };

  const addFiles = (files: File[]) => {
    // Filter for supported file types
    const supportedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'application/vnd.ms-powerpoint',
      'text/plain',
      'text/csv'
    ];

    const validFiles = files.filter(file => {
      const isValidType = supportedTypes.includes(file.type);
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB limit
      return isValidType && isValidSize;
    });

    if (validFiles.length !== files.length) {
      alert('Some files were not added. Please ensure files are PDF, Word, Excel, PowerPoint, or text documents under 10MB.');
    }

    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type.includes('pdf')) return '📄';
    if (file.type.includes('word')) return '📝';
    if (file.type.includes('sheet') || file.type.includes('excel')) return '📊';
    if (file.type.includes('presentation') || file.type.includes('powerpoint')) return '📈';
    if (file.type.includes('text')) return '📋';
    return '📎';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden">
        <PromptSidebar>
          <div className="prompt-page-wrapper">
            <section className="prompt-shell" aria-label="Prompt Studio">
              <div className="prompt-hero">
                <span className="prompt-eyebrow">Prompt studio</span>
                <h1 className="prompt-title">What would you like to know?</h1>
                <p className="prompt-subtitle">
                  Use the Shidoka design system foundation to compose governed questions, attach provenance, and route them into the orchestration workspace.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="prompt-form">
                <div className="prompt-form__group">
                  <label htmlFor="prompt-textarea" className="prompt-label">
                    Compose a question
                  </label>
                  <div className={`prompt-textarea-wrapper ${isSubmitting ? "is-disabled" : ""}`}>
                    <textarea
                      id="prompt-textarea"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSubmit(e);
                        }
                      }}
                      placeholder="Ask me anything"
                      className="prompt-textarea"
                      aria-label="Enter your question"
                      disabled={isSubmitting}
                      autoFocus
                      rows={1}
                      style={{ height: "auto" }}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = "auto";
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                    />
                    <div className="prompt-textarea-actions">
                      <button
                        type="button"
                        className="kd-icon-button"
                        aria-label="Use microphone"
                        disabled={isSubmitting}
                      >
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
                        >
                          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" x2="12" y1="19" y2="22" />
                          <line x1="8" x2="16" y1="22" y2="22" />
                        </svg>
                      </button>

                      <button
                        type="submit"
                        disabled={!inputValue.trim() || isSubmitting}
                        className="kd-icon-button kd-icon-button--primary"
                        aria-label="Submit question"
                      >
                        {isSubmitting ? (
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="m22 2-7 20-4-9-9-4Z" />
                            <path d="M22 2 11 13" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div
                className={`prompt-dropzone ${isDragOver ? "is-active" : ""}`}
                onDrop={handleFileDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
              >
                <div className="prompt-dropzone__icon">
                  <Upload className="h-5 w-5" />
                </div>
                <div>
                  <p className="prompt-label">Attach supporting evidence</p>
                  <p className="prompt-helper">
                    PDF, Word, Excel, PowerPoint, text, or CSV files under 10 MB feed the orchestrator with provenance.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="kd-button kd-button--ghost"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                >
                  Browse files
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                  onChange={handleFileSelect}
                  className="sr-only"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <ul className="prompt-file-list">
                  {uploadedFiles.map((file, index) => (
                    <li key={`${file.name}-${index}`} className="prompt-file">
                      <div className="prompt-file__meta">
                        <File className="h-5 w-5" />
                        <div>
                          <span>{file.name}</span>
                          <small>{formatFileSize(file.size)}</small>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="kd-icon-button"
                        aria-label={`Remove ${file.name}`}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <section className="prompt-samples" aria-label="Curated starter prompts">
                <div className="prompt-samples__header">
                  <span className="prompt-eyebrow">Guided starters</span>
                  <p className="prompt-helper">
                    Each card reflects an agentic workflow grounded in Shidoka spacing, elevation, and color tokens.
                  </p>
                </div>
                <div className="prompt-card-grid">
                  {curatedPrompts.map((sample) => (
                    <button
                      key={sample.id}
                      type="button"
                      className="prompt-card"
                      onClick={() => setInputValue(sample.prompt)}
                      disabled={isSubmitting}
                    >
                      <span className="prompt-card__eyebrow">{sample.label}</span>
                      <p>{sample.summary}</p>
                    </button>
                  ))}
                </div>
              </section>
            </section>
          </div>
        </PromptSidebar>
      </div>
    </ProtectedRoute>
  );
}
