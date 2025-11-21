"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { AnalyticsReasoningPopup } from "./analytics-reasoning-popup";

interface ComponentStatsProps {
  componentName: string;
}

export default function ComponentStats({ componentName }: ComponentStatsProps) {
  const [actionStates, setActionStates] = useState<Record<string, 'pending' | 'accepted' | 'sent' | 'alerted'>>({});

  const handleAction = (id: string, action: 'accept' | 'send' | 'alert') => {
    setActionStates(prev => ({
      ...prev,
      [id]: action === 'accept' ? 'accepted' : action === 'send' ? 'sent' : 'alerted'
    }));
  };

  // Comprehensive component-specific data
  const getComponentData = (component: string) => {
    switch (component) {
      case "Structure":
        return {
          productivity: {
            assemblyTime: "2h 45m",
            previousTime: "3h 10m",
            improvement: "13%",
            costPerUnit: "¥89,500",
            defectRate: "2.1%",
            throughput: "18 units/day",
            insight: "Body welding efficiency improved after new robotic arm calibration. Downtime reduced by 40min per shift."
          },
          sustainability: {
            materials: {
              recycledSteel: 75,
              newSteel: 20,
              aluminum: 5
            },
            emissions: "145.8kg CO₂/unit",
            waste: "8.2kg",
            recyclable: "92%",
            energyUsage: "125 kWh/unit",
            insight: "Switching to 85% recycled steel could reduce CO₂ by 22kg per unit. Welding energy optimization pending."
          },
          recommendations: [
            {
              id: "steel-supplier",
              text: "Switch to certified 85% recycled steel supplier (¥+1,200/unit, -22kg CO₂)",
              impact: "High",
              department: "Procurement"
            },
            {
              id: "welding-sequence",
              text: "Optimize welding sequence to reduce heat treatment cycles (-15min assembly time)",
              impact: "Medium",
              department: "Manufacturing"
            },
            {
              id: "paint-booth",
              text: "Install low-VOC paint booth filtration system (¥480,000 investment)",
              impact: "High",
              department: "Facilities"
            },
            {
              id: "scrap-tracking",
              text: "Implement real-time steel scrap weight tracking for waste reduction",
              impact: "Low",
              department: "Quality"
            }
          ]
        };

      case "Window":
        return {
          productivity: {
            assemblyTime: "28m 15s",
            previousTime: "31m 40s",
            improvement: "11%",
            costPerUnit: "¥24,800",
            defectRate: "1.8%",
            throughput: "45 units/day",
            insight: "Automated glass cutting reduced material waste by 15%. Sealant application time optimized."
          },
          sustainability: {
            materials: {
              glassRecycled: 45,
              glassNew: 40,
              sealants: 15
            },
            emissions: "18.7kg CO₂/unit",
            waste: "1.8kg",
            recyclable: "78%",
            energyUsage: "8.5 kWh/unit",
            insight: "Laminated glass requires 30% more energy than tempered. UV coating adds 2.1kg CO₂ per window."
          },
          recommendations: [
            {
              id: "glass-supplier",
              text: "Partner with local glass recycler for 60% recycled content (¥-350/unit)",
              impact: "Medium",
              department: "Procurement"
            },
            {
              id: "sealant-automation",
              text: "Automate polyurethane sealant application to reduce waste by 8%",
              impact: "Medium",
              department: "Manufacturing"
            },
            {
              id: "edge-grinding",
              text: "Upgrade edge grinding equipment for better glass utilization (+3% yield)",
              impact: "Low",
              department: "Maintenance"
            },
            {
              id: "uv-coating",
              text: "Evaluate water-based UV coating alternatives (-1.2kg CO₂/unit)",
              impact: "Low",
              department: "R&D"
            }
          ]
        };

      case "Wheel":
        return {
          productivity: {
            assemblyTime: "12m 30s",
            previousTime: "14m 20s",
            improvement: "13%",
            costPerUnit: "¥31,200",
            defectRate: "0.9%",
            throughput: "95 units/day",
            insight: "New tire mounting equipment reduced balancing iterations. Wheel alignment process standardized."
          },
          sustainability: {
            materials: {
              recycledAluminum: 65,
              newAluminum: 25,
              naturalRubber: 10
            },
            emissions: "28.4kg CO₂/unit",
            waste: "2.4kg",
            recyclable: "85%",
            energyUsage: "12.3 kWh/unit",
            insight: "Aluminum wheel casting generates 15kg more CO₂ than steel. Tire vulcanization is energy-intensive."
          },
          recommendations: [
            {
              id: "aluminum-recycling",
              text: "Increase recycled aluminum content to 80% through better sorting (¥-180/unit)",
              impact: "Medium",
              department: "Production"
            },
            {
              id: "tire-pressure",
              text: "Install TPMS sensors during assembly to optimize rolling resistance",
              impact: "Low",
              department: "Assembly"
            },
            {
              id: "balancing-precision",
              text: "Upgrade wheel balancing equipment for ±1g precision (reduce vibration)",
              impact: "Medium",
              department: "Quality"
            },
            {
              id: "rubber-sourcing",
              text: "Source FSC-certified natural rubber suppliers (+¥45/unit, -2kg CO₂)",
              impact: "Low",
              department: "Procurement"
            }
          ]
        };

      case "Headlights":
        return {
          productivity: {
            assemblyTime: "18m 45s",
            previousTime: "22m 10s",
            improvement: "15%",
            costPerUnit: "¥16,900",
            defectRate: "3.2%",
            throughput: "75 units/day",
            insight: "LED module pre-testing reduced field failures by 60%. Lens polishing automation improved clarity."
          },
          sustainability: {
            materials: {
              ledComponents: 45,
              plasticHousing: 35,
              glassLens: 20
            },
            emissions: "8.9kg CO₂/unit",
            waste: "0.8kg",
            recyclable: "68%",
            energyUsage: "4.2 kWh/unit",
            insight: "LED manufacturing requires rare earth elements. Plastic housing contributes 65% of component emissions."
          },
          recommendations: [
            {
              id: "led-efficiency",
              text: "Upgrade to high-efficiency LED modules (15% less power, +¥280/unit)",
              impact: "Medium",
              department: "Engineering"
            },
            {
              id: "plastic-bio",
              text: "Switch to bio-based plastic housing materials (-3.2kg CO₂, +¥120/unit)",
              impact: "High",
              department: "Materials"
            },
            {
              id: "lens-coating",
              text: "Implement anti-fog coating application automation (reduce defects)",
              impact: "Low",
              department: "Manufacturing"
            },
            {
              id: "wire-harness",
              text: "Optimize wire harness routing to reduce copper usage by 15%",
              impact: "Low",
              department: "Design"
            }
          ]
        };

      case "Engine":
        return {
          productivity: {
            assemblyTime: "4h 25m",
            previousTime: "4h 55m",
            improvement: "10%",
            costPerUnit: "¥245,600",
            defectRate: "1.4%",
            throughput: "8 units/day",
            insight: "Precision machining tolerances improved with new CNC calibration. Piston ring installation automated."
          },
          sustainability: {
            materials: {
              castIron: 55,
              aluminum: 30,
              steel: 15
            },
            emissions: "198.5kg CO₂/unit",
            waste: "15.7kg",
            recyclable: "88%",
            energyUsage: "285 kWh/unit",
            insight: "Engine block casting accounts for 70% of emissions. Machining coolant recycling saves 2.3kg CO₂."
          },
          recommendations: [
            {
              id: "casting-optimization",
              text: "Optimize engine block casting to reduce material waste by 8% (¥-2,100/unit)",
              impact: "High",
              department: "Manufacturing"
            },
            {
              id: "coolant-recycling",
              text: "Install closed-loop coolant recycling system (¥85,000 investment)",
              impact: "Medium",
              department: "Facilities"
            },
            {
              id: "lightweight-pistons",
              text: "Switch to lightweight aluminum pistons (-12kg weight, +¥890/unit)",
              impact: "Medium",
              department: "Design"
            },
            {
              id: "torque-optimization",
              text: "Implement torque-to-yield bolting process for better precision",
              impact: "Low",
              department: "Assembly"
            },
            {
              id: "oil-coating",
              text: "Apply nano-ceramic coating to reduce friction and wear",
              impact: "Low",
              department: "R&D"
            }
          ]
        };

      case "Electronic Systems":
        return {
          productivity: {
            assemblyTime: "35m 20s",
            previousTime: "41m 15s",
            improvement: "14%",
            costPerUnit: "¥42,800",
            defectRate: "2.8%",
            throughput: "38 units/day",
            insight: "SMT component placement accuracy improved. Software flashing time reduced with parallel programming."
          },
          sustainability: {
            materials: {
              pcbComponents: 50,
              rareEarthElements: 25,
              plasticConnectors: 25
            },
            emissions: "22.1kg CO₂/unit",
            waste: "1.2kg",
            recyclable: "45%",
            energyUsage: "15.8 kWh/unit",
            insight: "Rare earth mining for semiconductors has highest environmental impact. E-waste recycling critical."
          },
          recommendations: [
            {
              id: "conflict-free",
              text: "Source conflict-free rare earth elements from certified suppliers (+¥340/unit)",
              impact: "High",
              department: "Procurement"
            },
            {
              id: "modular-design",
              text: "Implement modular ECU design for better repairability and recycling",
              impact: "Medium",
              department: "Design"
            },
            {
              id: "lead-free",
              text: "Complete transition to lead-free solder across all PCBs",
              impact: "Low",
              department: "Manufacturing"
            },
            {
              id: "software-optimization",
              text: "Optimize firmware to reduce processor power consumption by 8%",
              impact: "Low",
              department: "Software"
            },
            {
              id: "testing-automation",
              text: "Automate in-circuit testing to reduce manual inspection time",
              impact: "Medium",
              department: "Quality"
            }
          ]
        };

      default:
        return {
          productivity: {
            assemblyTime: "N/A",
            previousTime: "N/A",
            improvement: "N/A",
            costPerUnit: "N/A",
            defectRate: "N/A",
            throughput: "N/A",
            insight: "No data available for this component."
          },
          sustainability: {
            materials: { unknown: 100 },
            emissions: "N/A",
            waste: "N/A",
            recyclable: "N/A",
            energyUsage: "N/A",
            insight: "No sustainability data available."
          },
          recommendations: []
        };
    }
  };

  const data = getComponentData(componentName);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "High": return "text-red-600 bg-red-50";
      case "Medium": return "text-amber-600 bg-amber-50";
      case "Low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getActionStatus = (id: string) => {
    const state = actionStates[id];
    switch (state) {
      case 'accepted': return { text: 'Accepted', color: 'bg-green-100 text-green-800' };
      case 'sent': return { text: 'Sent to Manager', color: 'bg-blue-100 text-blue-800' };
      case 'alerted': return { text: 'Team Alerted', color: 'bg-purple-100 text-purple-800' };
      default: return null;
    }
  };

  return (
    <div className="p-6 space-y-6 relative">
      {/* Header */}
      <div className="border-b pb-4 relative">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">{componentName} Analytics</h2>
            <p className="text-sm text-gray-600 mt-1">Manufacturing performance and sustainability metrics</p>
          </div>
          {/* Reasoning Popup Button - Top Right */}
          <div className="flex-shrink-0">
            <AnalyticsReasoningPopup 
              componentName={componentName}
              className="bg-white hover:bg-gray-50 rounded-full p-2 shadow-md border transition-all hover:shadow-lg" 
            />
          </div>
        </div>
      </div>

      {/* Section 1: Productivity Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Productivity Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* KPI Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Assembly Time</div>
              <div className="text-lg font-bold text-gray-800">{data.productivity.assemblyTime}</div>
              <div className="text-xs text-green-600">
                ↓ {data.productivity.improvement} from {data.productivity.previousTime}
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Cost per Unit</div>
              <div className="text-lg font-bold text-gray-800">{data.productivity.costPerUnit}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Defect Rate</div>
              <div className="text-lg font-bold text-gray-800">{data.productivity.defectRate}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Daily Throughput</div>
              <div className="text-lg font-bold text-gray-800">{data.productivity.throughput}</div>
            </div>
          </div>
          
          {/* Insight */}
          <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
            <p className="text-sm text-blue-800">{data.productivity.insight}</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 2: Sustainability Metrics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Sustainability Metrics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Material Composition */}
          <div>
            <h4 className="font-medium text-gray-700 mb-3">Material Composition</h4>
            <div className="space-y-3">
              {Object.entries(data.sustainability.materials).map(([material, percentage]) => {
                const colors = {
                  recycledSteel: 'bg-green-500',
                  newSteel: 'bg-gray-500',
                  aluminum: 'bg-blue-500',
                  glassRecycled: 'bg-green-500',
                  glassNew: 'bg-cyan-500',
                  sealants: 'bg-purple-500',
                  recycledAluminum: 'bg-green-500',
                  newAluminum: 'bg-blue-500',
                  naturalRubber: 'bg-amber-500',
                  ledComponents: 'bg-yellow-500',
                  plasticHousing: 'bg-red-500',
                  glassLens: 'bg-cyan-500',
                  castIron: 'bg-gray-600',
                  steel: 'bg-gray-500',
                  pcbComponents: 'bg-green-600',
                  rareEarthElements: 'bg-purple-600',
                  plasticConnectors: 'bg-red-500',
                  unknown: 'bg-gray-400'
                };
                
                return (
                  <div key={material}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600 capitalize">
                        {material.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                      <span className="font-medium">{percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${colors[material as keyof typeof colors] || 'bg-gray-400'} h-2 rounded-full`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Environmental KPIs */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">CO₂ Emissions</div>
              <div className="text-lg font-bold text-gray-800">{data.sustainability.emissions}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Waste Generated</div>
              <div className="text-lg font-bold text-gray-800">{data.sustainability.waste}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">% Recyclable</div>
              <div className="text-lg font-bold text-gray-800">{data.sustainability.recyclable}</div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="text-xs text-gray-600">Energy Usage</div>
              <div className="text-lg font-bold text-gray-800">{data.sustainability.energyUsage}</div>
            </div>
          </div>
          
          {/* Insight */}
          <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-400">
            <p className="text-sm text-green-800">{data.sustainability.insight}</p>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Actionable Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            Actionable Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.recommendations.length > 0 ? (
            data.recommendations.map((recommendation) => {
              const status = getActionStatus(recommendation.id);
              return (
                <div key={recommendation.id} className="border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 leading-relaxed mb-2">
                        {recommendation.text}
                      </p>
                      <div className="flex gap-2">
                        <span className={`text-xs px-2 py-1 rounded ${getImpactColor(recommendation.impact)}`}>
                          {recommendation.impact} Impact
                        </span>
                        <span className="text-xs px-2 py-1 rounded bg-gray-100 text-gray-700">
                          {recommendation.department}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    {status ? (
                      <span className={`text-xs px-2 py-1 rounded ${status.color}`}>
                        {status.text}
                      </span>
                    ) : (
                      <div className="flex flex-col gap-2 w-full">
                        <Button
                          size="sm"
                          onClick={() => handleAction(recommendation.id, 'accept')}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1.5 w-full"
                        >
                          Accept Recommendation
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(recommendation.id, 'send')}
                            className="border-blue-300 text-blue-700 hover:bg-blue-50 text-xs px-3 py-1.5 flex-1"
                          >
                            Send to Manager
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleAction(recommendation.id, 'alert')}
                            className="border-purple-300 text-purple-700 hover:bg-purple-50 text-xs px-3 py-1.5 flex-1"
                          >
                            Alert Team
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-4 text-gray-500">
              No recommendations available for this component.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 