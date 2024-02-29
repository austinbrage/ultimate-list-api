import { APP, RESOURCES, type CONCEPT } from "../../../apiRoutes"
import { type ConceptTypes } from "../../types/concepts"

type ConceptRoutes = (route: CONCEPT) => string

type ConceptMock = {
    newData1: (knowledgeId: number) =>Omit<ConceptTypes['data'], "user_id">
    newData2: (knowledgeId: number) =>Omit<ConceptTypes['data'], "user_id">
    changedData: (knowledgeId: number) =>Omit<ConceptTypes['fullData'], "user_id">
    name: (conceptId: number, knowledgeId: number) => ConceptTypes['idName']
    type: (conceptId: number) => ConceptTypes['idType']
    priority: (conceptId: number) => ConceptTypes['idPriority']
    description: (conceptId: number) => ConceptTypes['idDescription']
    knowledgeId: (knowledgeId: number) => ConceptTypes['knowledgeId']
    id: (conceptId: number) => ConceptTypes['id']
}

export const conceptRoutes: ConceptRoutes = (route) => {
    return `${APP.VERSION_1}${RESOURCES.CONCEPT}${route}`
}

export const conceptMock: ConceptMock = {
    newData1: (knowledgeId: number) => ({
        knowledge_id: knowledgeId,
        type: 'Core',
        name: 'Backend framework for Restful APIs',
        description: 'Lorem ipsum'
    }),
    newData2: (knowledgeId: number) => ({
        knowledge_id: knowledgeId,
        type: 'Core',
        name: 'Allows json parsing and app routing',
        description: 'Lorem ipsum'
    }),
    changedData: (knowledgeId: number) => ({
        knowledge_id: knowledgeId,
        priority: 3,
        type: 'Example',
        name: 'Adding routes',
        description: 'app.use(/data, controller.addData)'
    }),
    name: (conceptId: number, knowledgeId: number) => ({
        knowledge_id: knowledgeId,
        id: conceptId,
        name: 'Adding routes'
    }),
    type: (conceptId: number) => ({
        id: conceptId,
        type: 'Example'
    }),
    priority: (conceptId: number) => ({
        id: conceptId,
        priority: 3
    }),
    description: (conceptId: number) => ({
        id: conceptId,
        description: 'app.use(/data, controller.addData)'
    }),
    knowledgeId: (knowledgeId: number) => ({
        knowledge_id: knowledgeId
    }),
    id: (conceptId: number) => ({
        id: conceptId
    })
}
