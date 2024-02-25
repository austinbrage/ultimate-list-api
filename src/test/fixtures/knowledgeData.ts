import { APP, RESOURCES, type KNOWLEDGE } from "../../types/allRoutes"
import { type KnowledgeTypes } from "../../types/knowledge"

type KnowledgeRoutes = (route: KNOWLEDGE) => string

type KnowledgeMock = {
    newData: Omit<KnowledgeTypes['fullData'], "user_id">
    changedData: Omit<KnowledgeTypes['fullData'], "user_id">
    name: (knowledgeId: number) => KnowledgeTypes['idName']
    type: (knowledgeId: number) => KnowledgeTypes['idType']
    priority: (knowledgeId: number) => KnowledgeTypes['idPriority']
    description: (knowledgeId: number) => KnowledgeTypes['idDescription']
    id: (knowledgeId: number) => KnowledgeTypes['id']
}

export const knowledgeRoutes: KnowledgeRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.KNOWLEDGE}${route}`
}

export const knowledgeMock: KnowledgeMock = {
    newData: {
        priority: 1,
        type: 'Backend',
        name: 'Express framework',
        description: 'Lorem ipsum'
    },
    changedData: {
        priority: 2,
        type: 'Deployment',
        name: 'Docker',
        description: 'App containerization'
    },
    name: (knowledgeId: number) => ({
        id: knowledgeId,
        name: 'Docker'
    }),
    type: (knowledgeId: number) => ({
        id: knowledgeId,
        type: 'Deployment'
    }),
    priority: (knowledgeId: number) => ({
        id: knowledgeId,
        priority: 2
    }),
    description: (knowledgeId: number) => ({
        id: knowledgeId,
        description: 'App containerization'
    }),
    id: (knowledgeId: number) => ({
        id: knowledgeId
    })
}