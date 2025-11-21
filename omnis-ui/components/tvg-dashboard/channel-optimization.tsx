"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export function ChannelOptimization() {
  const channelHeatmap = [
    { time: "6:00 AM", email: 15, app: 8, sms: 5, web: 12 },
    { time: "8:00 AM", email: 22, app: 18, sms: 8, web: 15 },
    { time: "12:00 PM", email: 18, app: 25, sms: 12, web: 20 },
    { time: "3:00 PM", email: 16, app: 22, sms: 10, web: 18 },
    { time: "6:00 PM", email: 20, app: 35, sms: 15, web: 25 },
    { time: "7:30 PM", email: 25, app: 39, sms: 18, web: 30 },
    { time: "9:00 PM", email: 19, app: 28, sms: 12, web: 22 },
    { time: "11:00 PM", email: 8, app: 12, sms: 3, web: 10 },
  ];

  const topPairings = [
    {
      primary: "App Push",
      primaryTime: "7:45 PM",
      primaryRate: 39,
      followUp: "Email",
      followUpTime: "12h later",
      followUpRate: 22,
      combinedLift: "+18%",
      useCase: "Bundle recommendations"
    },
    {
      primary: "Email",
      primaryTime: "8:00 AM",
      primaryRate: 22,
      followUp: "App Push",
      followUpTime: "Evening",
      followUpRate: 35,
      combinedLift: "+15%",
      useCase: "Delivery notifications"
    },
    {
      primary: "App Push",
      primaryTime: "6:00 PM",
      primaryRate: 35,
      followUp: "SMS",
      followUpTime: "2h later",
      followUpRate: 15,
      combinedLift: "+12%",
      useCase: "Urgent updates"
    }
  ];

  const emilyStrategy = {
    primary: "App Push @ 7:45 PM",
    reason: "Peak engagement window",
    fallback: "Email @ 8:00 AM next day",
    avoid: ["SMS", "Desktop browser", "Late night (after 10 PM)"],
    personalizedTiming: {
      weekday: "7:30-8:00 PM",
      weekend: "6:00-7:00 PM", 
      special: "Back-to-school: 6:00 PM (higher urgency)"
    }
  };

  const getHeatmapColor = (value: number) => {
    if (value >= 35) return "bg-red-500 text-white";
    if (value >= 25) return "bg-orange-400 text-white";
    if (value >= 20) return "bg-yellow-400 text-black";
    if (value >= 15) return "bg-green-300 text-black";
    return "bg-blue-200 text-gray-700";
  };

  return (
    <div className="space-y-6">
      {/* Channel Engagement Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>🕐 Channel Engagement Heatmap</CardTitle>
          <p className="text-gray-600">Emily's interaction rates by channel and time of day</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border-b font-semibold">Time</th>
                  <th className="text-center p-2 border-b font-semibold">📧 Email</th>
                  <th className="text-center p-2 border-b font-semibold">📱 App Push</th>
                  <th className="text-center p-2 border-b font-semibold">💬 SMS</th>
                  <th className="text-center p-2 border-b font-semibold">🌐 Web</th>
                </tr>
              </thead>
              <tbody>
                {channelHeatmap.map((row, index) => (
                  <tr key={index}>
                    <td className="p-2 border-b font-medium">{row.time}</td>
                    <td className="p-2 border-b text-center">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getHeatmapColor(row.email)}`}>
                        {row.email}%
                      </span>
                    </td>
                    <td className="p-2 border-b text-center">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getHeatmapColor(row.app)}`}>
                        {row.app}%
                      </span>
                    </td>
                    <td className="p-2 border-b text-center">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getHeatmapColor(row.sms)}`}>
                        {row.sms}%
                      </span>
                    </td>
                    <td className="p-2 border-b text-center">
                      <span className={`px-3 py-1 rounded text-sm font-medium ${getHeatmapColor(row.web)}`}>
                        {row.web}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span>Engagement Rate:</span>
            <div className="flex items-center gap-2">
              <span className="bg-red-500 text-white px-2 py-1 rounded text-xs">35%+</span>
              <span className="bg-orange-400 text-white px-2 py-1 rounded text-xs">25-34%</span>
              <span className="bg-yellow-400 text-black px-2 py-1 rounded text-xs">20-24%</span>
              <span className="bg-green-300 text-black px-2 py-1 rounded text-xs">15-19%</span>
              <span className="bg-blue-200 text-gray-700 px-2 py-1 rounded text-xs">&lt;15%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Top Channel Pairings */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Optimal Channel Pairing Strategies</CardTitle>
          <p className="text-gray-600">Multi-touch sequences for maximum engagement</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPairings.map((pairing, index) => (
              <div key={index} className="border rounded-lg p-4 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">Sequence #{index + 1}</h3>
                  <Badge className="bg-green-500 text-white">
                    {pairing.combinedLift} Combined Lift
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-medium text-blue-600 mb-2">Primary Touch</h4>
                    <p className="text-lg font-bold">{pairing.primary}</p>
                    <p className="text-sm text-gray-600">
                      {pairing.primaryTime} • {pairing.primaryRate}% engagement
                    </p>
                  </div>
                  
                  <div className="bg-white p-3 rounded border">
                    <h4 className="font-medium text-purple-600 mb-2">Follow-up Touch</h4>
                    <p className="text-lg font-bold">{pairing.followUp}</p>
                    <p className="text-sm text-gray-600">
                      {pairing.followUpTime} • {pairing.followUpRate}% engagement
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded">
                  <p className="text-sm">
                    <span className="font-medium">Best for:</span> {pairing.useCase}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emily's Personalized Strategy */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200">
        <CardHeader>
          <CardTitle className="text-purple-800">👤 Emily's Personalized Channel Strategy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Optimal Strategy</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-green-600">Primary Channel</p>
                  <p className="text-lg font-bold">{emilyStrategy.primary}</p>
                  <p className="text-sm text-gray-600">{emilyStrategy.reason}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="font-medium text-blue-600">Fallback Strategy</p>
                  <p className="text-lg font-bold">{emilyStrategy.fallback}</p>
                  <p className="text-sm text-gray-600">If primary fails or no interaction</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Timing Personalization</h4>
              <div className="space-y-3">
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm font-medium">Weekdays</p>
                  <p className="text-lg">{emilyStrategy.personalizedTiming.weekday}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm font-medium">Weekends</p>
                  <p className="text-lg">{emilyStrategy.personalizedTiming.weekend}</p>
                </div>
                
                <div className="bg-white p-3 rounded border">
                  <p className="text-sm font-medium">Special Periods</p>
                  <p className="text-lg">{emilyStrategy.personalizedTiming.special}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold mb-3">⚠️ Channels to Avoid</h4>
            <div className="flex flex-wrap gap-2">
              {emilyStrategy.avoid.map((channel, index) => (
                <Badge key={index} variant="destructive">
                  {channel}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <Button className="bg-purple-600 hover:bg-purple-700">
              Apply Strategy
            </Button>
            <Button variant="outline">
              Test Alternative
            </Button>
            <Button variant="outline">
              View Historical Performance
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 