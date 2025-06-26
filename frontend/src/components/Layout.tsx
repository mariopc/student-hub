import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

function Layout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <main className="flex-1 md:ml-16 p-6">
                    <div className="container mx-auto">
                        <Outlet />
                    </div>
                </main>
            </SidebarInset>
        </SidebarProvider >
    );
}

export default Layout;