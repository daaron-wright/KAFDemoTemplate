"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function CampaignForecast() {
  const weeklyForecasts = [
    {
      week: 1,
      focus: "Uniform Bundle Launch",
      attachRate: 1.3,
      aov: 82,
      wismoContacts: 3200,
      revenue: 127000,
      contactSavings: 8200
    },
    {
      week: 2,
      focus: "Size Guide Enhancement",
      attachRate: 1.4,
      aov: 85,
      wismoContacts: 2950,
      revenue: 134000,
      contactSavings: 15600
    },
    {
      week: 3,
      focus: "Cross-sell Optimization",
      attachRate: 1.6,
      aov: 89,
      wismoContacts: 2780,
      revenue: 142000,
      contactSavings: 22400
    },
    {
      week: 4,
      focus: "Full Implementation",
      attachRate: 1.8,
      aov: 94,
      wismoContacts: 2725,
      revenue: 149000,
      contactSavings: 30800
    }
  ];

  const kpiTargets = [
    {
      metric: "Attach Rate",
      current: 1.2,
      target: 1.8,
      improvement: "+50%",
      color: "blue"
    },
    {
      metric: "Average Order Value",
      current: 80,
      target: 94,
      improvement: "+£14",
      color: "green"
    },
    {
      metric: "WISMO Contacts",
      current: 3494,
      target: 2725,
      improvement: "-22%",
      color: "purple"
    },
    {
      metric: "Contact Cost Savings",
      current: 0,
      target: 30800,
      improvement: "+£31K",
      color: "orange"
    }
  ];

  const investmentBreakdown = [
    { category: "Proactive Notifications", cost: 2000, roi: 840 },
    { category: "Size Guide Enhancement", cost: 5000, roi: 380 },
    { category: "Bundle Development", cost: 3000, roi: 520 },
    { category: "Self-Service Portal", cost: 8000, roi: 285 },
    { category: "Analytics & Tracking", cost: 2000, roi: 710 }
  ];

  const getColorClass = (color: string, type: 'bg' | 'text' | 'border') => {
    const colors = {
      blue: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
      green: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200' },
      purple: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
      orange: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' }
    };
    return colors[color as keyof typeof colors]?.[type] || '';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-GB', { 
      style: 'currency', 
      currency: 'GBP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">4-Week Business Impact Forecast</h2>
        <p className="text-gray-600">Projected results from attach rate optimization and WISMO reduction initiatives</p>
      </div>

      {/* Overall Impact Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiTargets.map((kpi, index) => (
          <Card key={index} className={`${getColorClass(kpi.color, 'bg')} ${getColorClass(kpi.color, 'border')}`}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-1">{kpi.metric}</p>
                <p className={`text-2xl font-bold ${getColorClass(kpi.color, 'text')}`}>
                  {typeof kpi.target === 'number' && kpi.target > 100 ? formatCurrency(kpi.target) : kpi.target}
                </p>
                <Badge className={`${getColorClass(kpi.color, 'bg')} ${getColorClass(kpi.color, 'text')} text-xs`}>
                  {kpi.improvement}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Weekly Progress Forecast */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Weekly Implementation Progress</CardTitle>
          <p className="text-sm text-gray-600">Projected performance improvements over 4-week period</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weeklyForecasts.map((week, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                      {week.week}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Week {week.week}</h4>
                      <p className="text-sm text-gray-600">{week.focus}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    {formatCurrency(week.revenue)} revenue
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-gray-600">Attach Rate</p>
                    <p className="font-bold text-blue-600">{week.attachRate}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-gray-600">AOV</p>
                    <p className="font-bold text-green-600">{formatCurrency(week.aov)}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-gray-600">WISMO Contacts</p>
                    <p className="font-bold text-purple-600">{week.wismoContacts.toLocaleString()}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded">
                    <p className="text-gray-600">Cost Savings</p>
                    <p className="font-bold text-orange-600">{formatCurrency(week.contactSavings)}</p>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Week {week.week} Progress</span>
                    <span>{(week.week / 4 * 100).toFixed(0)}% Complete</span>
                  </div>
                  <Progress value={week.week / 4 * 100} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Investment vs ROI Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Breakdown & ROI</CardTitle>
          <p className="text-sm text-gray-600">Cost analysis and return on investment for each initiative</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {investmentBreakdown.map((investment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">{investment.category}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <span>Investment: {formatCurrency(investment.cost)}</span>
                    <span>•</span>
                    <span>4-Week ROI: {investment.roi}%</span>
                  </div>
                </div>
                <div className="text-right">
                  <Badge 
                    className={investment.roi > 400 ? "bg-green-100 text-green-800" : 
                              investment.roi > 300 ? "bg-blue-100 text-blue-800" : 
                              "bg-orange-100 text-orange-800"}
                  >
                    {investment.roi}% ROI
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="text-2xl font-bold text-red-600 mb-2">{formatCurrency(20000)}</div>
              <p className="text-sm text-gray-600">Total Investment</p>
            </div>
            
            <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="text-2xl font-bold text-green-600 mb-2">{formatCurrency(68000)}</div>
              <p className="text-sm text-gray-600">4-Week Returns</p>
            </div>
            
            <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="text-2xl font-bold text-blue-600 mb-2">240%</div>
              <p className="text-sm text-gray-600">Overall ROI</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Assessment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Risk Assessment & Confidence Levels</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Success Factors</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm">Bundle acceptance rate</span>
                  <Badge className="bg-green-100 text-green-800">85% confidence</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm">WISMO deflection success</span>
                  <Badge className="bg-blue-100 text-blue-800">78% confidence</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-sm">Customer satisfaction maintenance</span>
                  <Badge className="bg-purple-100 text-purple-800">82% confidence</Badge>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Risk Mitigation</h4>
              <div className="space-y-3">
                                 <div className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg border border-pink-200">
                   <div className="w-2 h-2 rounded-full bg-[#df007a]"></div>
                  <span className="text-sm">Monitor bundle conversion weekly</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span className="text-sm">A/B test discount levels for optimization</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-2 h-2 rounded-full bg-gray-500"></div>
                  <span className="text-sm">Fallback to individual item recommendations</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary & Next Steps */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">Expected Business Impact Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">4-Week Targets</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Attach rate increase:</span>
                  <span className="font-bold text-blue-600">1.2 → 1.8 items (+50%)</span>
                </li>
                <li className="flex justify-between">
                  <span>AOV improvement:</span>
                  <span className="font-bold text-green-600">£80 → £94 (+£14)</span>
                </li>
                <li className="flex justify-between">
                  <span>WISMO reduction:</span>
                  <span className="font-bold text-purple-600">-769 contacts (-22%)</span>
                </li>
                <li className="flex justify-between">
                  <span>Monthly savings:</span>
                  <span className="font-bold text-orange-600">£31K cost reduction</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Success Metrics</h4>
              <ul className="space-y-2 text-sm">
                <li>• Total revenue uplift: {formatCurrency(68000)} over 4 weeks</li>
                <li>• Investment payback: 2.1 weeks</li>
                <li>• Overall ROI: 240% in first month</li>
                                 <li>• Customer satisfaction: Maintain {'>'}95%</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 