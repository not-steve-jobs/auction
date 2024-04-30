// react
import { ChangeEvent, useEffect } from "react";

// hooks
import { useNavigate } from "react-router-dom";
import { useCallback, useContext, useMemo, useState } from "react";

// components
import Input from "../shared/Input";
import Button from "../shared/Button";
import AuthTopLogo from "./AuthTopLogo";
import PhoneInput from "../shared/PhoneInput/PhoneInput";
import ErrorMessage from "../shared/ErrorMessage";

// store
import AuthContext from "../../context/auth-context";

// libs
import classNames from "classnames";

// utils
import validateUtil from "../../utils/validator.util";
import { debounce } from "../../utils/debounce.util";

// schemas
import { EmailSchema, PhoneSchema } from "../../schemas/reusable.schema";

// constants
import constants from "./constants";

// services
import { authPostData } from "../../services/auth.service";

// interfaces
import { IValidationErrors } from "../../interface/error.interface";

const { ENABLED_BUTTON, DISABLED_BUTTON } = constants;

const WriteChangedPhoneOrEmail = () => {
  const navigate = useNavigate();
  const { registrationData, onNextStep } = useContext(AuthContext);
  const [state, setState] = useState<{ [x: string]: string }>({ phone: "", email: "" });
  const [errors, setErrors] = useState<IValidationErrors>({});
  const [isValid, setIsValid] = useState(false);

  const handleInputValueChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>, fieldType: string) => {
      const value = fieldType === "phone" ? `+${event}` : event.target.value;
      const schema = fieldType === "phone" ? PhoneSchema : EmailSchema;

      const { errors: validationErrors, isValid } = await validateUtil(value, schema);

      setIsValid(isValid);
      if (isValid) {
        setErrors({});
        return;
      }
      setErrors({ [fieldType]: validationErrors[""] });
    },
    []
  );

  const debounceHandler = useMemo(
    () => debounce(handleInputValueChange, 500),
    [handleInputValueChange]
  );

  const callDebouncedChangeHandler = (event: ChangeEvent<HTMLInputElement>, fieldType: string) => {
    const value = fieldType === "phone" ? `+${event}` : event.target.value;

    debounceHandler(event, fieldType);
    setErrors({});
    setState({ [fieldType]: value });
  };

  const handleSubmitClick = async () => {
    const changedValue = {
      [registrationData.byPhone ? "phone" : "email"]: registrationData.byPhone
        ? state.phone
        : state.email
    };

    const payload = {
      full_name: registrationData.full_name,
      ...changedValue
    };

    try {
      await authPostData(payload, "signUpUrl");

      onNextStep(2, payload);
      navigate("/auth");
    } catch (err: any) {
      console.log(err);
      if (err.response.status === 409) {
        setErrors({
          universalError: `${
            registrationData.byPhone ? "հեռախոսահամարով" : "էլ. հասցեով"
          } գրանցված հաշիվ արդեն գոյություն ունի`
        });
      }
    }
  };

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const handleCancel = () => {
    onNextStep(1, {});
    navigate("/auth");
  };

  return (
    <div>
      <AuthTopLogo>{`Փոփոխեք Ձեր ${
        registrationData.byPhone ? "հեռախոսահամարը" : "էլ. հասցեն"
      }`}</AuthTopLogo>
      <div
        className={
          "font-mardoto text-[14px] leading-[16px] text-center text-[#101B28CC] mt-[80px] mb-[36px]"
        }>
        {`Մուտքագրեք այն 
                    ${registrationData.byPhone ? "հեռախոսահամարը" : "էլ. հասցեն"},
                    որին պետք է ուղարկվի հաստատման կոդը`}
      </div>
      <div className={"mb-[40px]"}>
        {registrationData.byPhone ? (
          <PhoneInput
            label="Հեռախոսահամար"
            className={classNames(
              "w-[300px] md:w-[415px] h-[52px] border border-[#667085] rounded-md",
              errors.phone || errors.universalError ? "border-[#F34635]" : ""
            )}
            value={state.phone}
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              callDebouncedChangeHandler(event, "phone")
            }
            placeholder=""
          />
        ) : (
          <Input
            label={"Էլ. հասցե"}
            placeholder={"Էլ. հասցե"}
            className={classNames(
              "w-[300px] md:w-[415px] h-[52px] border border-[#667085] rounded-md px-[10px]"
            )}
            value={state.email}
            maxLength={255}
            error={!!errors.email || !!errors.universalError}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              callDebouncedChangeHandler(event, "email")
            }
          />
        )}
        <ErrorMessage err_if={!!errors.email || !!errors.phone || !!errors.universalError}>
          {errors.email || errors.phone || errors.universalError}
        </ErrorMessage>
      </div>
      <div className={"flex items-center justify-between mt-[40px]"}>
        <Button
          onClick={handleCancel}
          className={`${ENABLED_BUTTON} !bg-[#F0F3FF] !text-[#144272] !w-[200px] rounded-[1000px]`}>
          Չեղարկել
        </Button>
        <Button
          disabled={!isValid}
          hover={isValid}
          className={`${isValid ? ENABLED_BUTTON : DISABLED_BUTTON} !w-[200px] rounded-[1000px]`}
          onClick={handleSubmitClick}>
          Շարունակել
        </Button>
      </div>
    </div>
  );
};

export default WriteChangedPhoneOrEmail;
