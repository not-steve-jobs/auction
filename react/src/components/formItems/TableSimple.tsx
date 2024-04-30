import React, { FC } from "react";
import { Table } from "antd";
import "./tableSimple.css";

interface DataType {
  cost?: string;
  type?: string;
  service?: any;
  key?: React.Key;
  region?: string;
  duration?: string;
  dots?: React.ReactElement;
  trash?: any;
  render?: any;
}

const rowClassName = (record: any, index: number) => {
  return index % 2 === 0 ? "even-row" : "odd-row";
};
interface ITableSimplePeops {
  data: DataType[] | undefined;
  columns: any;
}
const TableSimple: FC<ITableSimplePeops> = ({ data, columns }) => {
  return (
    <Table
      onChange={(e) => {
        // console.log(e);
      }}
      locale={{
        emptyText: (
          <p className="font-mardoto text-[16px] leading-[22px] font-normal text-[#000]">
            Չկան ավելացված տողեր
          </p>
        )
      }} // Set the empty text
      className="simple-table"
      style={{ fontFamily: "Mardoto, sans-serif", marginTop: 24 }}
      rowClassName={rowClassName}
      columns={columns}
      dataSource={data}
      size="middle"
      pagination={false}
    />
  );
};

export default TableSimple;
