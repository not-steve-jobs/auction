import { Divider } from "antd";
import React, { FC, SetStateAction } from "react";
import { StyleProvider, legacyLogicalPropertiesTransformer } from "@ant-design/cssinjs";

import Characteristics from "./Characteristics";

import { categoriesType } from "../../constants/types";

import FormItemGroupWrapper from "../../../formItems/FormItemGroupWrapper";
import AddCharacteristicModal from "../../AddCharacteristicModal/AddCharacteristicModal";

interface IFormCharacteristicsProps {
  characteristic: categoriesType[];
  setCharacteristic: React.Dispatch<SetStateAction<categoriesType[]>>;
}

const FormCharacteristics: FC<IFormCharacteristicsProps> = ({
  characteristic,
  setCharacteristic
}) => {
  const handleMinusClick = (id: number) => {
    const newCharacteristic: categoriesType[] =
      characteristic && characteristic?.filter((item: { id: number }) => item.id !== id);
    setCharacteristic(newCharacteristic);
  };

  return (
    <>
      <FormItemGroupWrapper title={"Բնութագրեր"} titleInfo="Բնութագրեր">
        <StyleProvider hashPriority="high" transformers={[legacyLogicalPropertiesTransformer]}>
          {characteristic &&
            characteristic.map((item: { name: string; value: string; id: number }) => {
              return (
                <Characteristics key={item.id} item={item} handleMinusClick={handleMinusClick} />
              );
            })}
          <AddCharacteristicModal
            characteristic={characteristic}
            handleSubmit={(name, value) => {
              setCharacteristic([
                ...characteristic,
                { id: characteristic.length + 1, name, value }
              ]);
            }}
          />
        </StyleProvider>
      </FormItemGroupWrapper>
      <Divider />
    </>
  );
};

export default FormCharacteristics;
