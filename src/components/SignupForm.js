import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FormSubmit } from "./FormSubmit";
import CloseIcon from "@material-ui/icons/Close";
import ReportProblemRoundedIcon from "@material-ui/icons/ReportProblemRounded";
import VisibilityOffOutlinedIcon from "@material-ui/icons/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@material-ui/icons/VisibilityOutlined";
import { TextField } from "@material-ui/core";
import { auth } from "../libs/firebase";
import { useDispatch } from "react-redux";
import { login } from "../features/userSlice";
import { useHistory } from "react-router";
import "../styles/SignupForm.css";
import * as ROUTES from "../constants/routes";

export const SignupForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const [passwordShown, setPasswordShown] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = ({ firstName, lastName, email, password }) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userAuth) => {
        userAuth.user
          .updateProfile({
            displayName: firstName,
          })
          .then(() => {
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: firstName,
              })
            );
            history.replace(ROUTES.MENU);
          });
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="signupForm">
      <div className="signupForm__container">
        <form onSubmit={handleSubmit(onSubmit)} className="signupForm__form">
          <h4 className="signupForm__section">Personal Information</h4>
          <div className="signupForm__inputContainer">
            <TextField
              name="fName"
              label="First name"
              type="text"
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.fName && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter your first name.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>

          <div className="signupForm__inputContainer">
            <TextField
              name="lName"
              label="Last name"
              type="text"
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.lName && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter your last name.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>
          <h4 className="signupForm__section">Account Security</h4>
          <div className="signupForm__inputContainer">
            <TextField
              name="email"
              label="Email Address"
              type="email"
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {errors.email && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter an email.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="signupForm__reportIcon"
                />
              </div>
            )}
          </div>

          <div className="signupForm__inputContainer">
            <TextField
              name="password"
              label="Password"
              type={passwordShown ? "text" : "password"}
              InputLabelProps={{
                style: { color: "rgba(0,0,0,.56)" },
              }}
              InputProps={{ style: { fontWeight: "800" } }}
              className="signupForm__input"
              inputRef={register({ required: true })}
            />
            {passwordShown ? (
              <VisibilityOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="signupForm__visibilityIcon"
              />
            ) : (
              <VisibilityOffOutlinedIcon
                onClick={() => setPasswordShown(!passwordShown)}
                className="signupForm__visibilityIcon"
              />
            )}
            {errors.password && (
              <div className="signupForm__error">
                <CloseIcon fontSize="small" />
                <span>Enter an password.</span>
                <ReportProblemRoundedIcon
                  fontSize="small"
                  className="login__reportIcon"
                />
              </div>
            )}
          </div>
          <h4 className="signupForm__rewards">
            COLLECT MORE STARS & EARN REWARDS
          </h4>
          <span className="signupForm__span">
            Email is a great way to know about offers and what’s new from
            Starbucks.
          </span>
          <FormSubmit name="Create account" type="submit" />
        </form>
      </div>
    </div>
  );
};
