import { z } from 'zod'

export const researchQuestionTableSchema = z.object({
    id: z.number({
        required_error: 'Question id is required',
        invalid_type_error: 'Question id must be a number'
    }),
    research_id: z.number({
        required_error: 'Reseach id is required',
        invalid_type_error: 'Reseach id must be a number'
    }),
    priority: z.number({
        required_error: 'Question priority is required',
        invalid_type_error: 'Question priority must be a number'
    }),
    name: z.string({
        required_error: 'Question name is required',
        invalid_type_error: 'Question name must be a string'
    }),
    description: z.string({
        required_error: 'Question description is required',
        invalid_type_error: 'Question description must be a string'
    }),
})

const id = researchQuestionTableSchema.pick({ id: true })
const researchId = researchQuestionTableSchema.pick({ research_id: true })
const idName = researchQuestionTableSchema.pick({ id: true, name: true })
const idPriority = researchQuestionTableSchema.pick({ id: true, priority: true })
const idDescription = researchQuestionTableSchema.pick({ id: true, description: true })
const fullData = researchQuestionTableSchema.omit({ id: true })

export const questionSchema = {
    id, 
    researchId,
    idName, 
    idPriority,
    idDescription, 
    fullData
}

const researchQuestionQuerySchema = z.object({
    research_id: z.string({
        required_error: 'Research id is required',
        invalid_type_error: 'Research id must be a string'
    })
}) 

const researchIdQuery = researchQuestionQuerySchema.pick({ research_id: true })

export const questionQuerySchema = {
    researchIdQuery
}