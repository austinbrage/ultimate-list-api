import { z } from 'zod'

export const ideaTableSchema = z.object({
    id: z.number({
        required_error: 'Idea id is required',
        invalid_type_error: 'Idea id must be a number'
    }),
    user_id: z.number({
        required_error: 'User id is required',
        invalid_type_error: 'User id must be a number'
    }),
    priority: z.number({
        required_error: 'Idea priority is required',
        invalid_type_error: 'Idea priority must be a number'
    }),
    type: z.string({
        required_error: 'Idea type is required',
        invalid_type_error: 'Idea type must be a string'
    }),
    name: z.string({
        required_error: 'Idea name is required',
        invalid_type_error: 'Idea name must be a string'
    }),
    description: z.string({
        required_error: 'Idea description is required',
        invalid_type_error: 'Idea description must be a string'
    }),
    solved_problem: z.string({
        required_error: 'Solved problem label is required',
        invalid_type_error: 'Solved problem label must be a string'
    })
})

const id = ideaTableSchema.pick({ id: true })
const userId = ideaTableSchema.pick({ user_id: true })
const idType = ideaTableSchema.pick({ id: true, type: true })
const idName = ideaTableSchema.pick({ id: true, name: true })
const idPriority = ideaTableSchema.pick({ id: true, priority: true })
const userIdName = ideaTableSchema.pick({ user_id: true, name: true })
const idDescription = ideaTableSchema.pick({ id: true, description: true })
const idSolvedProblem = ideaTableSchema.pick({ id: true, solved_problem: true })
const fullData = ideaTableSchema.omit({ id: true })
const data = ideaTableSchema.omit({ id: true, priority: true})

export const ideaSchema = {
    id,
    userId,
    idType,
    idName,
    idPriority,
    userIdName,
    idDescription,
    idSolvedProblem,
    fullData,
    data
}