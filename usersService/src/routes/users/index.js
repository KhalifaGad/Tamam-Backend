import express from "express";
import {
  addUser,
  getUsers,
  updateUser,
  getUser,
  deleteUser,
  verifyUser,
  resendVerification,
  editUserFavs,
  getUserFavs,
  getUsersGroup
} from "../../controllers/users";
import {
  addUserValidation,
  verifyUserMiddleware,
  rsndVrfcMiddleware,
  idQueryParamVM,
  editProductVM
} from "../../middlewares/validationHandler";
import multer from "multer";
import path from "path";
import { isIdsEquivalent } from "../../middlewares/customerAuthorization";

const usersRouter = express.Router();

let storage = multer.diskStorage({
    destination: "userImages/",
    filename: function(req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    }
  }),
  upload = multer({
    storage
  });

// api/v1/users
usersRouter
  .route("/")
  .post(upload.single("userPic"), addUserValidation, roleValidation, addUser)
  .get(getUsers);

usersRouter.route("/group").get(getUsersGroup);

usersRouter
  .route("/:id")
  .put(idQueryParamVM, isIdsEquivalent, editProductVM, updateUser)
  .get(idQueryParamVM, getUser)
  .delete(idQueryParamVM, isIdsEquivalent, deleteUser);

usersRouter.route("/verification").post(verifyUserMiddleware, verifyUser);

usersRouter
  .route("/verification/resend")
  .post(rsndVrfcMiddleware, resendVerification);

export { usersRouter };
