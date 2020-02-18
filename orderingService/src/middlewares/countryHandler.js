import boom from "@hapi/boom";
import { getCountry } from "../utils/countryHelper";

async function checkCountry(req, res, next) {
  let code = req.body.countryCode,
    country = await getCountry(code);

  if (country == null)
    return next(boom.badRequest("Failed retrieving country"));

  if (country == undefined)
    return next(boom.badData("Tamam is not in this country, yet!"));

  if (country.isBlocked) return next(boom.badData("This country is blocked!"));

  req.body.countryName = country.name;
  next();
}

export { checkCountry };
