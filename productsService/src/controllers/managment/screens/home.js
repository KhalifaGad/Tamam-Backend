import { HomeSections } from '../../../db/models/homeSectionsModel'
import boom from '@hapi/boom'

function addNewScetion(req, res, next) {
  const {
    active = true,
    sectionNameAr,
    sectionNameEn,
    clientEndPointURL,
    serverEndPointURL,
    skip = 0,
    limit = 5
  } = req.body
  
  let homeSection = new HomeSections({
    active,
    sectionNameAr,
    sectionNameEn,
    clientEndPointURL,
    serverEndPointURL,
    skip,
    limit
  })

  homeSection.save()
    .then(doc => {
      res.status(201).send({
        isSuccessed: true,
        data: doc,
        error: null
      })
    })
    .catch(err => {
      next(boom.internal(err))
    })
}

function getSections(req, res, next) {
}

function updateSection(req, res, next) {
}

export { addNewScetion, getSections, updateSection }
