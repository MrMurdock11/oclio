const StudioLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-gray-900">
      {children}
    </div>
  );
};

export default StudioLayout;
