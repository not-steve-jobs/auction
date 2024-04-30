import React, { useState } from "react";
import { Button, Modal, Input } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";

import "./addCharacteristicModal.css";
import { categoriesType } from "../constants/types";

interface IAddCharacteristicModalProps {
  // eslint-disable-next-line no-unused-vars
  handleSubmit: (name: string, value: string) => void;
  characteristic: categoriesType[];
}

const AddCharacteristicModal: React.FC<IAddCharacteristicModalProps> = ({
  handleSubmit,
  characteristic
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = () => {
    handleSubmit(name, value);
    handleCancel();
    setName("");
    setValue("");
  };

  return (
    <>
      <Button
        className={`addbutton ${characteristic.length && "mt-[55px]"}`}
        type="primary"
        ghost
        icon={<PlusCircleOutlined />}
        onClick={showModal}>
        Ավելացնել նոր բնութագիր
      </Button>
      <Modal
        title="Հավելյալ բնութագիր"
        width={658}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={
          <Button
            disabled={!name || !value}
            className="nextButton"
            type="primary"
            onClick={handleFormSubmit}>
            Ավելացնել
          </Button>
        }>
        <div className="modalContainer">
          <p>Մուտքագրեք ձեր ապրանքին հատուկ բնութագիր, որը կտեսնեն գնորդները</p>

          <p>Անվանում</p>
          <Input value={name} showCount maxLength={20} onChange={(e) => setName(e.target.value)} />

          <p>Արժեք</p>
          <Input
            value={value}
            showCount
            maxLength={20}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddCharacteristicModal;
