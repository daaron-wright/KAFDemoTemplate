"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { useState } from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  User,
  Bot,
  X,
  BarChart3,
  LineChart
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function BasketGapAnalysis() {
  const [approvedItems, setApprovedItems] = useState<Set<string>>(new Set());
  const [rejectedItems, setRejectedItems] = useState<Set<string>>(new Set());
  const [editingBundle, setEditingBundle] = useState<string | null>(null);
  const [showPerformanceData, setShowPerformanceData] = useState(false);

  const handleApprove = (id: string) => {
    setApprovedItems(prev => new Set(prev).add(id));
    setRejectedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleReject = (id: string) => {
    setRejectedItems(prev => new Set(prev).add(id));
    setApprovedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const getItemStatus = (id: string) => {
    if (approvedItems.has(id)) return 'approved';
    if (rejectedItems.has(id)) return 'rejected';
    return 'pending';
  };

  // Mock simulation data for the popup
  const simulationData = {
    "uniform-bundle": {
      name: "Complete Uniform Bundle",
      simulationRuns: 1000,
      confidenceLevel: 89,
      projectedUplift: 18.2,
      conversionRate: 34,
      weeklyData: [
        { week: 1, orders: 1250, revenue: 22750, conversion: 28 },
        { week: 2, orders: 1480, revenue: 26640, conversion: 31 },
        { week: 3, orders: 1620, revenue: 29160, conversion: 33 },
        { week: 4, orders: 1750, revenue: 31500, conversion: 34 }
      ],
      scenarios: [
        { scenario: "Conservative", uplift: 12.5, confidence: 95 },
        { scenario: "Expected", uplift: 18.2, confidence: 89 },
        { scenario: "Optimistic", uplift: 24.8, confidence: 72 }
      ]
    },
    "study-bundle": {
      name: "Study Essentials Pack",
      simulationRuns: 1000,
      confidenceLevel: 82,
      projectedUplift: 12.0,
      conversionRate: 28,
      weeklyData: [
        { week: 1, orders: 980, revenue: 11760, conversion: 24 },
        { week: 2, orders: 1120, revenue: 13440, conversion: 26 },
        { week: 3, orders: 1280, revenue: 15360, conversion: 27 },
        { week: 4, orders: 1400, revenue: 16800, conversion: 28 }
      ],
      scenarios: [
        { scenario: "Conservative", uplift: 8.5, confidence: 95 },
        { scenario: "Expected", uplift: 12.0, confidence: 82 },
        { scenario: "Optimistic", uplift: 16.2, confidence: 68 }
      ]
    },
    "tech-bundle": {
      name: "Tech Protection Bundle",
      simulationRuns: 1000,
      confidenceLevel: 76,
      projectedUplift: 15.0,
      conversionRate: 22,
      weeklyData: [
        { week: 1, orders: 720, revenue: 10800, conversion: 18 },
        { week: 2, orders: 840, revenue: 12600, conversion: 20 },
        { week: 3, orders: 920, revenue: 13800, conversion: 21 },
        { week: 4, orders: 980, revenue: 14700, conversion: 22 }
      ],
      scenarios: [
        { scenario: "Conservative", uplift: 10.2, confidence: 95 },
        { scenario: "Expected", uplift: 15.0, confidence: 76 },
        { scenario: "Optimistic", uplift: 20.5, confidence: 58 }
      ]
    }
  };

  const attachOpportunities = [
    {
      id: "uniform-sports",
      primary: "School Uniforms",
      missed: "Sports Shoes",
      frequency: 73,
      value: "£22",
      confidence: 89,
      reason: "Most uniforms require sports shoes for PE classes"
    },
    {
      id: "stationery-lunch",
      primary: "Stationery",
      missed: "Lunch Boxes",
      frequency: 67,
      value: "£15",
      confidence: 82,
      reason: "Back-to-school preparation often includes lunch planning"
    },
    {
      id: "bags-cases",
      primary: "School Bags",
      missed: "Protective Cases",
      frequency: 58,
      value: "£12",
      confidence: 76,
      reason: "Electronic device protection for tablets/laptops"
    },
    {
      id: "sports-water",
      primary: "Sports Equipment",
      missed: "Water Bottles",
      frequency: 54,
      value: "£8",
      confidence: 71,
      reason: "Hydration essential for sports activities"
    }
  ];

  const bundleStrategies = [
    {
      id: "uniform-bundle",
      name: "Complete Uniform Bundle",
      items: ["Uniform Set", "Sports Shoes", "PE Kit"],
      discount: "15%",
      uplift: "£18",
      conversion: 34,
      color: "blue"
    },
    {
      id: "study-bundle",
      name: "Study Essentials Pack",
      items: ["Stationery Set", "Lunch Box", "Water Bottle"],
      discount: "12%",
      uplift: "£12",
      conversion: 28,
      color: "green"
    },
    {
      id: "tech-bundle",
      name: "Tech Protection Bundle",
      items: ["School Bag", "Tablet Case", "Cable Set"],
      discount: "10%",
      uplift: "£15",
      conversion: 22,
      color: "purple"
    }
  ];

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' }
    };
    return colors[color as keyof typeof colors]?.[type] || '';
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Analysis Indicator */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Attach Rate Strategy</h2>
          <p className="text-gray-600">Cross-sell opportunities to increase basket value for Emily's shopping patterns</p>
        </div>
      </div>

      {/* Current Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Attach Rate</p>
              <p className="text-2xl font-bold text-orange-600">1.2</p>
              <p className="text-xs text-gray-500">items per order</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Target Attach Rate</p>
              <p className="text-2xl font-bold text-green-600">1.8</p>
              <p className="text-xs text-gray-500">+50% improvement</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Missed Opportunities</p>
              <p className="text-2xl font-bold text-red-600">£15-25</p>
              <p className="text-xs text-gray-500">per order</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Success Rate</p>
              <p className="text-2xl font-bold text-blue-600">34%</p>
              <p className="text-xs text-gray-500">bundle acceptance</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Attach Opportunities with Human Actions */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">High-Value Cross-Sell Opportunities</CardTitle>
              <p className="text-sm text-gray-600">AI-identified items frequently missed by Emily and similar customers</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve All
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                Add Note
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {attachOpportunities.map((opportunity, index) => {
              const status = getItemStatus(opportunity.id);
              return (
                <div key={index} className={`p-4 hover:bg-gray-50 transition-colors ${
                  status === 'approved' ? 'bg-green-50/30' : 
                  status === 'rejected' ? 'bg-red-50/30' : ''
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">
                          {opportunity.primary} → {opportunity.missed}
                        </span>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {opportunity.frequency}% miss rate
                        </Badge>
                        {status === 'approved' && (
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Approved
                          </Badge>
                        )}
                        {status === 'rejected' && (
                          <Badge className="bg-red-100 text-red-800 border-red-200">
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{opportunity.reason}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-lg font-bold text-green-600">{opportunity.value}</p>
                      <p className="text-xs text-gray-500">avg value</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApprove(opportunity.id)}
                        className={`border-green-200 text-green-700 hover:bg-green-50 ${
                          status === 'approved' ? 'bg-green-50' : ''
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(opportunity.id)}
                        className={`border-red-200 text-red-700 hover:bg-red-50 ${
                          status === 'rejected' ? 'bg-red-50' : ''
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-50">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex-1 mr-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>AI Confidence Score</span>
                        <span>{opportunity.confidence}%</span>
                      </div>
                      <Progress value={opportunity.confidence} className="h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bundle Strategies with Human Controls */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">AI-Recommended Bundle Strategies</CardTitle>
              <p className="text-sm text-gray-600">Proven combinations that increase attach rates</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPerformanceData(true)}>
              <TrendingUp className="w-4 h-4 mr-1" />
              View Performance Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {bundleStrategies.map((bundle, index) => {
              const status = getItemStatus(bundle.id);
              return (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors ${
                    status === 'approved' ? 'border-green-200' : 
                    status === 'rejected' ? 'border-red-200' : 'border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-gray-900">{bundle.name}</h4>
                    <div className="flex gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleApprove(bundle.id)}
                        className={`h-7 w-7 p-0 text-green-600 hover:bg-green-50 ${
                          status === 'approved' ? 'bg-green-50' : ''
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setEditingBundle(bundle.id)}
                        className="h-7 w-7 p-0 text-gray-600 hover:bg-gray-50"
                      >
                        <Edit3 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-1 mb-4">
                    {bundle.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="text-sm text-gray-600">
                        • {item}
                      </div>
                    ))}
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Discount</span>
                      <Badge variant="outline" className="bg-gray-50 text-gray-700">
                        {bundle.discount}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Avg Uplift</span>
                      <span className="font-bold text-green-600">{bundle.uplift}</span>
                    </div>

                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Conversion Rate</span>
                        <span>{bundle.conversion}%</span>
                      </div>
                      <Progress value={bundle.conversion} className="h-2" />
                    </div>

                    {status === 'approved' && (
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        <Clock className="w-4 h-4 mr-1" />
                        Schedule Implementation
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Channel Effectiveness Row - Toned Down */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="font-semibold text-gray-900 mb-3">Top-Performing Channels</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm font-medium">App</span>
                </div>
                <span className="text-lg font-bold text-blue-600">39%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Email</span>
                </div>
                <span className="text-lg font-bold text-green-600">22%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span className="text-sm font-medium">Checkout Prompt</span>
                </div>
                <span className="text-lg font-bold text-purple-600">18%</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-3">Bundle interaction rates by channel - showing not just what to offer, but where</p>
          </div>
        </CardContent>
      </Card>

      {/* Implementation Timeline with Human Oversight */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">4-Week Implementation Plan</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-1" />
                Assign Owner
              </Button>
              <Button variant="outline" size="sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Flag for Review
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">1</div>
              <div className="flex-1">
                <h4 className="font-medium">Week 1: Deploy Uniform + Sports Shoes Bundle</h4>
                <p className="text-sm text-gray-600">Target 73% of customers missing sports shoes • Expected uplift: £18/order</p>
              </div>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">2</div>
              <div className="flex-1">
                <h4 className="font-medium">Week 2: Launch Study Essentials Pack</h4>
                <p className="text-sm text-gray-600">Cross-sell lunch boxes with stationery • Expected uplift: £12/order</p>
              </div>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm font-bold">3</div>
              <div className="flex-1">
                <h4 className="font-medium">Week 3: A/B Test Bundle Discounts</h4>
                <p className="text-sm text-gray-600">Test 10% vs 15% discounts to optimize conversion rates</p>
              </div>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="w-8 h-8 rounded-full bg-gray-600 text-white flex items-center justify-center text-sm font-bold">4</div>
              <div className="flex-1">
                <h4 className="font-medium">Week 4: Measure & Scale Successful Bundles</h4>
                <p className="text-sm text-gray-600">Analyze performance and expand best-performing bundles</p>
              </div>
              <Button variant="outline" size="sm">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Data Popup */}
      <Dialog open={showPerformanceData} onOpenChange={setShowPerformanceData}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">AI Simulation Results</DialogTitle>
            <p className="text-sm text-gray-600">
              Our agentic system ran 1,000+ simulations for each bundle recommendation before presenting these strategies
            </p>
          </DialogHeader>
          
          <div className="space-y-6">
            {bundleStrategies.map((bundle) => {
              const simulation = simulationData[bundle.id as keyof typeof simulationData];
              return (
                <Card key={bundle.id} className="border-gray-200">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{simulation.name}</h3>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700">
                          <BarChart3 className="w-3 h-3 mr-1" />
                          {simulation.simulationRuns} simulations
                        </Badge>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          {simulation.confidenceLevel}% confidence
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    {/* Scenario Analysis */}
                    <div>
                      <h4 className="font-medium mb-3">Scenario Analysis</h4>
                      <div className="grid grid-cols-3 gap-3">
                        {simulation.scenarios.map((scenario, idx) => (
                          <div key={idx} className="p-3 bg-gray-50 rounded-lg">
                            <div className="text-sm font-medium text-gray-900">{scenario.scenario}</div>
                            <div className="text-lg font-bold text-green-600">£{scenario.uplift}</div>
                            <div className="text-xs text-gray-500">{scenario.confidence}% confidence</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Progression Chart */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <LineChart className="w-4 h-4" />
                        4-Week Performance Projection
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-4 gap-4 mb-3">
                          {simulation.weeklyData.map((week, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Week {week.week}</div>
                              <div className="h-20 bg-blue-100 rounded relative flex items-end justify-center">
                                <div 
                                  className="bg-blue-500 rounded-t w-full transition-all duration-300"
                                  style={{ height: `${(week.conversion / 40) * 100}%` }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xs font-bold text-blue-800">{week.conversion}%</span>
                                </div>
                              </div>
                              <div className="text-xs font-medium mt-1">{week.orders} orders</div>
                              <div className="text-xs text-gray-500">£{week.revenue.toLocaleString()}</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Projected Revenue:</span>
                            <span className="font-bold">£{simulation.weeklyData.reduce((sum, week) => sum + week.revenue, 0).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Final Conversion Rate:</span>
                            <span className="font-bold text-green-600">{simulation.conversionRate}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-blue-900">AI Insights</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Simulation identified optimal discount rate at {bundle.discount}</li>
                        <li>• Peak performance expected in weeks 3-4 based on adoption curves</li>
                        <li>• Cross-sell timing algorithms predict {simulation.conversionRate}% conversion rate</li>
                        <li>• Risk assessment shows {simulation.confidenceLevel}% probability of meeting targets</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
            
            {/* Summary Stats */}
            <Card className="border-gray-200 bg-gray-50">
              <CardHeader>
                <h3 className="font-semibold">Simulation Summary</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">3,000+</div>
                    <div className="text-sm text-gray-600">Total Simulations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">£65K</div>
                    <div className="text-sm text-gray-600">Combined Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">28%</div>
                    <div className="text-sm text-gray-600">Avg Conversion</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">82%</div>
                    <div className="text-sm text-gray-600">Avg Confidence</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 