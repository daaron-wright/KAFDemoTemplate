"use client";

import { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/measles-dashboard/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, AlertTriangle, CheckCircle2 } from "lucide-react";
import dynamic from "next/dynamic";

const ComponentStats = dynamic(() => import("./component-stats"), {
  ssr: false,
});

interface InfoPanelProps {
  selectedComponent: string | null;
}

export function InfoPanel({ selectedComponent }: InfoPanelProps) {
  const [activeTab, setActiveTab] = useState("insights");

  if (!selectedComponent) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Select a Component</h3>
          <p className="text-sm text-gray-600">
            Click on any green tag in the 3D model to view detailed analytics and insights for that component.
          </p>
        </div>
      </div>
    );
  }

  return <ComponentStats componentName={selectedComponent} />;
}
