"use client";

'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useInitialPrompt } from "@/hooks/useInitialPrompt";
import { Button } from "@/components/ui/button";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { ConcatenatedLogo } from "@/components/ui/concatenated-logo";
import { mockLettaClient } from "@/lib/mock-letta-client";
import { ShidokaIcon } from "@/components/ui/shidoka-icon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar";
import "./prompt-page.css";

interface PromptSidebarContentProps {
  children: React.ReactNode;
  onNewPrompt?: () => void;
}

const templateFeatures = [
  {
    id: "agents",
    label: "Available Agents",
    icon: <ShidokaIcon name="console" className="h-5 w-5 text-amber-600" />,
    description: "Review `lib/mock-letta-client.ts` to see defined agents.",
    action: "View Agents"
  },
  {
    id: "workflow",
    label: "Agentic Workflow",
    icon: <ShidokaIcon name="flow-data" className="h-5 w-5 text-blue-600" />,
    description: "Understand how agents collaborate in `components/dag`.",
    action: "View Workflow"
  },
  {
    id: "code",
    label: "Build Your Demo",
    icon: <ShidokaIcon name="code" className="h-5 w-5 text-green-600" />,
    description: "Check `app/prompt/page.tsx` to customize this template.",
    action: "Review Code"
  }
];

function PromptSidebarContent({ children, onNewPrompt }: PromptSidebarContentProps) {
  const router = useRouter();
  const { state, toggleSidebar } = useSidebar();
  const [customLogo, setCustomLogo] = useState<string | null>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleSidebarClick = (e: React.MouseEvent) => {
    // Only expand if collapsed and not clicking on interactive elements
    if (state === "collapsed") {
      const target = e.target as HTMLElement;
      // Don't expand if clicking on buttons or links
      if (!target.closest('button') && !target.closest('a') && !target.closest('.logo-upload-area')) {
        toggleSidebar();
      }
    }
  };

  const handleLogoDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLogoClick = () => {
    logoInputRef.current?.click();
  };

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomLogo(e.target?.result as string);
      };
      reader.readAsDataURL(file);
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
          <div
            className="page-sidebar__logo-wrapper flex items-center justify-center py-2 logo-upload-area cursor-pointer relative group"
            onDrop={handleLogoDrop}
            onDragOver={handleLogoDragOver}
            onClick={handleLogoClick}
            title="Click or drag image to upload custom logo"
          >
            <input
              type="file"
              ref={logoInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleLogoSelect}
            />
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-md pointer-events-none">
              <span className="text-xs text-gray-600 font-medium bg-white/80 px-2 py-1 rounded">Change Logo</span>
            </div>
            {customLogo ? (
              <ConcatenatedLogo
                width={state === "expanded" ? 200 : 60}
                height={state === "expanded" ? undefined : 20}
                className="page-sidebar__concatenated-logo transition-all duration-300"
                customSrc={customLogo}
              />
            ) : (
              <div
                className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-md text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors"
                style={{
                  width: state === "expanded" ? 200 : 60,
                  height: state === "expanded" ? 80 : 40
                }}
              >
                <span className={`text-xs font-medium ${state === "collapsed" ? "hidden" : ""}`}>Upload Logo</span>
                {state === "collapsed" && <ShidokaIcon name="cloud-upload" className="h-4 w-4" />}
              </div>
            )}
          </div>
        </SidebarHeader>

        <SidebarContent className="page-sidebar__content flex flex-col gap-0">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <Link href="/dashboard">
                      <ShidokaIcon name="home" className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>Home</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <SidebarMenuButton asChild size="lg" className={`h-12 ${state === "collapsed" ? "justify-center px-0" : ""}`}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        // Reset the prompt form state via callback
                        if (onNewPrompt) onNewPrompt();
                        // Navigate to prompt page to ensure a clean state
                        router.push("/prompt");
                      }}
                    >
                      <ShidokaIcon name="add" className="h-5 w-5" />
                      <span className={`font-medium ${state === "collapsed" ? "sr-only" : ""}`}>New Prompt</span>
                    </button>
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
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      
      <SidebarInset className="page__sidebar-main prompt-sidebar-inset">
        {children}
      </SidebarInset>
    </>
  );
}

function PromptSidebar({ children, onNewPrompt }: PromptSidebarContentProps) {
  return (
    <SidebarProvider defaultOpen={true}>
      <PromptSidebarContent onNewPrompt={onNewPrompt}>{children}</PromptSidebarContent>
    </SidebarProvider>
  );
}

export default function InitialPromptPage() {
  const router = useRouter();
  const { setInitialPrompt } = useInitialPrompt();
  const [inputValue, setInputValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isAgentsDialogOpen, setIsAgentsDialogOpen] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentList = await mockLettaClient.agents.list();
        setAgents(agentList);
      } catch (error) {
        console.error("Failed to fetch agents:", error);
      }
    };
    fetchAgents();
  }, []);

  const handleFeatureClick = (featureId: string) => {
    if (featureId === "agents") {
      setIsAgentsDialogOpen(true);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmedInput = inputValue.trim();
    if (!trimmedInput || isSubmitting) return;

    setIsSubmitting(true);

    try {
      // Prepare the prompt (files are handled separately, no need for notes in prompt)
      const enhancedPrompt = trimmedInput;

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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleNewPrompt = () => {
    setInputValue("");
    setUploadedFiles([]);
  };

  return (
    <ProtectedRoute>
      <div className="h-screen overflow-hidden">
        <PromptSidebar onNewPrompt={handleNewPrompt}>
          <div className="prompt-page-wrapper">
            <section className="prompt-shell" aria-label="Prompt Studio">
              <div className="prompt-hero">
                <span className="prompt-eyebrow">Kyndryl Agentic Framework Template</span>
                <h1 className="prompt-title">Build Your Agentic Demo</h1>
                <p className="prompt-subtitle">
                  Follow the steps below to configure your agents, define their workflow, and launch your custom demo.
                </p>
              </div>

              <div className="mb-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    step: 1,
                    title: "Define Your Agents",
                    description: "Edit `lib/mock-letta-client.ts` to define the agents that will participate in your workflow."
                  },
                  {
                    step: 2,
                    title: "Design the Workflow",
                    description: "Use the prompt below to describe how these agents should collaborate."
                  },
                  {
                    step: 3,
                    title: "Provide Context",
                    description: "Upload documents to give your agents the specific knowledge they need."
                  },
                  {
                    step: 4,
                    title: "Customize UI",
                    description: "Modify `app/chat/page.tsx` to create custom visualizations."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Step {item.step}</div>
                    <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="prompt-form">
                <div className="prompt-form__group">
                  <label htmlFor="prompt-textarea" className="prompt-label">
                    Input your prompt
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
                      placeholder="Describe the task you want your agents to perform..."
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
                        <ShidokaIcon name="chat" className="h-5 w-5" />
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
                          <ShidokaIcon name="send" className="h-[18px] w-[18px]" />
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
                  <ShidokaIcon name="cloud-upload" className="h-5 w-5" />
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
                        <ShidokaIcon name="document" className="h-5 w-5" />
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
                        <ShidokaIcon name="close" className="h-4 w-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <section className="prompt-samples" aria-label="Template Features">
                <div className="prompt-samples__header">
                  <span className="prompt-eyebrow">Template Features</span>
                  <p className="prompt-helper">
                    Explore the components available in this boilerplate to build your own agentic workflows.
                  </p>
                </div>
                <div className="prompt-card-grid">
                  {templateFeatures.map((feature) => (
                    <div
                      key={feature.id}
                      className={`prompt-card ${feature.id === 'agents' ? 'cursor-pointer hover:bg-gray-50 transition-colors' : 'cursor-default'}`}
                      onClick={() => handleFeatureClick(feature.id)}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {feature.icon}
                        <span className="prompt-card__eyebrow mb-0">{feature.label}</span>
                      </div>
                      <p className="mb-4">{feature.description}</p>
                      <div className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                        {feature.action}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </section>
          </div>
        </PromptSidebar>

        <Dialog open={isAgentsDialogOpen} onOpenChange={setIsAgentsDialogOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Available Agents</DialogTitle>
              <DialogDescription>
                These are the agents currently available in the Kyndryl Agentic Framework.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {agents.map((agent) => (
                <div key={agent.id} className="p-4 border rounded-lg bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-lg text-amber-900">{agent.name}</h3>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{agent.description}</p>
                  {agent.capabilities && (
                    <div className="flex flex-wrap gap-1.5">
                      {agent.capabilities.map((cap: string) => (
                        <span key={cap} className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-medium">
                          {cap}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ProtectedRoute>
  );
}
