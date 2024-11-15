import {Calendar, HelpCircle, Home, Inbox, Search, Settings} from "lucide-react"

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
        title: "Home",
        url: "/home",
        icon: Home,
    },
    {
        title: "Generate Songs",
        url: "/generate-songs",
        icon: Inbox,
    },
    {
        title: "Matching",
        url: "/matching",
        icon: Calendar,
    },
    {
        title: "Mint NFT",
        url: "/mint-nft",
        icon: Search,
    },
    {
        title: "FAQ",
        url: "/faq",
        icon: HelpCircle,
    },
    {
        title: "Settings",
        url: "/settings",
        icon: Settings,
    },

]

export function AppSidebar() {
    return (
        <Sidebar className="mt-16">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon/>
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
