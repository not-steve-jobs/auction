// react
import { ChangeEvent } from "react";

// hooks
import { useCallback, useContext, useMemo, useState } from "react";

// components
import Input from "../shared/Input";
import Button from "../shared/Button";
import AuthTopLogo from "./AuthTopLogo";
import ErrorMessage from "../shared/ErrorMessage";

// plugins
import { NavLink } from "react-router-dom";

// utils
import validateUtil from "../../utils/validator.util";
import { debounce } from "../../utils/debounce.util";

// services
import { authPostData } from "../../services/auth.service";

// store
import authContext from "../../context/auth-context";

// schema
import { recoverPasswordUsernameSchema } from "../../schemas/auth.schema";

// constants
import constants from "./constants";

const { INPUT_BASE_CLASSES, ENABLED_BUTTON, DISABLED_BUTTON } = constants;

const RecoverPasswordWriteUsername = () => {
  const { onRecoverNextStep } = useContext(authContext);
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [isValidUsername, setIsValidUsername] = useState(false);

  const validateUsernameInput = async (user_name: string) => {
    const { errors, isValid } = await validateUtil({ user_name }, recoverPasswordUsernameSchema);

    setUsernameError(errors.user_name ?? "");
    setIsValidUsername(isValid);
  };

  const handleSubmit = async () => {
    const payload = { user_name: username };

    if (!isValidUsername) return;

    try {
      await authPostData(payload, "recoverCheckUserUrl");

      onRecoverNextStep(2);
    } catch (e) {
      setIsValidUsername(false);
      setUsernameError("Մուտքագրված տվյալներով գրանցված օգտատեր չի գտնվել։");
    }
  };

  // debounce methods
  const debounceCallbackHandler = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    validateUsernameInput(value);
  }, []);

  const debouncedHandleInputChange = useMemo(() => {
    return debounce(debounceCallbackHandler, 500);
  }, [debounceCallbackHandler]);

  const handleUsernameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setUsername(value);
    debouncedHandleInputChange(event);
  };

  return (
    <>
      <AuthTopLogo>Գաղտնաբառի վերականգնում</AuthTopLogo>
      <div className={"mt-[70px]"}>
        <p
          className={
            "font-mardoto text-[14px] leading-[16px] text-center text-[#101B28CC] mb-[56px]"
          }>
          Լրացրեք այն մուտքանունը, որով գրանցված պրոֆիլի գաղտնաբառը ցանկանում եք վերականգնել
        </p>
        <div>
          <Input
            label={"Մուտքանուն"}
            className={INPUT_BASE_CLASSES}
            value={username}
            maxLength={255}
            error={!!usernameError}
            onChange={handleUsernameInputChange}
            onBlur={handleUsernameInputChange}
          />
          <ErrorMessage err_if={!!usernameError}>{usernameError}</ErrorMessage>
        </div>
        <div className={"flex items-center justify-between mt-[40px]"}>
          <NavLink to={"/auth/sign-in"}>
            <Button
              className={`${ENABLED_BUTTON} !bg-[#F0F3FF] !text-[#144272] !w-[200px] rounded-[1000px]`}>
              Չեղարկել
            </Button>
          </NavLink>
          <Button
            onClick={handleSubmit}
            disabled={!isValidUsername}
            hover={isValidUsername}
            className={`${
              isValidUsername ? ENABLED_BUTTON : DISABLED_BUTTON
            } !w-[200px] rounded-[1000px]`}>
            Շարունակել
          </Button>
        </div>
      </div>
    </>
  );
};
export default RecoverPasswordWriteUsername;
