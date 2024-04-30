// hooks
import { useNavigate } from "react-router-dom";
import { ChangeEvent, FC, useContext, useEffect, useState } from "react";
import { usePasswordValidation } from "../../hooks/usePasswordValidation";

// components
import FormTopLogo from "./AuthTopLogo";
import Input from "../shared/Input";
import Button from "../shared/Button";
import PasswordInputEye from "../shared/PasswordInputEye";

// images
import approved from "../../assets/images/approved.svg";
import declined from "../../assets/images/declined.svg";

// store
import authContext from "../../context/auth-context";

// utils
import { isExpiredTime } from "../../utils/date.util";

// services
import { authPostData } from "../../services/auth.service";

// interfaces
import { IDebauncedResult, IPasswordValidationResult } from "../../interface/auth.interface";

// constants
import constants from "./constants";
import { IAuthJWT } from "../../types/auth.types";
import { getLocalStoreItem } from "../../utils/storage.util";
import { jwtDecode } from "../../utils/jwt.util";

const { INPUT_FIELDS, PASS_REQUIREMENTS, ERROR_TEXT_BASE_CLASSES, REGISTER_JWT_DURATION } =
  constants;

interface IWritePasswordProps {
  passwordEndpoint: string;
}

const WritePassword: FC<IWritePasswordProps> = ({ passwordEndpoint }) => {
  const jwtToken = getLocalStoreItem("access_token");
  const tokenData: IAuthJWT = jwtDecode(jwtToken);

  const [hasFalseValue, setHasFalseValue] = useState(false);
  const [inputFields, setInputFields] = useState(INPUT_FIELDS);
  const [passwordState, setPasswordState] = useState({
    password: "",
    repeat_password: ""
  });

  const { onLogin, comeToFirstStep } = useContext(authContext);

  const navigate = useNavigate();

  const { isTheSame, debaunced, repDebaunced, validationResult }: IDebauncedResult =
    usePasswordValidation(passwordState.password, passwordState.repeat_password, 1000);

  const renderedItems = PASS_REQUIREMENTS.map(({ req, text }) => {
    if (!validationResult[req as keyof IPasswordValidationResult]) {
      return text;
    }
  })
    .filter((item) => item !== undefined)
    .join(", ");

  const allPropertiesAreTrue = Object.values(validationResult).every((value) => value === true);

  useEffect(() => {
    if (!passwordState.password.length) {
      setHasFalseValue(false);
      return;
    }

    setHasFalseValue(Object.values(validationResult).some((value) => value === false));
  }, [validationResult]);

  const handlePasswordInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setPasswordState({
      ...passwordState,
      [name]: value
    });
  };

  const toggleInputEye = (type: string, updatedIndex: number) => {
    const toggledFields = inputFields.map((field, index) =>
      updatedIndex === index ? { ...field, props: { ...field.props, type: type } } : field
    );
    setInputFields(toggledFields);
  };

  const submitPassword = async () => {
    const isExpiredJWTTime = isExpiredTime(tokenData?.expiration_time, REGISTER_JWT_DURATION);

    if (isExpiredJWTTime) {
      comeToFirstStep();
      return;
    }

    try {
      await authPostData(passwordState, passwordEndpoint);
      onLogin();
      navigate("/", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <FormTopLogo>Գրանցում</FormTopLogo>
      <form action="#" className={"mt-[48px]"}>
        {inputFields.map((field, index) => (
          <div key={field.key} className={"mb-[24px]"}>
            <Input
              error={
                (hasFalseValue && field.props.name === "password") ||
                (field.props.name == "repeat_password" && !isTheSame && repDebaunced)
              }
              {...field.props}
              onChange={handlePasswordInputChange}
              suffix={<PasswordInputEye onToggle={(type) => toggleInputEye(type, index)} />}
            />

            {hasFalseValue && field.props.name === "password" ? (
              <div className={ERROR_TEXT_BASE_CLASSES}>{renderedItems}</div>
            ) : field.props.name == "repeat_password" && !isTheSame && repDebaunced ? (
              <div className={ERROR_TEXT_BASE_CLASSES}>
                Անհրաժեշտ է նույնությամբ կրկնել գաղտնաբառը
              </div>
            ) : (
              ""
            )}
          </div>
        ))}

        <div className={"flex justify-end mt-[40px] mb-[60px]"}>
          <Button
            hover
            active
            rounded
            primary={isTheSame && allPropertiesAreTrue}
            disabled={!isTheSame || !allPropertiesAreTrue}
            onClick={(e) => {
              e.preventDefault();
              submitPassword();
            }}
            className="px-10 py-3">
            Հաստատել
          </Button>
        </div>

        {/* Password requirements */}
        <div className="justify-center items-start flex flex-col ml-[24px]">
          <div className=" font-mardoto font-medium text-[18px] text-[#101B28] opacity-[80%] mb-[16px]">
            Գաղտնաբառի պահանջներ
          </div>
          <div className="flex flex-col items-start  ">
            {PASS_REQUIREMENTS.map(({ key, text, req, className }) => (
              <div key={key} className="flex items-center justify-center mb-[5px] ml-[8px]">
                {debaunced ? (
                  validationResult[req as keyof IPasswordValidationResult] ? (
                    <img src={approved} alt="" className="mr-[8px]" />
                  ) : (
                    <img src={declined} alt="" className="mr-[8px]" />
                  )
                ) : (
                  ""
                )}
                <div className={className}>{text}</div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </>
  );
};

export default WritePassword;
