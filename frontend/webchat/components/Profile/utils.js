import { Captions, Mail, KeySquare, UserRoundX, Settings, Bell } from 'lucide-react';

export const userButtons =[
    {
        name: "Settings",
        link: "/profile/me/settings",
        icon: <Settings />,
    },
    {
        name: "Notifications",
        link: "/profile/me/notifications",
        icon: <Bell />,
    }
]

export const settingsData = [
    {
        name: "Change username",
        link: "/profile/me/settings/change-username",
        icon: <Captions />,
    },
    {
        name: "Change email",
        link: "/profile/me/settings/change-email",
        icon: <Mail />,
    },
    {
        name: "Change password",
        link: "/profile/me/settings/change-password",
        icon: <KeySquare />,
    },
    {
        name: "Delete account",
        link: "/profile/me/settings/delete-account",
        icon: <UserRoundX />,
    }
]