"use client";

import React, { useState, createContext, useContext, ReactNode } from "react";
import { clsx } from "clsx";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className,
}) => {
  const [activeTabState, setActiveTabState] = useState<string>(
    defaultValue || ""
  );

  // If value is provided, use it as a controlled component
  const activeTab = value !== undefined ? value : activeTabState;

  const setActiveTab = (tabId: string) => {
    if (onValueChange) {
      onValueChange(tabId);
    }
    if (value === undefined) {
      setActiveTabState(tabId);
    }
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div
      role="tablist"
      className={clsx("flex space-x-1 rounded-md p-1 bg-gray-100", className)}
    >
      {children}
    </div>
  );
};

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
  disabled = false,
  ...props
}) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === value;

  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      disabled={disabled}
      className={clsx(
        "px-3 py-1.5 text-sm font-medium rounded-md transition-all",
        "focus:outline-none focus:ring-2 focus:ring-opacity-50",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        isActive
          ? "bg-white text-black shadow-sm"
          : "text-gray-600 hover:text-black hover:bg-gray-50",
        className
      )}
      onClick={() => setActiveTab(value)}
      {...props}
    >
      {children}
    </button>
  );
};

interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
  ...props
}) => {
  const context = useContext(TabsContext);

  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { activeTab } = context;

  if (activeTab !== value) {
    return null;
  }

  return (
    <div role="tabpanel" className={clsx("mt-2", className)} {...props}>
      {children}
    </div>
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent };
