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
  BarChart3,
  LineChart
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

export function WISMOAnalysis() {
  const [approvedItems, setApprovedItems] = useState<Set<string>>(new Set());
  const [rejectedItems, setRejectedItems] = useState<Set<string>>(new Set());
  const [editingStrategy, setEditingStrategy] = useState<string | null>(null);
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
    "proactive-delivery": {
      name: "Proactive Delivery Notifications",
      simulationRuns: 1200,
      confidenceLevel: 92,
      projectedReduction: 35,
      contactVolume: 1173,
      weeklyData: [
        { week: 1, contacts: 3200, reduction: 8, satisfaction: 72 },
        { week: 2, contacts: 2950, reduction: 16, satisfaction: 78 },
        { week: 3, contacts: 2650, reduction: 24, satisfaction: 82 },
        { week: 4, contacts: 2275, reduction: 35, satisfaction: 85 }
      ],
      scenarios: [
        { scenario: "Conservative", reduction: 28, confidence: 97 },
        { scenario: "Expected", reduction: 35, confidence: 92 },
        { scenario: "Optimistic", reduction: 42, confidence: 78 }
      ]
    },
    "size-guide": {
      name: "Interactive Size Guide",
      simulationRuns: 800,
      confidenceLevel: 85,
      projectedReduction: 22,
      contactVolume: 138,
      weeklyData: [
        { week: 1, contacts: 580, reduction: 8, satisfaction: 68 },
        { week: 2, contacts: 520, reduction: 12, satisfaction: 72 },
        { week: 3, contacts: 475, reduction: 18, satisfaction: 76 },
        { week: 4, contacts: 450, reduction: 22, satisfaction: 79 }
      ],
      scenarios: [
        { scenario: "Conservative", reduction: 15, confidence: 95 },
        { scenario: "Expected", reduction: 22, confidence: 85 },
        { scenario: "Optimistic", reduction: 30, confidence: 68 }
      ]
    },
    "self-service": {
      name: "Self-Service Returns",
      simulationRuns: 950,
      confidenceLevel: 88,
      projectedReduction: 18,
      contactVolume: 57,
      weeklyData: [
        { week: 1, contacts: 305, reduction: 3, satisfaction: 65 },
        { week: 2, contacts: 285, reduction: 9, satisfaction: 70 },
        { week: 3, contacts: 270, reduction: 14, satisfaction: 74 },
        { week: 4, contacts: 260, reduction: 18, satisfaction: 77 }
      ],
      scenarios: [
        { scenario: "Conservative", reduction: 12, confidence: 94 },
        { scenario: "Expected", reduction: 18, confidence: 88 },
        { scenario: "Optimistic", reduction: 25, confidence: 72 }
      ]
    },
    "ai-chatbot": {
      name: "AI Chatbot Enhancement",
      simulationRuns: 1100,
      confidenceLevel: 89,
      projectedReduction: 25,
      contactVolume: 175,
      weeklyData: [
        { week: 1, contacts: 195, reduction: 7, satisfaction: 71 },
        { week: 2, contacts: 175, reduction: 14, satisfaction: 76 },
        { week: 3, contacts: 165, reduction: 21, satisfaction: 80 },
        { week: 4, contacts: 155, reduction: 25, satisfaction: 83 }
      ],
      scenarios: [
        { scenario: "Conservative", reduction: 18, confidence: 95 },
        { scenario: "Expected", reduction: 25, confidence: 89 },
        { scenario: "Optimistic", reduction: 33, confidence: 74 }
      ]
    }
  };

  const contactDrivers = [
    {
      id: "delivery-status",
      reason: "Delivery Status Updates",
      percentage: 67,
      volume: "2,340",
      avgTime: "3.2 days",
      deflection: 85,
      strategy: "Proactive SMS updates"
    },
    {
      id: "size-fit",
      reason: "Size/Fit Concerns",
      percentage: 18,
      volume: "629",
      avgTime: "1.8 days",
      deflection: 60,
      strategy: "Enhanced size guides"
    },
    {
      id: "return-process",
      reason: "Return Process",
      percentage: 9,
      volume: "315",
      avgTime: "2.5 days",
      deflection: 70,
      strategy: "Self-service portal"
    },
    {
      id: "payment-issues",
      reason: "Payment Issues",
      percentage: 6,
      volume: "210",
      avgTime: "0.8 days",
      deflection: 45,
      strategy: "Clear billing info"
    }
  ];

  const reductionStrategies = [
    {
      id: "proactive-delivery",
      strategy: "Proactive Delivery Notifications",
      impact: "35% reduction",
      timeline: "Week 1",
      effort: "Low",
      cost: "£2K",
      color: "green"
    },
    {
      id: "size-guide",
      strategy: "Interactive Size Guide",
      impact: "22% reduction",
      timeline: "Week 2",
      effort: "Medium",
      cost: "£5K",
      color: "blue"
    },
    {
      id: "self-service",
      strategy: "Self-Service Returns",
      impact: "18% reduction",
      timeline: "Week 3",
      effort: "High",
      cost: "£8K",
      color: "purple"
    },
    {
      id: "ai-chatbot",
      strategy: "AI Chatbot Enhancement",
      impact: "25% reduction",
      timeline: "Week 4",
      effort: "Medium",
      cost: "£6K",
      color: "orange"
    }
  ];

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    };
    return colors[color as keyof typeof colors]?.[type] || '';
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">WISMO Contact Reduction</h2>
        <p className="text-gray-600">AI-driven strategies to reduce "Where Is My Order" contact volume by 22% over 4 weeks</p>
      </div>

      {/* Current Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Current Volume</p>
              <p className="text-2xl font-bold text-red-600">3,494</p>
              <p className="text-xs text-gray-500">contacts/month</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Target Reduction</p>
              <p className="text-2xl font-bold text-green-600">22%</p>
              <p className="text-xs text-gray-500">-769 contacts</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Cost Savings</p>
              <p className="text-2xl font-bold text-blue-600">£38K</p>
              <p className="text-xs text-gray-500">monthly</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-1">Emily Risk Score</p>
              <p className="text-2xl font-bold text-orange-600">68/100</p>
              <p className="text-xs text-gray-500">medium-high</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Drivers Analysis with Human Actions */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">Primary Contact Drivers</CardTitle>
              <p className="text-sm text-gray-600">AI-identified reasons why customers like Emily contact customer service</p>
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
            {contactDrivers.map((driver, index) => {
              const status = getItemStatus(driver.id);
              return (
                <div key={index} className={`p-4 hover:bg-gray-50 transition-colors ${
                  status === 'approved' ? 'bg-green-50/30' : 
                  status === 'rejected' ? 'bg-red-50/30' : ''
                }`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-medium text-gray-900">{driver.reason}</span>
                        <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                          {driver.percentage}% of contacts
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
                      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-2">
                        <div>Monthly Volume: <span className="font-medium">{driver.volume}</span></div>
                        <div>Avg Time to Contact: <span className="font-medium">{driver.avgTime}</span></div>
                      </div>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-sm text-gray-600">Deflection Strategy</p>
                      <p className="font-medium text-blue-600">{driver.strategy}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApprove(driver.id)}
                        className={`border-green-200 text-green-700 hover:bg-green-50 ${
                          status === 'approved' ? 'bg-green-50' : ''
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(driver.id)}
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
                        <span>AI Deflection Potential</span>
                        <span>{driver.deflection}%</span>
                      </div>
                      <Progress value={driver.deflection} className="h-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Reduction Strategies with Human Controls */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">AI-Recommended Reduction Strategies</CardTitle>
              <p className="text-sm text-gray-600">Phased approach to reduce WISMO contacts</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => setShowPerformanceData(true)}>
              <TrendingUp className="w-4 h-4 mr-1" />
              View Performance Data
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reductionStrategies.map((strategy, index) => {
              const status = getItemStatus(strategy.id);
              return (
                <div 
                  key={index} 
                  className={`border rounded-lg p-4 bg-white hover:bg-gray-50 transition-colors ${
                    status === 'approved' ? 'border-green-200' : 
                    status === 'rejected' ? 'border-red-200' : 'border-gray-200'
                  }`}
                >
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">{strategy.strategy}</h4>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-gray-50 text-gray-700">
                          {strategy.effort}
                        </Badge>
                        <div className="flex gap-1">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleApprove(strategy.id)}
                            className={`h-7 w-7 p-0 text-green-600 hover:bg-green-50 ${
                              status === 'approved' ? 'bg-green-50' : ''
                            }`}
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setEditingStrategy(strategy.id)}
                            className="h-7 w-7 p-0 text-gray-600 hover:bg-gray-50"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">{strategy.timeline}</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Expected Impact</span>
                      <span className="font-bold text-green-600">{strategy.impact}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm">Implementation Cost</span>
                      <span className="font-medium">{strategy.cost}</span>
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
        </CardContent>
      </Card>

      {/* Emily-Specific Interventions - Toned Down */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg">Emily Persona - Targeted Interventions</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">High-Risk Behaviors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm">Contacts within 3 days of order</span>
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">42%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm">Prefers live chat over email</span>
                  <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">78%</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <span className="text-sm">Back-to-school urgency</span>
                  <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">High</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Proactive Measures</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</div>
                  <span className="text-sm">SMS delivery updates at dispatch & delivery</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</div>
                  <span className="text-sm">Interactive size guide for children's items</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</div>
                  <span className="text-sm">Pre-delivery FAQ for school uniform orders</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Success Metrics - Toned Down */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Success Metrics & Tracking</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-green-600 mb-2">-769</div>
              <p className="text-sm text-gray-600">Target monthly contact reduction</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">£38K</div>
              <p className="text-sm text-gray-600">Monthly cost savings</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="text-2xl font-bold text-purple-600 mb-2">95%</div>
              <p className="text-sm text-gray-600">Target customer satisfaction</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg border border-gray-300">
            <h4 className="font-semibold mb-2">Weekly Tracking KPIs</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
              <div>Contact volume by reason</div>
              <div>Deflection rate by channel</div>
              <div>Customer satisfaction scores</div>
              <div>Time to resolution metrics</div>
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
              Our agentic system ran 4,000+ simulations across WISMO reduction strategies before presenting these recommendations
            </p>
          </DialogHeader>
          
          <div className="space-y-6">
            {reductionStrategies.map((strategy) => {
              const simulation = simulationData[strategy.id as keyof typeof simulationData];
              return (
                <Card key={strategy.id} className="border-gray-200">
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
                            <div className="text-lg font-bold text-green-600">{scenario.reduction}%</div>
                            <div className="text-xs text-gray-500">{scenario.confidence}% confidence</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weekly Progression Chart */}
                    <div>
                      <h4 className="font-medium mb-3 flex items-center gap-2">
                        <LineChart className="w-4 h-4" />
                        4-Week Contact Reduction Projection
                      </h4>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-4 gap-4 mb-3">
                          {simulation.weeklyData.map((week, idx) => (
                            <div key={idx} className="text-center">
                              <div className="text-xs text-gray-500 mb-1">Week {week.week}</div>
                              <div className="h-20 bg-red-100 rounded relative flex items-end justify-center">
                                <div 
                                  className="bg-red-500 rounded-t w-full transition-all duration-300"
                                  style={{ height: `${(week.reduction / 40) * 100}%` }}
                                ></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="text-xs font-bold text-red-800">{week.reduction}%</span>
                                </div>
                              </div>
                              <div className="text-xs font-medium mt-1">{week.contacts} contacts</div>
                              <div className="text-xs text-gray-500">{week.satisfaction}% satisfaction</div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-3 mt-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Total Contact Reduction:</span>
                            <span className="font-bold">{simulation.contactVolume} contacts/month</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Final Reduction Rate:</span>
                            <span className="font-bold text-green-600">{simulation.projectedReduction}%</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h4 className="font-medium mb-2 text-blue-900">AI Insights</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Simulation identified optimal implementation timing for {strategy.timeline.toLowerCase()}</li>
                        <li>• Peak effectiveness expected by week 4 based on customer behavior patterns</li>
                        <li>• Contact deflection algorithms predict {simulation.projectedReduction}% reduction rate</li>
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
                    <div className="text-2xl font-bold text-blue-600">4,050</div>
                    <div className="text-sm text-gray-600">Total Simulations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">-1,543</div>
                    <div className="text-sm text-gray-600">Contact Reduction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">£38K</div>
                    <div className="text-sm text-gray-600">Monthly Savings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">89%</div>
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