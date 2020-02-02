import SectionModel from '../../../db/models/homeSectionsModel'

function addNewScetion (req, res, next) {
  let { isSelected = true, sectionNameAr, sectionNameEn, endPointURL} = req.body

  let homeSection = new SectionModel({
    isSelected,
    sectionNameAr,
    sectionNameEn,
  endPointURL})

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

function getSections (req, res, next) {
}

function updateSection (req, res, next) {
}

export { addNewScetion, getSections, updateSection}
