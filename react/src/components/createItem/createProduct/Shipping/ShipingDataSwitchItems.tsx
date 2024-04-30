import { FC, useEffect, useState } from "react";
import type { SizeType } from "antd/es/config-provider/SizeContext";
import { Button, Form, Input, Popover, Select, TimePicker } from "antd";
import { InfoCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { weekdays } from "../../../../utils/weekDays";

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import "./shipping.css";
import SelectTree from "./SelectTree";
import RadioButton from "./RadioGroup/RadionButton";
import ShippingTableAction from "./ShippingTableAction";

import dots from "../../../../assets/images/three-dots.svg";
// import trash from "../../../../assets/images/trash.svg"
import template from "../../../../assets/images/template.svg";
import TableSimple from "../../../formItems/TableSimple";
import { productState } from "../../../../context/product-context";
dayjs.extend(customParseFormat);

interface IShipingDataSwitchItemsProps {
  item: any;
}

const delivery_data = [
  {
    key: "1",
    service: (
      <img
        src="https://jobing.am/wp-content/uploads/job-manager-uploads/company_logo/2022/01/unnamed-150x150.png"
        className="w-[80px] h-[50px]"
      />
    ),
    type: "Էկոնոմ",
    duration: "10 օր",
    cost: "14 000 ֏",
    dots: <img src={dots} alt="" />
  },
  {
    key: "2",
    service: (
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJsAAAB8CAMAAABJ/jKEAAAAwFBMVEX///8qAHz/WQD/VQD/+vjSz98aAHccAH52Kmn/TgD/XQAUAHUpD3z/fVmen7z/l3j/rp8AAG/5+Prq6PBAOIb/oINeWJX/2M1IN4r/bDiCeKr/o4yNg7Hc2eb/6uQlFnr/QgD/ysObmbqop8C5oLU0K4BvFGBDLof/ZCq6ts9zZ6F4b6XJxdk0I4BHP4n/tZ9YS5L/gWb/jXH/va+UkLZnZZr/hmH/WBX/YzVPTIv/x7n/bUKQX4b/cE7/rJRsX53fYfG4AAACsklEQVR4nO2XbVfaMBiGo6XRLrwlRUCkwtq9YSmigg626f//V5InrU0dbHwIbju7r+M5efE5nus0yZ3IGAAAAAAAAAAAAAAAAAAAAAAA/G2EcdMm3F2pEl3woW1zeVA3XwqbaHdl+FEXfPICi95h3fiRxehXbp1Nwcnpu+MSD25ct7y+p5uX8yZun/uG/dy8L+eGt3Cr+7+vtNyC9wd1KvgH3Oy19JM4bk7KpFOTpJlEf8zt6GqgSacbkYxT0o1SY6eGNFG/imblfmu0DNe31DxSZc0MzmqO3TghE5bKIk9Epj+mmucTop9Z57TI3psxtW39p26pP3Z3Pir5JpKl0I3kJCQjpvqV/Ps5324C3RnfMdYaU8/h0a1mL5nwQRj6nU2PL1ks6Kt2Zh2+3a127h3TDrwjyeDOndrLmtIeoz4f6PlQr6CY0oyMFVMLabl55X166XkmjemrtR2qFec0HWqu9EBOfM2S7rBSlnV5eRbuzwz6HXL54BXfMThzqVbNkInZZkS51nxKv5zKHRnSGxdqDWdH1HYz2TsUR1vIwrJya76tH8zuu3erVnVbkFu9ZD+3Xu5261at6pboZcumfkH0xPdY01qx4Rxvt6obDaR1f9EG5Cn1K2fhwkBn4Wt5Fi4O56bmWmWl1zBadbvd1YQWWSyUUvGODGGNwDzonMfbq3eI+U5Z3Iz1W5N3lNmBst4dye3Zy+5N5q6/Gbn1wdzYwNwD3GSuz9Qsz2b62eLWytXypfVc/nvjC7rlCze1fLnruUg2E1GWB52Y9zd1J6cv73F6kz+OdRPoh0jPTD24+78wmnc15f6fzORGV0i5jApbGqcq1YXfGzbXP6gxb6SeGThMOUXYE1E8SIfW2zJcPM2HflFZ20Je+GoIAAAAAAAAAAAAAAAAAAAAAAAA/Ic8A9E5PrP4iYELAAAAAElFTkSuQmCC"
        className="w-[80px] h-[50px]"
      />
    ),
    type: "Վիպ",
    duration: "10 օր",
    cost: "14 000 ֏",
    dots: <img src={dots} alt="" />
  }
];

const ShipingDataSwitchItems: FC<IShipingDataSwitchItemsProps> = ({ item }) => {
  const [tableInputPrice, setTableInputPrice] = useState<any>({});
  const [tableInputDays, setTableInputDays] = useState<any>({});
  const size: SizeType = "middle";

  const [openCard, setOpenCard] = useState<boolean>(false);
  const [shippingData, setShippingData] = useState<any>([]);
  const deliverServices = delivery_data || undefined;
  const { placesData, shippingDatas, shippingIds } = productState();

  const columns = [
    {
      title: "Տարածաշրջան",
      dataIndex: "region"
    },
    {
      title: "Տևողություն",
      dataIndex: "duration"
    },
    {
      title: "Արժեք",
      dataIndex: "cost"
    },
    {
      title: "",
      dataIndex: "dots",
      render: (text: string, record: { key: number }) => (
        <div>
          <Popover
            className="popover_custom_style"
            placement="bottomRight"
            content={
              <ShippingTableAction
                tableInputValues={{
                  days: tableInputDays[record.key],
                  price: tableInputPrice[record.key]
                }}
                id={record.key}
                shippingData={shippingData}
                setShippingData={setShippingData}
                disableInputs={handleDisableInputs}
              />
            }
            trigger="click">
            <img src={dots} onClick={handleopenCard} className="cursor-pointer items-center" />
          </Popover>
        </div>
      )
    }
  ];
  const handleopenCard = () => {
    setOpenCard(!openCard);
  };
  let content;

  const handleContexUpdate = () => {
    shippingData.forEach((item: any, index: number) => {
      if (item.templateId) {
        shippingIds.push(item.templateId);
      } else {
        shippingDatas.push({
          // name: "",
          template: false,
          place_data: placesData[index + 1],
          days: tableInputDays[index + 1],
          price: tableInputPrice[index + 1]
        });
      }
    });
  };

  useEffect(() => {
    handleContexUpdate();
  }, [tableInputPrice]);

  const handleAdd = () => {
    setShippingData([
      ...shippingData,
      {
        key: shippingData.length + 1,
        region: (
          <Form.Item>
            <SelectTree index={shippingData.length + 1} key={shippingData.length + 1} />
          </Form.Item>
        ),
        duration: (
          <Form.Item name={`days_${shippingData.length + 1}`}>
            <Input
              key={`days_${shippingData.length + 1}`}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                setTableInputDays({
                  ...tableInputDays,
                  [shippingData.length + 1]: value
                });
              }}
              suffix={<p className=" font-mardoto text-[#8A898C] leading-[16px] font-normal">օր</p>}
            />
          </Form.Item>
        ),
        cost: (
          <Form.Item name={`price_${shippingData.length + 1}`}>
            <Input
              key={`price_${shippingData.length + 1}`}
              onChange={(e) => {
                e.preventDefault();
                const { value } = e.target;
                setTableInputPrice({
                  ...tableInputPrice,
                  [shippingData.length + 1]: value
                });
              }}
              onBlur={() => handleContexUpdate()}
              type="number"
              min={1}
              suffix="֏"
            />
          </Form.Item>
        )
      }
    ]);
  };

  const handleDisableInputs = (id: number, dataId: string) => {
    const data = [...shippingData].map((item: { key: number }) => {
      if (id === item.key) {
        return {
          ...item,
          templateId: dataId,
          duration: (
            <Form.Item name={`days_${shippingData.length + 1}`}>
              <Input
                disabled
                key={`days_${shippingData.length + 1}`}
                defaultValue={tableInputDays[item.key]}
                suffix={
                  <p className=" font-mardoto text-[#8A898C] leading-[16px] font-normal">օր</p>
                }
              />
            </Form.Item>
          ),
          cost: (
            <Form.Item name={`price_${shippingData.length + 1}`}>
              <Input
                disabled
                key={`price_${shippingData.length + 1}`}
                defaultValue={tableInputPrice[item.key]}
                type="number"
                min={1}
                suffix="֏"
              />
            </Form.Item>
          )
        };
      } else return item;
    });

    setShippingData(data);
  };

  if (item.key == "sw_1") {
    content = (
      <div className="flex justify-start items-center space-x-[24px]">
        <Form.Item label="Նախընտրելի օրեր" name="preferred_days" labelCol={{ span: 24 }}>
          <Select
            mode="multiple"
            size={size}
            placeholder="Նախընտրելի օրեր"
            style={{ width: "100%", minWidth: 459 }}
            options={weekdays}
            maxTagCount="responsive"></Select>
        </Form.Item>
        <Form.Item label="Նախընտրելի ժամեր" name="preferred_hours" labelCol={{ span: 24 }}>
          <TimePicker.RangePicker style={{ width: "459px" }} />
        </Form.Item>
      </div>
    );
  } else if (item.key == "sw_2") {
    content = (
      <>
        <TableSimple columns={columns} data={shippingData} />
        <div className="flex justify-start items-center space-x-[24px] mt-[24px]">
          <Button
            onClick={handleAdd}
            className=" border-[#1F598E] text-[#1F598E] "
            icon={<PlusCircleOutlined />}>
            Ստեղծել նորը
          </Button>
          <Button
            className="flex items-center justify-center border-[#1F598E] text-[#1F598E]"
            icon={<img src={template} />}>
            Ընտրել ձևանմուշներից
          </Button>
        </div>
      </>
    );
  } else if (item.key == "sw_3") {
    content = (
      <div className="felx flex-col justify-center items-center space-y-[24px]">
        <div className="flex justify-start items-center space-x-[24px]">
          <Form.Item
            tooltip={{
              title: "Tooltip with customize icon",
              icon: <InfoCircleOutlined className=" ml-[-6px]" />
            }}
            label="Ծանր ոցի քաշ"
            name="package_weight"
            labelCol={{ span: 24 }}>
            <Input suffix={<p className="text-[#8A898C]">գր.</p>} style={{ width: 471 }} />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            tooltip={{ title: "Tooltip with customize icon", icon: <InfoCircleOutlined /> }}
            label={<p className="w-[121px] text-[14px]">Ծանրոցի չափսեր</p>}>
            <div className="flex justify-start items-center space-x-[24px] ">
              <Form.Item name="package_size">
                <Input suffix={<p className="text-[#8A898C]">սմ.</p>} style={{ width: 126 }} />
              </Form.Item>
              <Form.Item name="package_size_1" labelCol={{ span: 24 }}>
                <Input suffix={<p className="text-[#8A898C]">սմ.</p>} style={{ width: 126 }} />
              </Form.Item>{" "}
              <Form.Item name="package_size_2" labelCol={{ span: 24 }}>
                <Input suffix={<p className="text-[#8A898C]">սմ.</p>} style={{ width: 126 }} />
              </Form.Item>
            </div>
          </Form.Item>
        </div>

        <RadioButton />

        <Form.Item
          labelCol={{ span: 24 }}
          name="delivery_services"
          tooltip={{ title: "Tooltip with customize icon", icon: <InfoCircleOutlined /> }}
          label="Ավելացրեք առաքման ծառայություններ">
          {/* TODO need to open modal  "Առաքման ծառայություններ"   list*/}
          <Input
            readOnly
            suffix={
              <Button
                onClick={() => {}}
                style={{
                  marginLeft: 8,
                  borderRadius: "50%",
                  width: 20,
                  height: 20,
                  padding: 0,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}>
                +
              </Button>
            }
          />
          {/* TODO */}
          {deliverServices && (
            <TableSimple
              data={deliverServices}
              columns={[
                { title: "Ծառայություն", dataIndex: "service" },
                { title: "Տեսակ", dataIndex: "type" },
                {
                  title: "Տևողություն",
                  dataIndex: "duration"
                },
                {
                  title: "Արժեք",
                  dataIndex: "cost"
                },
                { title: "", dataIndex: "dots" }
                // ...rest
              ]}
            />
          )}
        </Form.Item>
      </div>
    );
  }

  return <>{content}</>;
};

export default ShipingDataSwitchItems;
