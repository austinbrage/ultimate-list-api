import { z } from 'zod'
import { userSchema, authSchema } from '../schemas/users'
import { type RowDataPacket } from 'mysql2'

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

export interface IUser {
    getAll({ id }: UserType['id']): Promise<RowDataPacket[]>
    getName({ name }: UserType['name']): Promise<RowDataPacket[]>
    getEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getNickname({ nickname }: UserType['nickname']): Promise<RowDataPacket[]>
    getId({ api_key }: UserType['apiKey']): Promise<RowDataPacket[]>
    getByEmail({ email }: UserType['email']): Promise<RowDataPacket[]>
    getIdPassword({ name }: UserType['name']): Promise<RowDataPacket[]>
    getByExternalID({ auth_provider, external_id }: UserType['authData']): Promise<RowDataPacket[]>
    changeName({ id, name }: UserType['idName']): Promise<RowDataPacket[]>
    changeEmail({ id, email }: UserType['idEmail']): Promise<RowDataPacket[]>
    changeNickname({ id, nickname }: UserType['idNickname']): Promise<RowDataPacket[]>
    changePassword({ id, password }: UserType['idPassword']): Promise<RowDataPacket[]>
    changeExternalID({ auth_provider, external_id, email }: UserType['authEmail']): Promise<RowDataPacket[]>
    addNew({ name, password, email, nickname, auth_provider, external_id }: UserType['fullData']): Promise<number>
    remove({ id }: UserType['id']): Promise<RowDataPacket[]>
}