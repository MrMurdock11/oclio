import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";
import { Toaster } from "@/components/ui";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex w-full flex-col">
          <Header />
          {children}
          <Toaster />
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
