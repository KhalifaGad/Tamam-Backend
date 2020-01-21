import SectionModel from '../../../db/homeSectionsModel'

function addNewScetion(req, res, next) {
    let {
        isSelected = true,
        sectionNameAr,
        sectionNameEn,
        endPointURL
    } = req.body

    let homeSection = new SectionModel({
        isSelected,
        sectionName: {
            arabic: sectionNameAr,
            english: sectionNameEn
        },
        endPointURL
    })

    homeSection.save()
        .then(doc => {
            res.status(201).send({
                message: "created",
                data: doc
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

export {
    addNewScetion,
    getSections,
    updateSection
}