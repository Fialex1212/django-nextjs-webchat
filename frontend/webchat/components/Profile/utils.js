import { Captions, Mail, KeySquare, UserRoundX, Settings, Bell } from 'lucide-react';

export const userButtons =[
    {
        name: "Settings",
        link: "/profile/settings",
        icon: <Settings />,
    },
    {
        name: "Notifications",
        link: "/profile/notifications",
        icon: <Bell />,
    }
]

export const settingsData = [
    {
        name: "Change username",
        link: "/profile/settings/change-username",
        icon: <Captions />,
    },
    {
        name: "Change email",
        link: "/profile/settings/change-email",
        icon: <Mail />,
    },
    {
        name: "Change password",
        link: "/profile/settings/change-password",
        icon: <KeySquare />,
    },
    {
        name: "Delete account",
        link: "/profile/settings/delete-account",
        icon: <UserRoundX />,
    }
]