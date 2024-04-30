// react
import { ChangeEvent, FC, SetStateAction, Dispatch } from "react";

// hooks
import { useState, useEffect } from "react";
import useLocationEnhancer from "../../hooks/useLocationEnhancer";

// components
import Input from "../shared/Input";
import Button from "../shared/Button";
import PhoneInput from "../shared/PhoneInput/PhoneInput";
import PasswordInputEye from "../shared/PasswordInputEye";

// types
import { AuthType } from "../../types/auth.types";

// interfaces
import { IAuthSignUp } from "../../interface/auth.interface";

// plugins
import classNames from "classnames";

import constants from "./constants";
import ErrorMessage from "../shared/ErrorMessage";
import { NavLink } from "react-router-dom";

const { INPUT_FIELDS_FOR_REGISTER, INPUT_FIELDS_FOR_LOGIN } = constants;

interface IAuthFormProps {
  byPhone?: boolean;
  byEmail?: boolean;
  errors: AuthType | any;
  setErrors: Dispatch<SetStateAction<AuthType>>;
  // eslint-disable-next-line no-unused-vars
  handleFormSubmit: (data: IAuthSignUp) => void;
}

const AuthForm: FC<IAuthFormProps> = ({
  byPhone,
  byEmail,
  errors,
  setErrors,
  handleFormSubmit
}) => {
  const [formData, setFormData] = useState<AuthType | any>({});
  const [passInputType, setPassInputType] = useState<string>("password");

  const { lastPart } = useLocationEnhancer();

  const currentInputFields =
    lastPart === "sign-in" ? INPUT_FIELDS_FOR_LOGIN : INPUT_FIELDS_FOR_REGISTER;

  const isPasswordField = (fieldKey: string) => fieldKey === "password";
  const isPhoneField = (fieldKey: string) => fieldKey === "phone";
  const isEmailField = (fieldKey: string) => fieldKey === "email";

  const handleFieldValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "", universalError: "" });
  };

  const handlePhoneValueChange = (value: string) => {
    let phone = `+${value}`;

    setErrors({ ...errors, phone: "", universalError: "" });
    setFormData({ ...formData, phone });
  };

  useEffect(() => {
    if (byPhone) delete formData.email;
    else delete formData.phone;

    setFormData(formData);
  }, [byPhone]);

  return (
    <div className="w-full mx-auto pt-[48px]">
      {currentInputFields.map((field) => {
        const { key, props } = field;

        return (
          <div key={key} className="mb-[24px]">
            {(isPhoneField(key) && byPhone) || (isEmailField(key) && byEmail) ? (
              isPhoneField(key) ? (
                <PhoneInput
                  label="Հեռախոսահամար"
                  className={classNames(
                    "w-[300px] md:w-[415px] h-[52px] border border-[#667085] rounded-md",
                    (errors[key] || errors.universalError) && "border-[#F34635]"
                  )}
                  type="text"
                  onChange={handlePhoneValueChange}
                  placeholder=""
                />
              ) : (
                <Input
                  defaultValue={formData[key]}
                  error={errors[key] || errors.universalError}
                  {...props}
                  onChange={handleFieldValueChange}
                />
              )
            ) : (
              isPasswordField(key) && (
                <Input
                  error={errors[key] || errors.universalError}
                  onChange={handleFieldValueChange}
                  {...props}
                  type={passInputType}
                  suffix={
                    <PasswordInputEye
                      onToggle={(type) => {
                        setPassInputType(type);
                      }}
                    />
                  }
                />
              )
            )}
            {!isPhoneField(key) && !isEmailField(key) && !isPasswordField(key) && (
              <Input
                defaultValue={formData[key]}
                error={errors[key] || errors.universalError}
                {...props}
                onChange={handleFieldValueChange}
              />
            )}
            <ErrorMessage err_if={!!errors[key]}>{errors[key]}</ErrorMessage>
          </div>
        );
      })}
      <ErrorMessage err_if={!!errors.universalError}>{errors.universalError}</ErrorMessage>
      <div
        className={classNames("flex items-center", {
          "justify-between": lastPart === "sign-in",
          "justify-end": lastPart !== "sign-in"
        })}>
        {lastPart === "sign-in" && (
          <NavLink
            to={"/auth/recover"}
            className="font-mardoto text-[12px] text-[#1376DD] cursor-pointer">
            Մոռացե՞լ եք գաղտնաբառը
          </NavLink>
        )}
        <Button
          hover
          active
          primary
          rounded
          className="py-[12px] w-[191px] justify-center font-semibold"
          onClick={() => handleFormSubmit(formData)}>
          {lastPart === "sign-in" ? "Մուտք գործել" : "Ուղարկել կոդը"}
        </Button>
      </div>
    </div>
  );
};

export default AuthForm;
