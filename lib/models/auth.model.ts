import mongoose from "mongoose"
import {UserProvider, UserRole} from "@/lib/models/types"

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    emailVerified: Date,
    emailPendingVerification: String,
    image: String,
    password: String,
    role: {
        type: String,
        enum: Object.values(UserRole),
        default: UserRole.USER
    },
    provider: {
        type: String,
        enum: Object.values(UserProvider),
        default: UserProvider.CREDENTIALS
    },
    isTwoFactorEnabled: {
        type: Boolean,
        default: false
    },
    musicalGenres: {
        type: [String],
        required: true,
        default: []
    },
    phoneNumber: {
        type: String,
        required: true,
        default: ""
    },
    instagramUsername: {
        type: String,
        required: true,
        default: ""
    },
    discordUsername: {
        type: String,
        required: true,
        default: ""
    }
}, {
    timestamps: true
})

export const User = mongoose.models.User || mongoose.model("User", userSchema)

const verificationTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
})

const VerificationToken = mongoose.models?.VerificationToken || mongoose.model("VerificationToken", verificationTokenSchema)


const passwordResetTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
})

const PasswordResetToken = mongoose.models?.PasswordResetToken || mongoose.model("PasswordResetToken", passwordResetTokenSchema)


const twoFactorTokenSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        unique: true,
        required: true
    },
    expires: {
        type: Date,
        required: true
    }
})

const TwoFactorToken = mongoose.models?.TwoFactorToken || mongoose.model("TwoFactorToken", twoFactorTokenSchema)


export const twoFactorConfirmationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        unique: true,
        required: true
    }
})

const TwoFactorConfirmation = mongoose.models?.TwoFactorConfirmation || mongoose.model("TwoFactorConfirmation", twoFactorConfirmationSchema)


export {VerificationToken, PasswordResetToken, TwoFactorToken, TwoFactorConfirmation}
