import React, { useState } from "react";
import { HelpCircle, X, ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

// CSS for blinking cursor
const blinkStyles = `
  @keyframes blink {
    0%, 50% { opacity: 1; }
    51%, 100% { opacity: 0; }
  }
  .blink {
    animation: blink 1s infinite;
  }
`;

interface AnalyticsReasoningPopupProps {
  className?: string;
  componentName: string;
}

export function AnalyticsReasoningPopup({ className, componentName }: AnalyticsReasoningPopupProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  return (
    <>
      {/* Inject CSS */}
      <style dangerouslySetInnerHTML={{ __html: blinkStyles }} />
      
      {/* Help Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className={`text-gray-400 hover:text-gray-600 transition-colors ${className}`}
        title="View analytics reasoning process"
      >
        <HelpCircle className="w-4 h-4" />
      </button>

      {/* Popup Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto bg-slate-900 border-slate-700">
          <DialogTitle className="sr-only">Analytics Reasoning Process for {componentName}</DialogTitle>
          
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div>
                <h2 className="text-lg font-mono text-slate-100 tracking-wide">OMNIS ANALYTICS ENGINE</h2>
                <p className="text-xs text-slate-400 mt-1 font-mono uppercase tracking-wider">{componentName} Component Intelligence Pipeline</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-4 top-0 bottom-0 w-px bg-slate-600"></div>
              
              <div className="space-y-6">
                {/* Intent */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest mb-2">01 // COMPONENT_SELECTED</h4>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3">
                      <p className="text-slate-300 text-sm font-mono">"{componentName} component selected for detailed analytics and optimization analysis."</p>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Triggered agents: production_analyst, sustainability_evaluator, cost_optimizer, recommendation_engine</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Data scope: Manufacturing metrics, material composition, environmental impact, cost analysis</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Access via MCP */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest">02 // MCP_DATA_ACCESS</h4>
                      <div className="flex items-center gap-1 bg-slate-700 px-2 py-1 rounded text-xs">
                        <span className="font-mono text-slate-300 text-xs">MCP</span>
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3 space-y-2">
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">MES system: Assembly time logs, defect tracking, throughput data</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">PLM integration: Component specifications, BOM data, material properties</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">ERP connection: Cost data, supplier information, procurement records</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">LCA database: Environmental impact factors, carbon footprint data</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* A2A Collaborative Analysis */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest">03 // A2A_COLLABORATIVE_ANALYSIS</h4>
                      <div className="flex items-center gap-1 bg-slate-700 px-2 py-1 rounded text-xs">
                        <span className="font-mono text-slate-300 text-xs">A2A</span>
                      </div>
                      <button
                        onClick={() => toggleSection('analysis')}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {expandedSections.analysis ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3 space-y-3">
                      <div>
                        <div className="flex items-start text-sm mb-2">
                          <span className="text-slate-500 mr-3 font-mono">→</span>
                          <span className="text-slate-300">production_analyst: Assembly time trends, efficiency optimization</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start text-sm mb-2">
                          <span className="text-slate-500 mr-3 font-mono">→</span>
                          <span className="text-slate-300">sustainability_evaluator: Material composition analysis, carbon impact</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-start text-sm mb-2">
                          <span className="text-slate-500 mr-3 font-mono">→</span>
                          <span className="text-slate-300">cost_optimizer: Financial impact modeling, ROI calculations</span>
                        </div>
                      </div>
                      
                      {expandedSections.analysis && (
                        <div className="mt-3 bg-slate-900 border border-slate-600 rounded p-3">
                          <pre className="text-xs text-slate-300 font-mono">
{`// Agent collaboration code
const results = await Promise.all([
  productionAgent.analyze(mesData),
  sustainabilityAgent.evaluate(bomData),
  costAgent.optimize(erpData)
]);

const validated = crossValidate(results);`}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendation Generation */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest mb-2">04 // RECOMMENDATION_GENERATION</h4>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3 space-y-2">
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Multi-criteria optimization for production improvements</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Impact classification: High/Medium/Low priority scoring</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Department routing based on recommendation scope</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Impact Simulation */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest">05 // IMPACT_SIMULATION</h4>
                      <button
                        onClick={() => toggleSection('simulation')}
                        className="text-slate-400 hover:text-slate-200 transition-colors"
                      >
                        {expandedSections.simulation ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>
                    </div>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3 space-y-2">
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Monte Carlo simulation for recommendation impact ranges</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Risk assessment using historical implementation data</span>
                      </div>
                      
                      {expandedSections.simulation && (
                        <div className="mt-3 bg-slate-900 border border-slate-600 rounded p-3">
                          <pre className="text-xs text-slate-300 font-mono">
{`// Simulation framework
const simulation = runMonteCarloSimulation({
  recommendations: generated,
  iterations: 10000,
  uncertaintyFactors: {
    costVolatility: 0.15,
    implementationDelay: 0.25
  }
});`}
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Human-in-the-Loop */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest mb-2">06 // HUMAN_INTEGRATION</h4>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3 space-y-2">
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Actionable buttons: Accept, Send to Manager, Alert Team</span>
                      </div>
                      <div className="flex items-start text-sm">
                        <span className="text-slate-500 mr-3 font-mono">→</span>
                        <span className="text-slate-300">Workflow routing with department-specific notifications</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Result */}
                <div className="relative flex items-start">
                  <div className="absolute left-3 w-2 h-2 bg-slate-400 rounded-full border-2 border-slate-900"></div>
                  <div className="ml-10">
                    <h4 className="font-mono text-slate-200 text-xs uppercase tracking-widest mb-2">07 // ANALYTICS_GENERATED</h4>
                    <div className="bg-slate-800 border border-slate-700 rounded p-3">
                      <p className="text-slate-300 text-sm font-mono">Comprehensive {componentName} analytics with validated recommendations successfully generated</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">
                OMNIS.ANALYTICS.v2.4.1 • COMPONENT_INTELLIGENCE_PIPELINE
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 