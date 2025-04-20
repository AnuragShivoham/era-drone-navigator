
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, Package, MessageSquare, History, Settings, 
  Menu, X, AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  {
    icon: Home,
    label: 'Dashboard',
    path: '/'
  },
  {
    icon: Package,
    label: 'Delivery',
    path: '/delivery'
  },
  {
    icon: MessageSquare,
    label: 'Assistant',
    path: '/assistant'
  },
  {
    icon: History,
    label: 'History',
    path: '/history'
  },
  {
    icon: Settings,
    label: 'Settings',
    path: '/settings'
  },
  {
    icon: MessageSquare,
    label: 'Offline AI',
    path: '/offline-ai'
  }
];

interface NavLayoutProps {
  children: React.ReactNode;
}

const NavLayout: React.FC<NavLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-era-background">
      {/* Mobile sidebar backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        className={cn(
          "fixed md:static w-64 h-full bg-era-card z-20 transition-transform duration-300 transform shadow-lg",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-era-primary/20">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-era-primary flex items-center justify-center">
                <span className="text-white font-semibold">E</span>
              </div>
              <h1 className="text-xl font-bold text-era-text">ERA</h1>
              <div className="px-2 py-0.5 text-xs bg-era-accent text-era-background rounded-full">
                Spark of Future
              </div>
            </div>
          </div>
          <div className="flex-1 py-4 overflow-y-auto">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <Link 
                  key={item.path} 
                  to={item.path}
                  className={cn(
                    "flex items-center px-4 py-3 my-1 text-sm rounded-lg transition-colors",
                    location.pathname === item.path 
                      ? "bg-era-primary text-white" 
                      : "text-era-muted hover:bg-era-card hover:text-white"
                  )}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          {/* Emergency Stop Button */}
          <div className="p-4 border-t border-era-primary/20">
            <Button 
              variant="destructive" 
              className="w-full flex items-center justify-center space-x-2"
            >
              <AlertTriangle className="h-4 w-4" />
              <span>Emergency Stop</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Mobile Header */}
        <header className="bg-era-card shadow-md p-4 flex items-center justify-between md:hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleSidebar}
            className="text-era-text"
          >
            {isSidebarOpen ? <X /> : <Menu />}
          </Button>
          <h1 className="text-xl font-bold text-era-text">ERA Drone</h1>
          <div className="w-10" />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default NavLayout;
