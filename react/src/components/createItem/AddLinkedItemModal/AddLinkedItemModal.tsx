import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Button, Modal, Space, Input, Checkbox } from "antd";

import "./addLinkedItemModal.css";

import CreateItemCard from "../createProduct/Sale/CreateItemCard";

interface IAddLinkedItemModalProps {
  // eslint-disable-next-line no-unused-vars
  onSubmit: (items: ICardItem[]) => void;
  onClick?: () => {};
  cardItems?: any[];
}

interface ICardItem {
  id: number;
  key: number;
  title: string;
  desc: string;
  src: string;
}

const AddLinkedItemModal: React.FC<IAddLinkedItemModalProps> = ({
  onSubmit,
  onClick,
  cardItems
}) => {
  const [selectedItems, setSelectedItems] = useState<ICardItem[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
    onClick && onClick();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    onSubmit(selectedItems);
    handleCancel();
  };

  const handleCheck = (checked: boolean, item: ICardItem) => {
    if (checked) {
      setSelectedItems([...selectedItems, item]);
    } else {
      setSelectedItems(selectedItems.filter((selected) => selected.id !== item.id));
    }
  };

  return (
    <>
      <Button
        className="addbutton"
        type="primary"
        ghost
        style={{
          marginLeft: 8,
          border: "none",
          width: 20,
          height: 20,
          padding: 0,
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
        onClick={showModal}>
        <PlusCircleOutlined />
      </Button>

      <Modal
        title="Կատեգորիա"
        width={800}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Button className="nextButton" type="primary" onClick={handleFormSubmit}>
            Ավելացնել
          </Button>
        }>
        <p>Հայտարարել կապակցված ապրանքներ</p>
        <div className="itemContainer">
          <div className="categories">
            <Space.Compact size="large" className="categoriesSearch">
              <Input addonBefore={<SearchOutlined />} />
            </Space.Compact>
            <Space size={[72, 72]} wrap className="mt-[48px]">
              {cardItems &&
                cardItems.map((item) => {
                  return (
                    <div className="productsWrapper" key={item.key}>
                      <Checkbox
                        className="productCheckbox"
                        onChange={(e) => handleCheck(e.target.checked, item)}>
                        <CreateItemCard {...item} size={{ width: "200px", height: "375px" }} />
                      </Checkbox>
                    </div>
                  );
                })}
            </Space>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AddLinkedItemModal;
