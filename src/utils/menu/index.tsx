import {
    Briefcase,
    FileText,
    Home,
    Info,
    LogOut,
    Phone,
    Settings,
    UserCheck
} from "lucide-react";


export const userDropDownData = [
    {
        name: "Profile",
        href: "/profile",
        icon: <UserCheck />
    },
    {
        name: "Settings",
        href: "/settings",
        icon: <Settings />
    },
    {
        name: "Logout",
        onClick: () => {
            console.log("User logged out");
        },
        icon: <LogOut />,
    }
]
export const navBarItems = [
    {
        name: "Home",
        href: "/",
        icon: <Home />,
    },
    {
        name: "About",
        href: "/about",
        icon: <Info />,
    },
    {
        name: "Jobs",
        href: "/jobs",
        icon: <Briefcase />,
    },
    {
        name: "Blog",
        href: "/blog",
        icon: <FileText />,
    },
    {
        name: "Contact",
        href: "/contact",
        icon: <Phone />,
    },
];