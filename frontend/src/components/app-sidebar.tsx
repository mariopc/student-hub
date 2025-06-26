import { Home, GraduationCap, UserRound, CalendarCheck } from "lucide-react"

import { ModeToggle } from "@/components/mode-toggle"

import { Link } from 'react-router-dom';

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
    {
        title: "Inicio",
        url: "/dashboard",
        icon: Home,
    },
    {
        title: "Alumnos",
        url: "/students",
        icon: GraduationCap,
    },
    {
        title: "Apoderados",
        url: "/representatives",
        icon: UserRound,
    },
    {
        title: "Eventos",
        url: "/events",
        icon: CalendarCheck,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Amacay</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
                <SidebarGroup>
                    <ModeToggle />
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}

/**/
/*<a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a> */