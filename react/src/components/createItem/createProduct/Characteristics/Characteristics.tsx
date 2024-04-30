import { FC } from "react";
import { Button, Form, Input } from "antd";

interface ICharacteristicsProps {
  item: { name?: string | undefined; value?: string | undefined; id?: number | any };
  // eslint-disable-next-line no-unused-vars
  handleMinusClick: (id: number) => void;
}
const Characteristics: FC<ICharacteristicsProps> = ({ item, handleMinusClick }) => {
  return (
    <Form.Item label={item.name} className="w-full" labelCol={{ span: 24 }}>
      <Input value={item.value} style={{ width: "604px", marginRight: "24px" }} />
      <Button
        style={{ background: "#DC4536", color: "#fff" }}
        onClick={() => handleMinusClick(item.id)}>
        -
      </Button>
    </Form.Item>
  );
};

export default Characteristics;
