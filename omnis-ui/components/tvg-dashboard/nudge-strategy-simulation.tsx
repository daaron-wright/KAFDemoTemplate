"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function NudgeStrategySimulation() {
  const funnelData = [
    {
      stage: "Homepage",
      baseline: 12.5,
      withNudge: 16.8,
      lift: 34.4,
      nudgeType: "Personalized Banner",
      example: "\"Back to school essentials for Emily's family\""
    },
    {
      stage: "Product Page",
      baseline: 8.2,
      withNudge: 14.7,
      lift: 79.3,
      nudgeType: "Bundle Suggestion",
      example: "\"Complete your uniform - add matching shoes for £5 off\""
    },
    {
      stage: "Basket",
      baseline: 15.6,
      withNudge: 19.1,
      lift: 22.4,
      nudgeType: "Gap Analysis",
      example: "\"Don't forget: Lunchbox to complete the school set\""
    },
    {
      stage: "Checkout",
      baseline: 68.5,
      withNudge: 73.2,
      lift: 6.9,
      nudgeType: "Last Chance Offer",
      example: "\"Add notebook set now - save £3 and avoid extra delivery\""
    }
  ];

  const nudgeRecommendations = [
    {
      nudge: "Add matching shoes now — save £5",
      placement: "Product Page",
      ctr: 28.4,
      cvr: 8.1,
      aoaUplift: 4.85,
      channel: "Web + App",
      timing: "Immediate",
      riskScore: "Low",
      status: "Ready to Deploy"
    },
    {
      nudge: "Complete your school uniform bundle",
      placement: "Basket",
      ctr: 22.7,
      cvr: 12.3,
      aoaUplift: 7.20,
      channel: "App Push",
      timing: "7:30 PM",
      riskScore: "Very Low",
      status: "A/B Testing"
    },
    {
      nudge: "Add notebook set at checkout",
      placement: "Checkout",
      ctr: 13.2,
      cvr: 5.3,
      aoaUplift: 2.40,
      channel: "Email Follow-up",
      timing: "12h later",
      riskScore: "Medium",
      status: "Concept"
    },
    {
      nudge: "Electronics bundle: Tablet + Case + Headphones",
      placement: "Product Page",
      ctr: 31.8,
      cvr: 15.7,
      aoaUplift: 12.30,
      channel: "Web + App",
      timing: "Immediate",
      riskScore: "Low",
      status: "Ready to Deploy"
    },
    {
      nudge: "Free delivery on stationery when you add £10 more",
      placement: "Basket",
      ctr: 18.9,
      cvr: 7.4,
      aoaUplift: 3.60,
      channel: "Web",
      timing: "Immediate",
      riskScore: "High",
      status: "Review Needed"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ready to Deploy": return "bg-green-500 text-white";
      case "A/B Testing": return "bg-blue-500 text-white";
      case "Concept": return "bg-yellow-500 text-black";
      case "Review Needed": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Very Low": return "text-green-600";
      case "Low": return "text-green-500";
      case "Medium": return "text-yellow-500";
      case "High": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Funnel Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Conversion Funnel with Nudge Impact</CardTitle>
          <p className="text-gray-600">Conversion lift at each customer touchpoint</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((stage, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-lg">{stage.stage}</h3>
                    <p className="text-sm text-gray-600">{stage.nudgeType}</p>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-green-100 text-green-700">
                      +{stage.lift.toFixed(1)}% Lift
                    </Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Baseline CVR</span>
                      <span>{stage.baseline}%</span>
                    </div>
                    <Progress value={stage.baseline * 2} className="h-3 mb-2" />
                    
                    <div className="flex justify-between text-sm mb-1">
                      <span>With Nudge</span>
                      <span className="font-bold text-green-600">{stage.withNudge}%</span>
                    </div>
                    <Progress value={stage.withNudge * 2} className="h-3" />
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded">
                    <p className="text-sm font-medium mb-1">Example Nudge:</p>
                    <p className="text-sm italic text-gray-700">{stage.example}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Nudge Strategy Table */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Recommended Nudge Strategies</CardTitle>
          <p className="text-gray-600">Performance metrics and deployment readiness</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Nudges</TabsTrigger>
              <TabsTrigger value="ready">Ready to Deploy</TabsTrigger>
              <TabsTrigger value="testing">A/B Testing</TabsTrigger>
              <TabsTrigger value="concept">Concepts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-4">
              {nudgeRecommendations.map((nudge, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{nudge.nudge}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>📍 {nudge.placement}</span>
                        <span>📱 {nudge.channel}</span>
                        <span>⏰ {nudge.timing}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Badge className={getStatusColor(nudge.status)}>
                        {nudge.status}
                      </Badge>
                      <span className={`text-sm font-medium ${getRiskColor(nudge.riskScore)}`}>
                        Risk: {nudge.riskScore}
                      </span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded">
                      <p className="text-2xl font-bold text-blue-600">{nudge.ctr}%</p>
                      <p className="text-sm text-gray-600">CTR</p>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded">
                      <p className="text-2xl font-bold text-green-600">{nudge.cvr}%</p>
                      <p className="text-sm text-gray-600">CVR</p>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded">
                      <p className="text-2xl font-bold text-purple-600">£{nudge.aoaUplift}</p>
                      <p className="text-sm text-gray-600">AOV Uplift</p>
                    </div>
                    <div className="flex items-center justify-center">
                      {nudge.status === "Ready to Deploy" && (
                        <Button className="bg-green-600 hover:bg-green-700" size="sm">
                          Deploy Now
                        </Button>
                      )}
                      {nudge.status === "A/B Testing" && (
                        <Button variant="outline" size="sm">
                          View Test
                        </Button>
                      )}
                      {nudge.status === "Concept" && (
                        <Button variant="outline" size="sm">
                          Start Test
                        </Button>
                      )}
                      {nudge.status === "Review Needed" && (
                        <Button variant="destructive" size="sm">
                          Review
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="ready">
              {nudgeRecommendations
                .filter(nudge => nudge.status === "Ready to Deploy")
                .map((nudge, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{nudge.nudge}</h3>
                    <p className="text-sm text-gray-600">Ready for immediate deployment</p>
                  </div>
                ))}
            </TabsContent>
            
            <TabsContent value="testing">
              {nudgeRecommendations
                .filter(nudge => nudge.status === "A/B Testing")
                .map((nudge, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{nudge.nudge}</h3>
                    <p className="text-sm text-gray-600">Currently in A/B testing phase</p>
                  </div>
                ))}
            </TabsContent>
            
            <TabsContent value="concept">
              {nudgeRecommendations
                .filter(nudge => nudge.status === "Concept")
                .map((nudge, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{nudge.nudge}</h3>
                    <p className="text-sm text-gray-600">Concept ready for testing</p>
                  </div>
                ))}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Optimal Recommendations */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">🏆 Optimal Nudge Recommendations for Emily</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Best Performing Placements</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Product Page Bundles</span>
                  <Badge>+79% CVR Lift</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Basket Gap Analysis</span>
                  <Badge>+22% CVR Lift</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Homepage Personalization</span>
                  <Badge>+34% CVR Lift</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Channel & Timing Strategy</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>App Push @ 7:30 PM</span>
                  <Badge className="bg-green-100 text-green-700">39% Interaction</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Email @ 8:00 AM</span>
                  <Badge className="bg-blue-100 text-blue-700">22% Read Rate</Badge>
                </div>
                <div className="flex justify-between items-center p-2 bg-white rounded">
                  <span>Follow-up Email 12h</span>
                  <Badge className="bg-purple-100 text-purple-700">18% CVR</Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-white rounded-lg">
            <h4 className="font-semibold mb-2">💡 Implementation Priority:</h4>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>Deploy product page bundle suggestions immediately</li>
              <li>Enable basket gap analysis for incomplete sets</li>
              <li>Schedule App push notifications for 7:30 PM</li>
              <li>Avoid SMS and desktop browser notifications for Emily</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 