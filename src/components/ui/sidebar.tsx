import { Link, NavLink } from "react-router-dom";
import { Button } from "./button";
import {
  Home, 
  Cog,
  Image, 
  LayoutDashboard, 
  Bot,
  Palette,
  ShoppingBag, 
  ScrollText,
  Wand,
  Wallet,
  Users,
  PlusCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

// Define the links for the sidebar
const links = [
  {
    title: "Home",
    href: "/",
    icon: Home,
  },
  {
    title: "Gallery",
    href: "/gallery",
    icon: Image,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: LayoutDashboard,
  },
];

const createLinks = [
  {
    title: "Create Agent",
    href: "/create-agent",
    icon: Bot,
  },
  {
    title: "Collection",
    href: "/collection",
    icon: Palette,
  },
];

const manageLinks = [
  {
    title: "Rights",
    href: "/rights",
    icon: ScrollText,
  },
  {
    title: "Marketplace",
    href: "/marketplace-launch",
    icon: ShoppingBag,
  },
  {
    title: "Spellcraft",
    href: "/spellcraft",
    icon: Wand,
  },
  {
    title: "Treasury",
    href: "/treasury",
    icon: Wallet,
  },
];

export function Sidebar({ className }: { className?: string }) {
  const isMobile = useIsMobile();

  return (
    <div className={cn("flex flex-col h-full bg-white", className)}>
      <div className="flex px-4 py-4">
        <Link to="/" className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-studio-charcoal hidden md:block">THOTH</h1>
        </Link>
      </div>

      <div className="flex-1 px-3 mb-4 overflow-auto flex flex-col gap-1">
        <nav className="grid gap-1 mb-3">
          {links.map((link) => (
            <NavLink
              key={link.href}
              to={link.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center py-2 px-3 rounded-md text-sm transition-colors gap-3",
                  isActive
                    ? "bg-studio-accent text-white"
                    : "hover:bg-studio-sand/20 text-studio-charcoal"
                )
              }
            >
              <link.icon className="w-4 h-4" />
              {!isMobile && <span>{link.title}</span>}
            </NavLink>
          ))}
        </nav>

        <div className="px-3 py-2">
          <h2 className="mb-1 text-[.625rem] uppercase tracking-wide font-medium text-muted-foreground">
            Create
          </h2>
          <nav className="grid gap-1">
            {createLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-md text-sm transition-colors gap-3",
                    isActive
                      ? "bg-studio-accent text-white"
                      : "hover:bg-studio-sand/20 text-studio-charcoal"
                  )
                }
              >
                <link.icon className="w-4 h-4" />
                {!isMobile && <span>{link.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="px-3 py-2">
          <h2 className="mb-1 text-[.625rem] uppercase tracking-wide font-medium text-muted-foreground">
            Manage
          </h2>
          <nav className="grid gap-1">
            {manageLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-md text-sm transition-colors gap-3",
                    isActive
                      ? "bg-studio-accent text-white"
                      : "hover:bg-studio-sand/20 text-studio-charcoal"
                  )
                }
              >
                <link.icon className="w-4 h-4" />
                {!isMobile && <span>{link.title}</span>}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mt-auto px-3 pt-2">
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <PlusCircle className="h-4 w-4" />
            {!isMobile && <span>New Project</span>}
          </Button>
        </div>
      </div>

      <div className="p-3 border-t border-border">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="w-8 h-8 rounded-full bg-studio-sand flex items-center justify-center text-studio-charcoal">
            <Users className="w-4 h-4" />
          </div>
          {!isMobile && (
            <div className="flex-1">
              <p className="text-sm font-medium">Thoth Studio</p>
              <p className="text-xs text-muted-foreground">
                Free Plan
              </p>
            </div>
          )}
          {!isMobile && (
            <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
              <Cog className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
