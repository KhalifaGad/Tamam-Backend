import { Router } from 'express'
import { 
    addNewScetion,
    getSections,
    updateSection
} from '../../../../controllers/managment/screens/home'
import { 
    addNewHomeSectionVM
} from '../../../../middlewares/validationsHandler'

const homeScreenRouter = Router()

homeScreenRouter.route('sections')
    .post(addNewHomeSectionVM, addNewScetion)
    .get(getSections)
    .put(updateSection)

export { homeScreenRouter as default }