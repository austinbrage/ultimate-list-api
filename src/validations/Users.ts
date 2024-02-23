import { userSchema, authSchema } from '../schemas/users'
import { type UserType } from '../types/users'
import { type SafeParseReturnType } from 'zod'

export interface IUsersValidation {
    id(data: unknown): SafeParseReturnType<unknown, UserType['id']>
    data(data: unknown): SafeParseReturnType<unknown, UserType['data']>
    apiKey(data: unknown): SafeParseReturnType<unknown, UserType['apiKey']>
    idName(data: unknown): SafeParseReturnType<unknown, UserType['idName']>
    idEmail(data: unknown): SafeParseReturnType<unknown, UserType['idEmail']>
    idNickname(data: unknown): SafeParseReturnType<unknown, UserType['idNickname']>
    idPassword(data: unknown): SafeParseReturnType<unknown, UserType['idPassword']>
    namePassword(data: unknown): SafeParseReturnType<unknown, UserType['namePassword']>
    authInfoData(data: unknown): SafeParseReturnType<unknown, UserType['authInfoData']>
}

export class UsersValidation implements IUsersValidation {
    private userSchema: typeof userSchema
    private authSchema: typeof authSchema

    constructor() {
        this.userSchema = userSchema
        this.authSchema = authSchema
    }

    id = (data: unknown) => this.userSchema.id.safeParse(data)
    data = (data: unknown) => this.userSchema.data.safeParse(data)
    apiKey = (data: unknown) => this.userSchema.apiKey.safeParse(data)
    idName = (data: unknown) => this.userSchema.idName.safeParse(data)
    idEmail = (data: unknown) => this.userSchema.idEmail.safeParse(data)
    idNickname = (data: unknown) => this.userSchema.idNickname.safeParse(data)
    idPassword = (data: unknown) => this.userSchema.idPassword.safeParse(data)
    namePassword = (data: unknown) => this.userSchema.namePassword.safeParse(data)
    authInfoData = (data: unknown) => this.authSchema.authInfoData.safeParse(data)
}