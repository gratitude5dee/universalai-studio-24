
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind } from "lucide-react";
import StatsCard from "@/components/ui/stats-card";

export const WeatherKingdom = () => {
  const [timeOfDay, setTimeOfDay] = useState<"dawn" | "day" | "dusk" | "night">("day");
  const [weather, setWeather] = useState<"sunny" | "cloudy" | "rainy" | "stormy" | "snowy" | "windy">("sunny");
  const [systemStatus, setSystemStatus] = useState({
    uptime: "99.97%",
    latency: "42ms",
    errors: "2",
    requests: "3.4K",
  });

  // Simulate day/night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      const times: Array<"dawn" | "day" | "dusk" | "night"> = ["dawn", "day", "dusk", "night"];
      const currentIndex = times.indexOf(timeOfDay);
      const nextIndex = (currentIndex + 1) % times.length;
      setTimeOfDay(times[nextIndex]);
    }, 30000); // change every 30 seconds

    return () => clearInterval(interval);
  }, [timeOfDay]);

  // Randomly change weather every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      const weathers: Array<"sunny" | "cloudy" | "rainy" | "stormy" | "snowy" | "windy"> = [
        "sunny", "cloudy", "rainy", "stormy", "snowy", "windy"
      ];
      const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
      setWeather(randomWeather);
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const getWeatherIcon = () => {
    switch (weather) {
      case "sunny": return Sun;
      case "cloudy": return Cloud;
      case "rainy": return CloudRain;
      case "stormy": return CloudLightning;
      case "snowy": return CloudSnow;
      case "windy": return Wind;
    }
  };

  const WeatherIcon = getWeatherIcon();

  const getSkyGradient = () => {
    switch (timeOfDay) {
      case "dawn": return "from-[#F9D7C0] to-[#FFF8F0]";
      case "day": return "from-[#87CEEB] to-[#E0F7FF]";
      case "dusk": return "from-[#FE7F9C] to-[#FFDEE2]";
      case "night": return "from-[#1A237E] to-[#3949AB]";
    }
  };

  const getWeatherDescription = () => {
    switch (weather) {
      case "sunny": return "All systems running smoothly";
      case "cloudy": return "Minor slowdowns detected";
      case "rainy": return "Some services experiencing delays";
      case "stormy": return "Critical services under load";
      case "snowy": return "Gradual system cooldown in progress";
      case "windy": return "High traffic volumes detected";
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatsCard 
          title="System Uptime" 
          value={systemStatus.uptime} 
          icon={Sun}
          trend="up"
          trendValue="0.03%"
          delay={0}
        />
        <StatsCard 
          title="Response Time" 
          value={systemStatus.latency} 
          icon={Wind}
          trend="down"
          trendValue="3ms"
          delay={1}
        />
        <StatsCard 
          title="Error Count" 
          value={systemStatus.errors} 
          icon={CloudLightning}
          trend="down"
          trendValue="1"
          delay={2}
        />
        <StatsCard 
          title="Request Volume" 
          value={systemStatus.requests} 
          icon={Cloud}
          trend="up"
          trendValue="12%"
          delay={3}
        />
      </div>
      
      <div className="mt-8">
        <div className={`relative bg-gradient-to-b ${getSkyGradient()} h-64 rounded-xl overflow-hidden`}>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzPgogICAgPHBhdHRlcm4KICAgICAgaWQ9InBhdHRlcm4iCiAgICAgIHdpZHRoPSI0MCIKICAgICAgaGVpZ2h0PSI0MCIKICAgICAgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIKICAgICAgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSIKICAgID4KICAgICAgPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjMpIiAvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3BhdHRlcm4pIiAvPgo8L3N2Zz4=')]" />
          
          <motion.div 
            className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
            animate={{
              y: [0, 5, 0],
              opacity: [1, 0.9, 1]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <WeatherIcon className="h-24 w-24 text-white drop-shadow-lg" />
            <h2 className="text-white text-2xl font-bold mt-4 drop-shadow-lg">{weather.charAt(0).toUpperCase() + weather.slice(1)}</h2>
            <p className="text-white/90 mt-1 drop-shadow-md">{getWeatherDescription()}</p>
          </motion.div>
          
          <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-white/30 to-transparent" />
        </div>
        
        <div className="mt-6 bg-white/70 p-6 rounded-xl shadow-subtle">
          <h3 className="text-xl font-medium mb-2">Current Realm Status</h3>
          <p className="text-studio-clay">Your digital kingdom is experiencing {weather} conditions during {timeOfDay}time. {getWeatherDescription()}.</p>
        </div>
      </div>
    </div>
  );
};
