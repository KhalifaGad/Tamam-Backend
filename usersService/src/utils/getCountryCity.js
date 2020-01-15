import { CountryModel } from "../db/countryModel"

function gCC(countryId, cityId){

    console.log(countryId, cityId)

    return CountryModel.findOne({
        _id: countryId,
        cities: {
            $elemMatch: {
                _id: cityId
            }
        } 
    })
}

export { gCC }