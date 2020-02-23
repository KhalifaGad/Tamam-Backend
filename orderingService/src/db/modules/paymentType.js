import { paymentTypeModel } from "../models/paymentType";

const paymentTypesModule = {
  async addType(type) {
    return await paymentTypeModel.create(type).catch(err => {
      console.log(err);
      return null;
    });
  },
  async editType(type) {},
  async getTypes(excludedName) {
    return await paymentTypeModel.find({}).select('-'+excludedName).lean();
  }
};

export { paymentTypesModule };
