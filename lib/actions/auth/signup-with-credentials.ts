"use server"

import { z } from "zod"
import bcrypt from "bcryptjs"

import connectDB from "@/lib/db"
import { User } from "@/lib/models/auth.model"
import { UserProvider } from "@/lib/models/types"
import { SignUpValidation } from "@/lib/validations/auth"
import { generateToken } from "@/lib/jwt-token"
import { sendVerificationEmail } from "@/lib/mailer"

type SignUpWithCredentialsInput = z.infer<typeof SignUpValidation>

export const signUpWithCredentials = async (values: SignUpWithCredentialsInput) => {
  const validatedFields = SignUpValidation.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }
  
  const { 
    email, 
    password, 
    name,
    musical_genres,
    phone_number,
    instagram,
    discord 
  } = validatedFields.data

  await connectDB()

  const existingUser = await User.findOne({email})
  if (existingUser) {
    const error = existingUser.provider === UserProvider.CREDENTIALS 
      ? "Email already exists" 
      : "Email has already been used for third-party login"
    return { error }
  }
  
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({ 
    name, 
    email, 
    password: hashedPassword,
    musicalGenres: musical_genres,
    phoneNumber: phone_number,
    instagramUsername: instagram,
    discordUsername: discord
  })
  
  await user.save()

  const verificationToken = await generateToken({email})
  await sendVerificationEmail(email, verificationToken)
  
  return { success: "Confirmation email sent!" }
}