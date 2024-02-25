import { z } from 'zod'

export const knowledgeConceptTableSchema = z.object({
    id: z.number({
        required_error: 'Knowledge-Concept id is required',
        invalid_type_error: 'Knowledge-Concept id must be a number'
    }),
    knowledge_id: z.number({
        required_error: 'Knowledge id is required',
        invalid_type_error: 'Knowledge id must be a number'
    }),
    priority: z.number({
        required_error: 'Knowledge-Concept priority is required',
        invalid_type_error: 'Knowledge-Concept priority must be a number'
    }),
    type: z.string({
        required_error: 'Knowledge-Concept type is required',
        invalid_type_error: 'Knowledge-Concept type must be a string'
    }),
    name: z.string({
        required_error: 'Knowledge-Concept name is required',
        invalid_type_error: 'Knowledge-Concept name must be a string'
    }),
    description: z.string({
        required_error: 'Knowledge-Concept description is required',
        invalid_type_error: 'Knowledge-Concept description must be a string'
    }),
})

const id = knowledgeConceptTableSchema.pick({ id: true })
const knowledgeId = knowledgeConceptTableSchema.pick({ knowledge_id: true })
const idType = knowledgeConceptTableSchema.pick({ id: true, type: true })
const idName = knowledgeConceptTableSchema.pick({ knowledge_id: true, id: true, name: true })
const idPriority = knowledgeConceptTableSchema.pick({ id: true, priority: true })
const knowledgeIdName = knowledgeConceptTableSchema.pick({ knowledge_id: true, name: true })
const idDescription = knowledgeConceptTableSchema.pick({ id: true, description: true })
const fullData = knowledgeConceptTableSchema.omit({ id: true })

export const conceptSchema = {
    id,
    knowledgeId,
    idType,
    idName,
    idPriority,
    knowledgeIdName,
    idDescription,
    fullData
}

const knowledgeConceptQuerySchema = z.object({
    knowledge_id: z.string({
        required_error: 'Knowledge id is required',
        invalid_type_error: 'Knowledge id must be a string'
    })
}) 

const knowledgeIdQuery = knowledgeConceptQuerySchema.pick({ knowledge_id: true })

export const conceptQuerySchema = {
    knowledgeIdQuery
}