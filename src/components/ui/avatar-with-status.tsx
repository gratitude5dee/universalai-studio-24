
import React from "react";
import { motion } from "framer-motion";

type StatusType = "online" | "offline" | "away" | "busy";
type SizeType = "sm" | "md" | "lg";

interface AvatarWithStatusProps {
  src: string;
  status: StatusType;
  size?: SizeType;
  className?: string;
}

const AvatarWithStatus: React.FC<AvatarWithStatusProps> = ({
  src,
  status,
  size = "md",
  className = "",
}) => {
  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
    busy: "bg-red-500",
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const statusSizeClasses = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  };

  return (
    <div className={`relative ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
        className={`relative ${sizeClasses[size]} rounded-full overflow-hidden border-2 border-white shadow-sm`}
      >
        <img
          src={src}
          alt="User avatar"
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </motion.div>
      <span
        className={`absolute bottom-0 right-0 ${statusSizeClasses[size]} ${statusColors[status]} rounded-full ring-2 ring-white`}
      />
    </div>
  );
};

export default AvatarWithStatus;
