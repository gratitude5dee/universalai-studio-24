
import { 
  LayoutDashboard, Zap, Palette, BookOpen, Brain, Headphones, Infinity, UserRound, Users, 
  ImageIcon, BarChart3, Shield, Globe, Bot, Database, ShoppingCart, Eye, Building, 
  Trees, ArrowRightLeft, Share2, Link, Tv, User, Music, Wallet, Landmark, TrendingUp, Droplets 
} from "lucide-react";

export const navItems = [{
  name: "Dashboard",
  path: "/",
  icon: LayoutDashboard
}, {
  name: "WZRD.tech",
  path: "#",
  icon: Zap,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "Studio",
      path: "/wzrd/studio",
      icon: Palette
    },
    {
      name: "Library",
      path: "/wzrd/library",
      icon: BookOpen
    },
    {
      name: "DeepResearch",
      path: "/wzrd/research",
      icon: Brain
    },
    {
      name: "Generative Podcasts",
      path: "/wzrd/podcasts",
      icon: Headphones
    },
    {
      name: "Infinite Library",
      path: "/wzrd/infinite-library",
      icon: Infinity
    },
    {
      name: "Companions",
      path: "/wzrd/companions",
      icon: UserRound
    }
  ]
}, {
  name: "Projects",
  path: "#",
  icon: Users,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "Asset Library",
      path: "/gallery",
      icon: ImageIcon
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3
    },
    {
      name: "Marketplace Launch",
      path: "/marketplace-launch",
      icon: Globe
    }
  ]
}, {
  name: "Agents",
  path: "#",
  icon: Users,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "Create New Agent",
      path: "/create-agent",
      icon: Bot
    },
    {
      name: "My Collection",
      path: "/collection",
      icon: Database
    },
    {
      name: "Marketplace",
      path: "/agent-marketplace",
      icon: ShoppingCart
    },
    {
      name: "Observability",
      path: "/observability",
      icon: Eye
    }
  ]
}, {
  name: "Real World Assets",
  path: "#",
  icon: Building,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "IP Portal",
      path: "/rights",
      icon: Shield
    },
    {
      name: "Thread of Life",
      path: "/thread-of-life",
      icon: Trees
    },
    {
      name: "Bridge",
      path: "/bridge",
      icon: ArrowRightLeft
    }
  ]
}, {
  name: "Distribution",
  path: "#",
  icon: Share2,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "Social Media WZRD",
      path: "/distribution/social-media",
      icon: Globe
    },
    {
      name: "On-Chain Distribution",
      path: "/distribution/on-chain",
      icon: Link
    },
    {
      name: "Media Channels",
      path: "/distribution/media-channels",
      icon: Tv
    },
    {
      name: "Independent Channels",
      path: "/distribution/independent",
      icon: User
    },
    {
      name: "Sync Licensing",
      path: "/distribution/sync-licensing",
      icon: Music
    }
  ]
}, {
  name: "Treasury",
  path: "#",
  icon: Wallet,
  hasSubmenu: true,
  submenuItems: [
    {
      name: "Overview",
      path: "/treasury",
      icon: Wallet
    },
    {
      name: "On-Chain Actions",
      path: "/treasury?tab=onchain",
      icon: Landmark
    },
    {
      name: "Trading Agents",
      path: "/treasury?tab=trading",
      icon: TrendingUp
    },
    {
      name: "Liquidity Agents",
      path: "/treasury?tab=liquidity",
      icon: Droplets
    }
  ]
}];

export type NavItem = typeof navItems[0];
export type SubMenuItem = NavItem['submenuItems'][0];
