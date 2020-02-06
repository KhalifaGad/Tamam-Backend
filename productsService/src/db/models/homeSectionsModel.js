import mongoose from 'mongoose'

let homeSectionSchema = mongoose.Schema({
  active: {
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
  clientEndPointURL: {  // this is should not be the full url,
    type: String,       // but service name which we will look
    required: true,     // for in the service registery.
    trim: true          // but we did not build a service registery here XD.
  },
  serverEndPointURL: {  // this is should not be the full url,
    type: String,       // but service name which we will look
    required: true,     // for in the service registery.
    trim: true          // but we did not build a service registery here XD.
  },
  skip: {
    type: Number,
    default: 0
  },
  limit: {
    type: Number,
    default: 5
  }
}, { versionKey: false })

let HomeSections = mongoose.model('HomeScreen', homeSectionSchema)

export { HomeSections }
