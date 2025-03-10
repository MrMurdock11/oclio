import { SidebarInset, SidebarProvider } from "@/components/ui/Sidebar";
import AppSidebar from "@/components/AppSidebar";
import Header from "@/components/Header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen w-screen">
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="flex w-full flex-col">
          <Header />
          {children}
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default MainLayout;
