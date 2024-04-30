import React, { FC, HTMLAttributes } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import OptionsIcon from "../../../assets/images/options_icon.svg";

interface DataType {
  key: string;
  multimedia: string;
  description: string;
}

interface IServicePortfolioTableProps extends HTMLAttributes<HTMLTableElement> {
  data: DataType[];
}

const columns: ColumnsType<DataType> = [
  {
    title: "Նկար / Վիդեո",
    dataIndex: "multimedia",
    key: "multimedia",
    width: "146px",
    render: (img) => (
      <div>
        <img src={img} alt="#" />
      </div>
    )
  },
  {
    title: "Նկարագրություն",
    dataIndex: "description",
    key: "description"
  },
  {
    title: "",
    key: "action",
    render: () => (
      <div className={"flex items-center justify-center cursor-pointer"}>
        <img src={OptionsIcon} alt="options_icon" />
      </div>
    ),
    width: "100px"
  }
];

const ServicePortfolioTable: FC<IServicePortfolioTableProps> = ({ data }) => (
  <Table
    pagination={false}
    rootClassName={"root_portfolio_table"}
    columns={columns}
    dataSource={data}
  />
);

export default ServicePortfolioTable;
