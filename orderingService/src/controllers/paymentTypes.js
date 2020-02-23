import { paymentTypesModule } from "../db/modules/paymentType";
import boom from "@hapi/boom";

async function getPaymentTypes(req, res, next) {
    let excludedName = 'nameEn', selectedName = 'nameAr'
    if(req.query.lang == 'en') {
        excludedName = 'nameAr', selectedName = 'nameEn'
    }

    let paymentTypes = await paymentTypesModule.getTypes(excludedName)
    paymentTypes = paymentTypes.map(type => {
        type.name = type[selectedName]
        delete type[selectedName]
        return type
    })
  return res.status(200).send({
    isSuccessed: true,
    data: paymentTypes,
    error: null
  });
}

async function addPaymentType(req, res, next) {
  let { nameAr, nameEn, isActive = false } = req.body;

  let imgURL =
    "http://144.91.100.164:3003/api/v1/payment-types-images/" +
    req.file.filename;

  let paymentType = await paymentTypesModule.addType({ nameAr, nameEn, isActive, imgURL });
  if(!paymentType) return next(boom.internal('Error in saving payment type'))

  return res.status(201).send({
      isSuccessed: true,
      data: paymentType,
      error: null
  })

}

function editPaymentType(req, res, next) {}

export { getPaymentTypes, addPaymentType, editPaymentType };
