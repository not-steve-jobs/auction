import { TreeSelect } from "antd";
import { FC, useEffect, useState } from "react";

import { getFullRegions } from "../../../../services/products.service";
import { transformDataForAntdSelectTree } from "../../../../utils/modifyCountryData.util";
import { removePrefixOfId } from "../../../../utils/removePrefixOfId.util";
import { modifyPlaces } from "../../../../utils/modifyPlaces.util";
import { productState } from "../../../../context/product-context";

interface ISelectTreeProps {
  disabled?: boolean;
  index?: number;
}

const SelectTree: FC<ISelectTreeProps> = ({ disabled, index }) => {
  const { changePlaceDataFormat } = productState();
  const [selectTree, setSelectTree] = useState<any>([]);

  const [resData, setResData] = useState<any>([]);

  const [selectedValues, setSelectedValues] = useState<any[]>([]);

  const newSelectedValues = removePrefixOfId(selectedValues);

  const newFormat = modifyPlaces(resData, newSelectedValues);

  useEffect(() => {
    changePlaceDataFormat(newFormat, index);
  }, [selectedValues]);

  const handleGetData = async () => {
    try {
      const { data } = await getFullRegions();

      const newData = transformDataForAntdSelectTree(data);
      setSelectTree(newData);
      setResData(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TreeSelect
      maxTagCount="responsive"
      onClick={handleGetData}
      treeDefaultExpandAll={false}
      disabled={!!disabled}
      showCheckedStrategy={TreeSelect.SHOW_PARENT}
      treeCheckable
      style={{ width: "100%", maxWidth: "300px" }}
      dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
      placeholder=""
      treeData={selectTree}
      onChange={(val) => {
        setSelectedValues(val);
      }}
    />
  );
};

export default SelectTree;
