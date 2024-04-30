import React, { ChangeEvent, FC, useState } from "react";
import PlusButton from "./PlusButton";
import PhoneInput from "../../shared/PhoneInput/PhoneInput";
import { Input } from "antd";
import MinusButton from "./MinusButton";

interface IMultiInputProps {
  required?: boolean;
  inputType: "phone" | "email";
  // eslint-disable-next-line no-unused-vars
  emitInputsData: (data: string | string[]) => void;
}

const MultiInputField: FC<IMultiInputProps> = ({ inputType, emitInputsData, required }) => {
  const [state, setState] = useState([{ value: "" }]);

  const handleAddClick = () => {
    const newField = { value: "" };

    setState((prev) => [...prev, newField]);
  };

  const setValues = (value: string, index: number) => {
    const updateState = state.map((item, itemIndex) => (itemIndex === index ? { value } : item));
    const stateValues = updateState.map((item) => item.value);

    const filterDataForEmit = stateValues.filter((item) => item);

    setState(updateState);
    emitInputsData(filterDataForEmit);
  };

  const handlePhoneInputChange = (value: string, index: number) => {
    setValues(`+${value}`, index);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = event.target;

    setValues(value, index);
  };

  const handleFieldDelete = (index: number) => {
    const updateState = [...state];

    updateState.splice(index, 1);

    const filterDataForEmit = updateState.filter((item) => item.value).map((item) => item.value);

    setState(updateState);

    if (filterDataForEmit.length) {
      emitInputsData(filterDataForEmit);
    }
  };

  return (
    <div className={"flex w-full gap-x-[24px]"}>
      <div className={"flex flex-col gap-y-[10px]"}>
        <label className={"font-mardoto text-[#404953] text-[14px] leading-normal"}>
          {inputType === "phone" ? "Հեռախոսահամար" : "Էլ. հասցե"}
          {!!required && <span className={"text-[#DC4536]"}> *</span>}
        </label>
        {state.map((item, index) => (
          <div key={index} className={"flex items-center gap-x-[24px] w-full"}>
            {inputType === "phone" ? (
              <PhoneInput
                onChange={(event: string) => handlePhoneInputChange(event, index)}
                value={item.value}
                placeholder={""}
                className={
                  "border border-[#667085] rounded-[6px] text-[#232323] text-[14px] font-mardoto leading-normal !w-[604px] h-[52px] px-[10px]"
                }
              />
            ) : (
              <Input
                type={inputType}
                onChange={(event: ChangeEvent<HTMLInputElement>) => handleInputChange(event, index)}
                value={item.value}
                maxLength={255}
                className={
                  "border border-[#667085] rounded-[6px] text-[#232323] text-[14px] font-mardoto leading-normal !w-[604px] h-[52px] px-[10px]"
                }
              />
            )}
            {index ? (
              <MinusButton
                onClick={() => handleFieldDelete(index)}
                className={`hover:bg-[#F4B405] transition duration-200 flex items-center justify-center bg-[#DC4536] rounded-[3px] w-[52px] h-[52px] cursor-pointer`}
              />
            ) : (
              <PlusButton
                className={
                  "hover:bg-[#F4B405] w-[52px] h-[52px] flex items-center justify-center bg-[#1F598E] rounded-[3px] cursor-pointer"
                }
                onClick={handleAddClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiInputField;
