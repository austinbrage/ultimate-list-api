import { z } from 'zod'

export const researchTableSchema = z.object({
    id: z.number({
        required_error: 'Research id is required',
        invalid_type_error: 'Research id must be a number'
    }),
    user_id: z.number({
        required_error: 'User id is required',
        invalid_type_error: 'User id must be a number'
    }),
    priority: z.number({
        required_error: 'Research priority is required',
        invalid_type_error: 'Research priority must be a number'
    }),
    type: z.string({
        required_error: 'Research type is required',
        invalid_type_error: 'Research type must be a string'
    }),
    name: z.string({
        required_error: 'Research name is required',
        invalid_type_error: 'Research name must be a string'
    }),
    description: z.string({
        required_error: 'Research description is required',
        invalid_type_error: 'Research description must be a string'
    }),
})

const id = researchTableSchema.pick({ id: true })
const userId = researchTableSchema.pick({ user_id: true })
const idType = researchTableSchema.pick({ id: true, type: true })
const idName = researchTableSchema.pick({ id: true, name: true })
const idPriority = researchTableSchema.pick({ id: true, priority: true })
const userIdName = researchTableSchema.pick({ user_id: true, name: true })
const idDescription = researchTableSchema.pick({ id: true, description: true })
const fullData = researchTableSchema.omit({ id: true })
const data = researchTableSchema.omit({ id: true, priority: true})

export const researchSchema = {
    id,
    userId,
    idType,
    idName,
    idPriority,
    userIdName,
    idDescription,
    fullData,
    data
}