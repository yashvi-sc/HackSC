import {UserRole} from "@/lib/models/types"

declare module "next-auth" {
    interface User {
        _id: string
        role: UserRole
        provider?: string
        isTwoFactorEnabled: boolean
        musicalGenres?: string[]
        phoneNumber?: string
        instagramUsername?: string
        discordUsername?: string
    }

    interface Session {
        user: User & {
            _id: string
            role: UserRole
            provider?: string
            isTwoFactorEnabled: boolean
            musicalGenres?: string[]
            phoneNumber?: string
            instagramUsername?: string
            discordUsername?: string
        }
    }

    interface JWT {
        _id: string
        role: UserRole
        provider?: string
        isTwoFactorEnabled: boolean
        musicalGenres?: string[]
        phoneNumber?: string
        instagramUsername?: string
        discordUsername?: string
    }
}
