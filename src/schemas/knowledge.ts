import { z } from 'zod'

export const knowledgeTableSchema = z.object({
    id: z.number({
        required_error: 'Knowledge id is required',
        invalid_type_error: 'Knowledge id must be a number'
    }),
    user_id: z.number({
        required_error: 'User id is required',
        invalid_type_error: 'User id must be a number'
    }),
    priority: z.number({
        required_error: 'Knowledge priority is required',
        invalid_type_error: 'Knowledge priority must be a number'
    }),
    type: z.string({
        required_error: 'Knowledge type is required',
        invalid_type_error: 'Knowledge type must be a string'
    }),
    name: z.string({
        required_error: 'Knowledge name is required',
        invalid_type_error: 'Knowledge name must be a string'
    }),
    description: z.string({
        required_error: 'Knowledge description is required',
        invalid_type_error: 'Knowledge description must be a string'
    }),
})

const id = knowledgeTableSchema.pick({ id: true })
const userId = knowledgeTableSchema.pick({ user_id: true })
const idType = knowledgeTableSchema.pick({ id: true, type: true })
const idName = knowledgeTableSchema.pick({ id: true, name: true })
const idPriority = knowledgeTableSchema.pick({ id: true, priority: true })
const userIdName = knowledgeTableSchema.pick({ user_id: true, name: true })
const idDescription = knowledgeTableSchema.pick({ id: true, description: true })
const fullData = knowledgeTableSchema.omit({ id: true })

export const knowledgeSchema = {
    id,
    userId,
    idType,
    idName,
    idPriority,
    userIdName,
    idDescription,
    fullData
}