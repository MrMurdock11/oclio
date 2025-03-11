import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/Sidebar";
import { House } from "lucide-react";
import { Link } from "react-router-dom";

const navItems = [
  {
    title: "Home",
    icon: House,
    href: "/",
  },
];

const AppSidebar = () => {
  return (
    <Sidebar collapsible="icon" className="border-slate-100">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarTrigger>
            <SidebarMenuItem>
              <SidebarMenuButton />
            </SidebarMenuItem>
          </SidebarTrigger>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <Link to={item.href} key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <item.icon />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
