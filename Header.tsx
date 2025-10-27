import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "./LanguageSelector";
import { MessageCircle, Map, Users, HelpCircle, LogIn, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Header = () => {
  const { user, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Clear<span className="text-accent">शहर</span>
          </div>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/report" className="flex items-center space-x-1 text-sm font-medium hover:text-accent transition-colors">
            <MessageCircle className="h-4 w-4" />
            <span>Report Issue</span>
          </Link>
          <Link to="/community" className="flex items-center space-x-1 text-sm font-medium hover:text-accent transition-colors">
            <Users className="h-4 w-4" />
            <span>Community</span>
          </Link>
          <Link to="/map" className="flex items-center space-x-1 text-sm font-medium hover:text-accent transition-colors">
            <Map className="h-4 w-4" />
            <span>Map View</span>
          </Link>
          <Link to="/support" className="flex items-center space-x-1 text-sm font-medium hover:text-accent transition-colors">
            <HelpCircle className="h-4 w-4" />
            <span>Support</span>
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <LanguageSelector />
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user.user_metadata?.avatar_url} />
                    <AvatarFallback>
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.user_metadata?.full_name || user.email}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="default" size="sm">
              <Link to="/auth">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
