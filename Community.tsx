import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, ThumbsUp, Send, Users } from "lucide-react";

const discussions = [
  {
    id: 1,
    author: "Rajesh Kumar",
    avatar: "RK",
    title: "Street light not working on MG Road",
    preview: "The street light near sector 5 junction has been out for a week...",
    replies: 12,
    likes: 24,
    language: "English",
    time: "2 hours ago"
  },
  {
    id: 2,
    author: "प्रिया शर्मा",
    avatar: "PS",
    title: "पार्क की सफाई के बारे में",
    preview: "हमारे क्षेत्र के पार्क की सफाई नहीं हो रही है...",
    replies: 8,
    likes: 15,
    language: "हिन्दी",
    time: "5 hours ago"
  },
  {
    id: 3,
    author: "Mohammed Asif",
    avatar: "MA",
    title: "Water supply timing issues",
    preview: "We need consistent water supply timings in our area...",
    replies: 20,
    likes: 42,
    language: "English",
    time: "1 day ago"
  }
];

const Community = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Community Forum</h1>
            <p className="text-muted-foreground text-lg">
              Connect with neighbors and discuss local issues
            </p>
          </div>
          <Button className="bg-gradient-primary hover:opacity-90">
            <MessageCircle className="mr-2 h-4 w-4" />
            Start Discussion
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {discussions.map((discussion) => (
              <Card key={discussion.id} className="hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="pt-6">
                  <div className="flex gap-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary">
                        {discussion.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-semibold text-lg mb-1">
                            {discussion.title}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{discussion.author}</span>
                            <span>•</span>
                            <span>{discussion.time}</span>
                            <Badge variant="outline" className="ml-2">
                              {discussion.language}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">
                        {discussion.preview}
                      </p>
                      <div className="flex items-center gap-6 text-sm">
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
                          <MessageCircle className="h-4 w-4" />
                          <span>{discussion.replies} replies</span>
                        </button>
                        <button className="flex items-center gap-1 text-muted-foreground hover:text-success transition-colors">
                          <ThumbsUp className="h-4 w-4" />
                          <span>{discussion.likes}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Active Members
                </CardTitle>
                <CardDescription>
                  Community members online now
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {['Amit P', 'Sneha K', 'Arjun M', 'Kavita R'].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-success" />
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-xs">
                        {name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{name}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Chat</CardTitle>
                <CardDescription>
                  Messages auto-translate to your language
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  <div className="text-sm">
                    <p className="font-medium mb-1">Amit P</p>
                    <div className="bg-muted p-2 rounded-lg">
                      Anyone knows about the water supply schedule?
                    </div>
                  </div>
                  <div className="text-sm">
                    <p className="font-medium mb-1">Kavita R</p>
                    <div className="bg-muted p-2 rounded-lg">
                      Usually 6 AM to 9 AM in our area
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="Type a message..." className="border-border" />
                  <Button size="icon" className="bg-gradient-primary hover:opacity-90">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
