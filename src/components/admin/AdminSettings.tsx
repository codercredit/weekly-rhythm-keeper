
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";

export function AdminSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "My App",
    siteDescription: "A modern blogging platform",
    enableComments: true,
    enableRegistration: true,
    requireEmailVerification: true,
    postsPerPage: 10,
  });
  
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: "",
    smtpPort: "",
    smtpUsername: "",
    smtpPassword: "",
    senderEmail: "",
    senderName: "",
  });
  
  const handleGeneralSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Settings Updated",
      description: "Your general settings have been updated successfully.",
    });
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Email Settings Updated",
      description: "Your email settings have been updated successfully.",
    });
  };
  
  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general settings for your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleGeneralSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Site Name</Label>
                  <Input
                    id="siteName"
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteDescription">Site Description</Label>
                  <Textarea
                    id="siteDescription"
                    value={generalSettings.siteDescription}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteDescription: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="postsPerPage">Posts Per Page</Label>
                  <Input
                    id="postsPerPage"
                    type="number"
                    value={generalSettings.postsPerPage}
                    onChange={(e) => setGeneralSettings({...generalSettings, postsPerPage: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={generalSettings.enableComments} 
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableComments: checked})}
                  />
                  <Label>Enable Comments</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={generalSettings.enableRegistration} 
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, enableRegistration: checked})}
                  />
                  <Label>Enable User Registration</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    checked={generalSettings.requireEmailVerification} 
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, requireEmailVerification: checked})}
                  />
                  <Label>Require Email Verification</Label>
                </div>
                
                <Button type="submit">Save Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="email" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Email Settings</CardTitle>
              <CardDescription>
                Configure email settings for notifications and user communications.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpServer">SMTP Server</Label>
                    <Input
                      id="smtpServer"
                      value={emailSettings.smtpServer}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPort">SMTP Port</Label>
                    <Input
                      id="smtpPort"
                      value={emailSettings.smtpPort}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPort: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtpUsername">Username</Label>
                    <Input
                      id="smtpUsername"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpUsername: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="smtpPassword">Password</Label>
                    <Input
                      id="smtpPassword"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => setEmailSettings({...emailSettings, smtpPassword: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="senderName">Sender Name</Label>
                    <Input
                      id="senderName"
                      value={emailSettings.senderName}
                      onChange={(e) => setEmailSettings({...emailSettings, senderName: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="senderEmail">Sender Email</Label>
                    <Input
                      id="senderEmail"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => setEmailSettings({...emailSettings, senderEmail: e.target.value})}
                    />
                  </div>
                </div>
                
                <Button type="submit">Save Email Settings</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Appearance settings would go here. This could include theme colors, 
                  logo uploads, custom CSS, etc.
                </p>
                <Button disabled>Save Appearance Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advanced" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Settings</CardTitle>
              <CardDescription>
                Advanced configuration options for your application.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Advanced settings would go here. This could include caching options, 
                  performance settings, database configuration, etc.
                </p>
                <Button disabled>Save Advanced Settings</Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Be careful with these actions as they can result in data loss.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Clear Cache</h3>
                  <p className="text-sm text-muted-foreground">
                    Clear all cached data from the application.
                  </p>
                </div>
                <Button variant="destructive" size="sm">Clear Cache</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Reset Settings</h3>
                  <p className="text-sm text-muted-foreground">
                    Reset all settings to their default values.
                  </p>
                </div>
                <Button variant="destructive" size="sm">Reset</Button>
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Purge All Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Delete all data from the application. This cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" size="sm">Purge All</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
