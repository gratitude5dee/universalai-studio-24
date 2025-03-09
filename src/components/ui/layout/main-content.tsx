
import React, { ReactNode } from "react";
import Header from "@/components/ui/header";

interface MainContentProps {
  children: ReactNode;
}

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <main className="flex-1 flex flex-col max-h-screen overflow-y-auto">
      <Header />
      <div className="flex-1 px-4 md:px-8 py-4 pb-10">
        {children}
      </div>
    </main>
  );
};

export default MainContent;
