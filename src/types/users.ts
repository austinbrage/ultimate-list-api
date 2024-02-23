import { z } from 'zod'
import { userSchema, authSchema } from '../schemas/users'

export type UserType = {
    id: z.infer<typeof userSchema.id>
    data: z.infer<typeof userSchema.data>
    name: z.infer<typeof userSchema.name>
    email: z.infer<typeof userSchema.email>
    nickname: z.infer<typeof userSchema.nickname>
    apiKey: z.infer<typeof userSchema.apiKey>
    idName: z.infer<typeof userSchema.idName>
    idEmail: z.infer<typeof userSchema.idEmail>
    idNickname: z.infer<typeof userSchema.idNickname>
    idPassword: z.infer<typeof userSchema.idPassword>
    namePassword: z.infer<typeof userSchema.namePassword>
    authInfoData: z.infer<typeof authSchema.authInfoData>
    authEmail: z.infer<typeof userSchema.authEmail> 
    authData: z.infer<typeof userSchema.authData> 
    fullData: z.infer<typeof userSchema.fullData>
}