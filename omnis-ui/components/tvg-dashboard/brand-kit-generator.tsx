"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export function BrandKitGenerator() {
  const generatedAssets = [
    {
      id: "banner-1",
      type: "Banner",
      headline: "Everything you need to ace the new school year",
      variant: "A",
      channel: "Email + App",
      colors: ["#FF6B35", "#F7931E"],
      cta: "Shop School Essentials",
      performance: { ctr: 12.5, cvr: 8.2 }
    },
    {
      id: "banner-2", 
      type: "Banner",
      headline: "Back to school made simple - all in one place",
      variant: "B",
      channel: "Social Media",
      colors: ["#4A90E2", "#7ED321"],
      cta: "Complete Your List",
      performance: { ctr: 10.8, cvr: 9.1 }
    },
    {
      id: "push-1",
      type: "Push Notification",
      headline: "📚 Don't forget Emily! School shoes for £5 off",
      variant: "A",
      channel: "App Push",
      colors: ["#BD10E0", "#B8E986"],
      cta: "Add to Basket",
      performance: { ctr: 28.4, cvr: 15.7 }
    }
  ];

  const channelPreviews = [
    { channel: "Mobile App", template: "banner-app.png", usage: "Homepage hero, category pages" },
    { channel: "Email", template: "banner-email.png", usage: "Newsletter header, promotional campaigns" },
    { channel: "Social Media", template: "banner-social.png", usage: "Facebook/Instagram ads, organic posts" },
    { channel: "Website", template: "banner-web.png", usage: "Homepage banner, product pages" }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>🎨 Generated Brand Assets</CardTitle>
          <p className="text-gray-600">AI-generated creative variants optimized for Emily's segment</p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="banners" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="banners">Banner Headlines</TabsTrigger>
              <TabsTrigger value="notifications">Push Notifications</TabsTrigger>
              <TabsTrigger value="templates">Visual Templates</TabsTrigger>
            </TabsList>
            
            <TabsContent value="banners" className="space-y-4">
              {generatedAssets.filter(asset => asset.type === "Banner").map((asset) => (
                <div key={asset.id} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Badge variant="outline">Variant {asset.variant}</Badge>
                        <span className="font-semibold text-lg">"{asset.headline}"</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Channel: {asset.channel}</p>
                      <div className="flex items-center gap-2">
                        {asset.colors.map((color, idx) => (
                          <div key={idx} className="w-6 h-6 rounded" style={{backgroundColor: color}}></div>
                        ))}
                        <span className="text-sm ml-2">CTA: "{asset.cta}"</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm">CTR: {asset.performance.ctr}%</p>
                      <p className="text-sm">CVR: {asset.performance.cvr}%</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" className="bg-purple-600">Deploy</Button>
                  </div>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="notifications">
              {generatedAssets.filter(asset => asset.type === "Push Notification").map((asset) => (
                <div key={asset.id} className="border rounded-lg p-4">
                  <p className="font-semibold">"{asset.headline}"</p>
                  <p className="text-sm text-gray-600">Performance: {asset.performance.ctr}% CTR</p>
                </div>
              ))}
            </TabsContent>
            
            <TabsContent value="templates">
              <div className="grid grid-cols-2 gap-4">
                {channelPreviews.map((preview, idx) => (
                  <div key={idx} className="border rounded-lg p-4">
                    <h3 className="font-semibold">{preview.channel}</h3>
                    <p className="text-sm text-gray-600">{preview.usage}</p>
                    <Button size="sm" className="mt-2">Download Template</Button>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader>
          <CardTitle className="text-purple-800">🚀 Ready-to-Deploy Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">High-Performing Variant</h4>
              <p className="text-sm italic">"Everything you need to ace the new school year"</p>
              <Badge className="bg-green-500 text-white mt-2">28.4% CTR</Badge>
            </div>
            <div className="bg-white p-4 rounded border">
              <h4 className="font-semibold mb-2">Segment-Optimized Colors</h4>
              <div className="flex gap-2 items-center">
                <div className="w-8 h-8 rounded" style={{backgroundColor: "#FF6B35"}}></div>
                <div className="w-8 h-8 rounded" style={{backgroundColor: "#4A90E2"}}></div>
                <span className="text-sm ml-2">Family-friendly palette</span>
              </div>
            </div>
          </div>
          <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
            Generate New Asset Variants
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 