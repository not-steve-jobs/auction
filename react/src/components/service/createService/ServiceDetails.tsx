import FormItemGroupWrapper from "../../formItems/FormItemGroupWrapper";
import SwitchWrapper from "../../formItems/SwitchWrapper";
import BlueButtonAddIcon from "../../../assets/images/blue_button_add_icon.svg";
import Button from "../../shared/Button";
import UploadPortfolioModal from "./UploadPortfolioModal";
import { FC, useState } from "react";
import ServicePortfolioTable from "./ServicePortfolioTable";
import { getMultimedia } from "../../../utils/multimedia.util";

interface IServiceUploadPortfolioProps {
  // eslint-disable-next-line no-unused-vars
  onPortfolioUpdate: (data: any) => void;
}

interface IServiceDetailsProps {
  // eslint-disable-next-line no-unused-vars
  onPortfolioIdsUpdate: (data: string[]) => void;
}

const ServiceUploadPortfolio: FC<IServiceUploadPortfolioProps> = ({ onPortfolioUpdate }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalConfirm = (data: any) => {
    setShowModal(false);

    onPortfolioUpdate(data);
  };

  return (
    <>
      <Button
        onClick={(event) => {
          event.preventDefault();
          setShowModal(true);
        }}
        className={
          "mt-[24px] flex items-center justify-center gap-x-[10px] border-[#1F598E] rounded-[3px] text-[#1F598E] font-mardoto text-[14px] font-medium  leading-normal"
        }>
        <img src={BlueButtonAddIcon} alt="add_icon" />
        Ավելացնել
      </Button>
      <UploadPortfolioModal
        open={showModal}
        handleCancel={() => setShowModal(false)}
        handleOk={handleModalConfirm}
      />
    </>
  );
};

const ServiceDetails: FC<IServiceDetailsProps> = ({ onPortfolioIdsUpdate }) => {
  const [portfolioData, setPortfolioData] = useState<
    {
      key: string;
      multimedia: string;
      description: string;
    }[]
  >([]);

  const updatePortfolioIds = (
    data: {
      key: string;
      multimedia: string;
      description: string;
    }[]
  ) => {
    const portfolioIds = data.map((item) => item.key);

    onPortfolioIdsUpdate(portfolioIds);
  };

  const handlePortfolioDataUpdate = (data: any) => {
    const { id, multimedia, description } = data;
    const replaceDataForTable = { key: id, multimedia: getMultimedia(multimedia), description };

    setPortfolioData((prev) => [...prev, replaceDataForTable]);
    updatePortfolioIds([...portfolioData, replaceDataForTable]);
  };

  return (
    <FormItemGroupWrapper
      title={"Ծառայության մանրամասներ"}
      titleInfo={"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rerum, voluptatem."}>
      <SwitchWrapper
        title={"Ակտիվացրեք, եթե ունեք կատարված աշխատանքների պորտֆոլիո"}
        description={
          "Ձեր ծառայությունով հետաքրքրված հաճախորդներին կցուցադրվի նախկինում կատարած ձեր աշխատանքները"
        }>
        <ServiceUploadPortfolio onPortfolioUpdate={handlePortfolioDataUpdate} />
        {!!portfolioData.length && <ServicePortfolioTable data={portfolioData} />}
      </SwitchWrapper>
    </FormItemGroupWrapper>
  );
};

export default ServiceDetails;
