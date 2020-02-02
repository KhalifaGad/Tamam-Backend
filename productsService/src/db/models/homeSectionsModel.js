import mongoose from 'mongoose'

let homeSectionSchema = mongoose.Schema({
  isSelected: {
    type: Boolean,
    default: true
  },
  sectionNameAr: {
    type: String,
    required: true,
    trim: true
  },
  sectionNameEn: {
    type: String,
    required: true,
    trim: true
  },
  endPointURL: {
    type: String,
    required: true,
    trim: true
  }
})

let homeSectionsModel = mongoose.model('HomeScreen', homeSectionSchema)

export { homeSectionsModel as default }
