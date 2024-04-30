import { Button, Select } from "antd";
import { productState } from "../../../../context/product-context";

const { Option } = Select;
type charInputsType = {
  quantity: string;
  percent: string;
  first: boolean;
};

const CreateItemDinamiInput = () => {
  const { inputs, setInputs } = productState();

  const handleAddInput = () => {
    setInputs([...inputs, { quantity: "", percent: "", first: false }]);
  };

  const handleRemoveInput = (index: number) => {
    const newInputs: charInputsType[] = [...inputs];
    newInputs.splice(index, 1);
    setInputs(newInputs);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newInputs: charInputsType[] | any = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };

  return (
    <div className="mt-[24px]">
      {inputs.map((input: charInputsType, index: number) => (
        <div key={index} className=" flex justify-start items-center space-x-[24px] mb-[47px] ">
          <Select style={{ width: 150 }} onChange={(e) => handleInputChange(index, "quantity", e)}>
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
            <Option value="4">4</Option>
          </Select>
          <p className=" font-mardoto text-[14px] font-normal">հատ գնելու դեպքում զեղչ</p>
          <Select style={{ width: 150 }} onChange={(e) => handleInputChange(index, "percent", e)}>
            <Option value="10">10%</Option>
            <Option value="20">20%</Option>
            <Option value="30">30%</Option>
            <Option value="40">40%</Option>
          </Select>

          {input?.first && (
            <Button style={{ background: "#1F598E", color: "#fff" }} onClick={handleAddInput}>
              +
            </Button>
          )}
          {!input?.first && (
            <Button
              style={{ background: "#DC4536", color: "#fff" }}
              onClick={() => handleRemoveInput(index)}>
              -
            </Button>
          )}
        </div>
      ))}
    </div>
  );
};

export default CreateItemDinamiInput;
