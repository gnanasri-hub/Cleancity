import { useState, useRef } from 'react';
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, MapPin, Send, X } from "lucide-react";
import { MapboxMap } from '@/components/MapboxMap';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const departments = [
  "Roads & Transport",
  "Water Supply",
  "Electricity",
  "Sanitation",
  "Public Safety",
  "Parks & Recreation",
  "Building & Construction",
  "Other"
];

const ReportIssue = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    department: '',
  });
  const [location, setLocation] = useState<{ lat: number; lng: number; address: string } | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(Array.from(e.target.files));
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to report an issue.',
        variant: 'destructive',
      });
      navigate('/auth');
      return;
    }

    if (!location) {
      toast({
        title: 'Location required',
        description: 'Please select a location on the map.',
        variant: 'destructive',
      });
      return;
    }

    setUploading(true);

    try {
      // Upload files to storage
      const mediaUrls: string[] = [];
      for (const file of files) {
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data } = await supabase.storage
          .from('issue-media')
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('issue-media')
          .getPublicUrl(fileName);
        
        mediaUrls.push(publicUrl);
      }

      // Insert issue into database
      const { error: insertError } = await supabase
        .from('issues')
        .insert({
          user_id: user.id,
          title: formData.title,
          description: formData.description,
          department: formData.department,
          location_name: location.address,
          latitude: location.lat,
          longitude: location.lng,
          media_urls: mediaUrls,
        });

      if (insertError) throw insertError;

      toast({
        title: 'Issue reported!',
        description: 'Your report has been submitted successfully.',
      });

      // Reset form
      setFormData({ title: '', description: '', department: '' });
      setLocation(null);
      setFiles([]);
      setShowMap(false);
      
      navigate('/map');
    } catch (error: any) {
      toast({
        title: 'Error submitting report',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Report an Issue</h1>
            <p className="text-muted-foreground text-lg">
              Help improve your community by reporting civic issues
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="shadow-medium">
              <CardHeader>
                <CardTitle>Issue Details</CardTitle>
                <CardDescription>
                  Provide information about the civic issue you want to report
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title</Label>
                  <Input 
                    id="title" 
                    placeholder="Brief description of the issue"
                    className="border-border"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Detailed Description</Label>
                  <Textarea 
                    id="description" 
                    placeholder="Provide more details about the issue..."
                    rows={4}
                    className="border-border resize-none"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => setFormData({ ...formData, department: value })}>
                    <SelectTrigger id="department" className="border-border">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept.toLowerCase().replace(/\s+/g, '-')}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    AI will help detect the correct department based on your images
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Upload Media</Label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div 
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Images or videos (Max 10MB each)
                    </p>
                  </div>
                  
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                          <span className="text-sm truncate flex-1">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="location" 
                      placeholder="Select location on map"
                      className="border-border flex-1"
                      value={location?.address || ''}
                      readOnly
                    />
                    <Button 
                      type="button"
                      variant="outline" 
                      size="icon"
                      onClick={() => setShowMap(!showMap)}
                    >
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </div>
                  {showMap && (
                    <div className="mt-4">
                      <MapboxMap
                        onLocationSelect={setLocation}
                        height="400px"
                        showSearch
                      />
                    </div>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Click the map icon to select location. Precise location helps officials respond faster.
                  </p>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit"
                    className="w-full bg-gradient-primary hover:opacity-90" 
                    size="lg"
                    disabled={uploading}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {uploading ? 'Submitting...' : 'Submit Report'}
                  </Button>
                  {!user && (
                    <p className="text-xs text-center text-muted-foreground mt-3">
                      You'll be redirected to sign in before submitting
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportIssue;