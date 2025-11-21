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
  LineChart,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Download,
  Share,
  Eye,
  Target,
  Zap
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Image from "next/image";

export function AIMarketingGenerator() {
  const [approvedCampaigns, setApprovedCampaigns] = useState<Set<string>>(new Set());
  const [rejectedCampaigns, setRejectedCampaigns] = useState<Set<string>>(new Set());
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showPerformanceData, setShowPerformanceData] = useState(false);
  const [isCarouselPlaying, setIsCarouselPlaying] = useState(false);

  const handleApprove = (id: string) => {
    setApprovedCampaigns(prev => new Set(prev).add(id));
    setRejectedCampaigns(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const handleReject = (id: string) => {
    setRejectedCampaigns(prev => new Set(prev).add(id));
    setApprovedCampaigns(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const getItemStatus = (id: string) => {
    if (approvedCampaigns.has(id)) return 'approved';
    if (rejectedCampaigns.has(id)) return 'rejected';
    return 'pending';
  };

  const marketingCampaigns = [
    {
      id: "minimal-clean",
      name: "Minimal Clean Design",
      image: "/images/ChatGPT Image Jul 1, 2025, 11_54_39 PM.png",
      style: "Minimalist",
      target: "Premium Audience",
      ctr: 4.2,
      engagement: 78,
      conversion: 12.5
    },
    {
      id: "playful-elements",
      name: "Playful Elements Design",
      image: "/images/ChatGPT Image Jul 2, 2025, 12_00_21 AM.png",
      style: "Playful & Fun",
      target: "Young Families",
      ctr: 5.8,
      engagement: 92,
      conversion: 15.3
    },
    {
      id: "bold-red",
      name: "Bold Red Gaming Theme",
      image: "/images/ChatGPT Image Jul 2, 2025, 12_05_54 AM.png",
      style: "Bold & Energetic",
      target: "Gaming Parents",
      ctr: 6.1,
      engagement: 85,
      conversion: 14.7
    },
    {
      id: "purple-elegant",
      name: "Purple Elegant Design",
      image: "/images/ChatGPT Image Jul 2, 2025, 12_07_23 AM.png",
      style: "Elegant & Modern",
      target: "Style-Conscious",
      ctr: 4.9,
      engagement: 81,
      conversion: 13.2
    }
  ];

  const performanceMetrics = [
    {
      metric: "Overall CTR",
      current: 3.2,
      aiPredicted: 5.3,
      improvement: "+65%",
      confidence: 89
    },
    {
      metric: "Engagement Rate",
      current: 65,
      aiPredicted: 84,
      improvement: "+29%",
      confidence: 92
    },
    {
      metric: "Conversion Rate",
      current: 8.1,
      aiPredicted: 13.9,
      improvement: "+72%",
      confidence: 87
    },
    {
      metric: "Brand Recall",
      current: 42,
      aiPredicted: 68,
      improvement: "+62%",
      confidence: 85
    }
  ];

  const simulationData = {
    totalVariations: 847,
    abTestsDuration: 14,
    sampleSize: 50000,
    confidenceLevel: 95,
    weeklyProjections: [
      { week: 1, impressions: 125000, clicks: 6250, conversions: 875, spend: 2500 },
      { week: 2, impressions: 142000, clicks: 7810, conversions: 1095, spend: 2850 },
      { week: 3, impressions: 158000, clicks: 9164, conversions: 1278, spend: 3160 },
      { week: 4, impressions: 175000, clicks: 10500, conversions: 1463, spend: 3500 }
    ]
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % marketingCampaigns.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + marketingCampaigns.length) % marketingCampaigns.length);
  };

  const currentCampaign = marketingCampaigns[currentImageIndex];
  const currentStatus = getItemStatus(currentCampaign.id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">AI-Generated Marketing Heroes</h2>
        <p className="text-gray-600">AI-optimized hero sections for Back-to-School campaigns with performance predictions</p>
      </div>

      {/* Main Campaign Preview & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign Carousel */}
        <div className="lg:col-span-2">
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bot className="w-5 h-5 text-blue-600" />
                    Campaign Preview
                  </CardTitle>
                  <p className="text-sm text-gray-600">AI-generated variations for Back-to-School promotion</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    {currentImageIndex + 1} of {marketingCampaigns.length}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsCarouselPlaying(!isCarouselPlaying)}
                  >
                    {isCarouselPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative">
                {/* Campaign Image */}
                <div className="aspect-[16/10] relative overflow-hidden bg-gray-100">
                  <Image
                    src={currentCampaign.image}
                    alt={currentCampaign.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Status Badge */}
                  {currentStatus !== 'pending' && (
                    <div className="absolute top-4 right-4">
                      {currentStatus === 'approved' && (
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Approved
                        </Badge>
                      )}
                      {currentStatus === 'rejected' && (
                        <Badge className="bg-red-100 text-red-800 border-red-200">
                          <XCircle className="w-3 h-3 mr-1" />
                          Rejected
                        </Badge>
                      )}
                    </div>
                  )}
                </div>

                {/* Campaign Info & Controls */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{currentCampaign.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span>Style: <span className="font-medium">{currentCampaign.style}</span></span>
                        <span>•</span>
                        <span>Target: <span className="font-medium">{currentCampaign.target}</span></span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApprove(currentCampaign.id)}
                        className={`border-green-200 text-green-700 hover:bg-green-50 ${
                          currentStatus === 'approved' ? 'bg-green-50' : ''
                        }`}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleReject(currentCampaign.id)}
                        className={`border-red-200 text-red-700 hover:bg-red-50 ${
                          currentStatus === 'rejected' ? 'bg-red-50' : ''
                        }`}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-50">
                        <Edit3 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-gray-600 hover:bg-gray-50">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Performance Metrics for Current Campaign */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{currentCampaign.ctr}%</div>
                      <div className="text-xs text-gray-600">Predicted CTR</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{currentCampaign.engagement}%</div>
                      <div className="text-xs text-gray-600">Engagement</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{currentCampaign.conversion}%</div>
                      <div className="text-xs text-gray-600">Conversion</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  {currentStatus === 'approved' && (
                    <div className="mt-4 flex gap-2">
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700">
                        <Target className="w-4 h-4 mr-2" />
                        Launch Campaign
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Zap className="w-4 h-4 mr-2" />
                        A/B Test Setup
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Sidebar */}
        <div className="space-y-6">
          {/* AI Performance Predictions */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">AI Performance Predictions</CardTitle>
                <Button variant="outline" size="sm" onClick={() => setShowPerformanceData(true)}>
                  <TrendingUp className="w-4 h-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{metric.metric}</span>
                      <span className="text-green-600 font-bold">{metric.improvement}</span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-600">
                      <span>Current: {metric.current}%</span>
                      <span>Predicted: {metric.aiPredicted}%</span>
                    </div>
                    <Progress value={metric.confidence} className="h-2" />
                    <div className="text-xs text-gray-500 text-center">{metric.confidence}% confidence</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="border-gray-200">
            <CardHeader className="border-b border-gray-100">
              <CardTitle className="text-lg">Campaign Actions</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Assign Creative Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Add Feedback
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Flag for Legal Review
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Share className="w-4 h-4 mr-2" />
                  Share with Team
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Campaign Gallery */}
      <Card className="border-gray-200">
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg">All AI-Generated Variations</CardTitle>
              <p className="text-sm text-gray-600">Browse and compare all generated campaign options</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-green-700 border-green-200 hover:bg-green-50">
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Approve All
              </Button>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-1" />
                Bulk Actions
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketingCampaigns.map((campaign, index) => {
              const status = getItemStatus(campaign.id);
              return (
                <div 
                  key={campaign.id}
                  className={`border rounded-lg overflow-hidden cursor-pointer transition-all hover:shadow-md ${
                    currentImageIndex === index ? 'ring-2 ring-blue-500' : 'border-gray-200'
                  } ${
                    status === 'approved' ? 'border-green-200 bg-green-50/30' : 
                    status === 'rejected' ? 'border-red-200 bg-red-50/30' : ''
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <div className="aspect-[16/10] relative">
                    <Image
                      src={campaign.image}
                      alt={campaign.name}
                      fill
                      className="object-cover"
                    />
                    {status !== 'pending' && (
                      <div className="absolute top-2 right-2">
                        {status === 'approved' && (
                          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                        )}
                        {status === 'rejected' && (
                          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                            <XCircle className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h4 className="font-medium text-sm text-gray-900 mb-1">{campaign.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{campaign.style}</p>
                    <div className="flex justify-between text-xs">
                      <span className="text-blue-600">{campaign.ctr}% CTR</span>
                      <span className="text-green-600">{campaign.conversion}% Conv</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Performance Data Popup */}
      <Dialog open={showPerformanceData} onOpenChange={setShowPerformanceData}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">AI Marketing Performance Analysis</DialogTitle>
            <p className="text-sm text-gray-600">
              Comprehensive analysis of {simulationData.totalVariations} generated variations across {simulationData.abTestsDuration} days of A/B testing
            </p>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Overall Simulation Stats */}
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="font-semibold">Simulation Overview</h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{simulationData.totalVariations}</div>
                    <div className="text-sm text-gray-600">Variations Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{simulationData.sampleSize.toLocaleString()}</div>
                    <div className="text-sm text-gray-600">Sample Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{simulationData.abTestsDuration}</div>
                    <div className="text-sm text-gray-600">Days Testing</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{simulationData.confidenceLevel}%</div>
                    <div className="text-sm text-gray-600">Confidence Level</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Performance Projection */}
            <Card className="border-gray-200">
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <LineChart className="w-4 h-4" />
                  4-Week Performance Forecast
                </h3>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    {simulationData.weeklyProjections.map((week, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-xs text-gray-500 mb-1">Week {week.week}</div>
                        <div className="h-20 bg-blue-100 rounded relative flex items-end justify-center">
                          <div 
                            className="bg-blue-500 rounded-t w-full transition-all duration-300"
                            style={{ height: `${(week.conversions / 2000) * 100}%` }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-xs font-bold text-blue-800">{week.conversions}</span>
                          </div>
                        </div>
                        <div className="text-xs font-medium mt-1">{week.impressions.toLocaleString()} imp</div>
                        <div className="text-xs text-gray-500">£{week.spend}</div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Conversions:</span>
                      <span className="font-bold">{simulationData.weeklyProjections.reduce((sum, week) => sum + week.conversions, 0)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Total Ad Spend:</span>
                      <span className="font-bold">£{simulationData.weeklyProjections.reduce((sum, week) => sum + week.spend, 0)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Individual Campaign Performance */}
            {marketingCampaigns.map((campaign) => (
              <Card key={campaign.id} className="border-gray-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{campaign.name}</h3>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700">
                        {campaign.style}
                      </Badge>
                      <Badge variant="outline" className="bg-green-50 text-green-700">
                        {campaign.target}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Click-Through Rate</div>
                      <div className="text-lg font-bold text-blue-600">{campaign.ctr}%</div>
                      <div className="text-xs text-gray-500">Industry avg: 3.2%</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Engagement</div>
                      <div className="text-lg font-bold text-green-600">{campaign.engagement}%</div>
                      <div className="text-xs text-gray-500">Industry avg: 65%</div>
                    </div>
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="text-sm font-medium text-gray-900">Conversion</div>
                      <div className="text-lg font-bold text-purple-600">{campaign.conversion}%</div>
                      <div className="text-xs text-gray-500">Industry avg: 8.1%</div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4">
                    <h4 className="font-medium mb-2 text-blue-900">AI Insights</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Visual appeal optimized for {campaign.target.toLowerCase()} demographic</li>
                      <li>• Color psychology aligned with {campaign.style.toLowerCase()} brand positioning</li>
                      <li>• Typography and layout tested across 156 variations</li>
                      <li>• Predicted to outperform current campaigns by {Math.round((campaign.ctr / 3.2 - 1) * 100)}%</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
