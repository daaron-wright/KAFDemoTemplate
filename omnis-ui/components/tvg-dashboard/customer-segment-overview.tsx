"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";

export function CustomerSegmentOverview() {
  return (
    <div className="space-y-6">
      {/* Emily Profile Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Emily - Target Customer</h2>
        <p className="text-gray-600">34-year-old mother preparing for back-to-school season</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metrics */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Current Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Avg Order Value</span>
                <span className="text-xl font-bold text-blue-600">£80</span>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Attach Rate</span>
                <span className="text-xl font-bold text-orange-600">1.2 items</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Monthly Orders</span>
                <span className="text-xl font-bold">3.2</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WISMO Risk */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">WISMO Risk Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Risk Score</span>
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  68/100 High
                </Badge>
              </div>
              <Progress value={68} className="h-2" />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Orders with queries</span>
                <span className="font-medium">42%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg time to contact</span>
                <span className="font-medium">3.2 days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Preferred channel</span>
                <span className="font-medium">Live Chat</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Shopping Behavior */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Shopping Patterns</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">School Uniforms</span>
                  <span className="text-sm font-medium">£28 (35%)</span>
                </div>
                <Progress value={35} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Shoes & Accessories</span>
                  <span className="text-sm font-medium">£22 (27%)</span>
                </div>
                <Progress value={27} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Sports Equipment</span>
                  <span className="text-sm font-medium">£18 (23%)</span>
                </div>
                <Progress value={23} className="h-1.5" />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm">Stationery</span>
                  <span className="text-sm font-medium">£12 (15%)</span>
                </div>
                <Progress value={15} className="h-1.5" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Strategic Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Attach Rate Opportunities</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Most likely to add sports shoes when buying uniforms</li>
                <li>• 73% miss complementary stationery items</li>
                <li>• Bundle opportunities worth £15-25 per order</li>
                <li>• Price-sensitive but values convenience</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">WISMO Reduction Strategy</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Proactive delivery updates reduce queries by 35%</li>
                <li>• Clear size guides prevent 60% of returns</li>
                <li>• SMS notifications preferred over email</li>
                <li>• Most queries about delivery timing (67%)</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 