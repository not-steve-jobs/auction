import React, { FC, useState } from "react";
import { Select } from "antd";
import "./FormMultiRenderer.css";
import Input from "../../shared/Input";
import PlusButton from "./PlusButton";
import MinusButton from "./MinusButton";

interface ISocialMediaMultiInputRendererProps {
  required?: boolean;
  // eslint-disable-next-line no-unused-vars
  emitSocialMediaMultiInputData: (data: { [key: string]: string }[]) => void;
}

const SOCIAL_NETWORKS = [
  { value: "instagram", label: "Instagram" },
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "pinterest", label: "Pinterest" },
  { value: "snapchat", label: "Snapchat" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "whatsapp", label: "WhatsApp" }
];

const SocialMediaMultiInputRenderer: FC<ISocialMediaMultiInputRendererProps> = ({
  emitSocialMediaMultiInputData
}) => {
  const [state, setState] = useState([{ social_platform: "", link: "" }]);

  const handleAddClick = () => {
    const newField = { social_platform: "", link: "" };

    setState((prev) => [...prev, newField]);
  };

  const handleFieldChange = (value: string, index: number, updateBy: string) => {
    const updateState = state.map((item, itemIndex) =>
      itemIndex === index ? { ...item, [updateBy]: value } : item
    );

    const filterUpdateStateForEmit = updateState.filter((item) => item.link !== "");

    setState(updateState);
    emitSocialMediaMultiInputData(filterUpdateStateForEmit);
  };

  const handleFieldDelete = (index: number) => {
    const updateState = [...state];

    updateState.splice(index, 1);

    const filterDataForEmit = updateState.filter((item) => item.link !== "");

    setState(updateState);

    if (filterDataForEmit.length) {
      emitSocialMediaMultiInputData(filterDataForEmit);
    }
  };

  return (
    <div className={"flex w-full gap-x-[24px]"}>
      <div className={"flex flex-col gap-y-[10px]"}>
        <div className={"flex items-center gap-x-[24px]"}>
          <label className={"w-[290px] font-mardoto text-[#404953] text-[14px] leading-normal"}>
            Սոց. հարթակ
          </label>
          <label className={"w-[290px] font-mardoto text-[#404953] text-[14px] leading-normal"}>
            Հղում
          </label>
        </div>
        {state.map((item, index) => (
          <div className={"flex items-center gap-x-[24px]"} key={index}>
            <Select
              defaultValue={item.social_platform}
              className={`!w-[290px] h-[52px] border-[#667085] rounded-[6px] outline-none social_media_picker`}
              onChange={(event) => handleFieldChange(event, index, "social_platform")}
              options={SOCIAL_NETWORKS}
            />
            <Input
              type={"text"}
              maxLength={500}
              value={item.link}
              onChange={(event) => handleFieldChange(event.target.value, index, "link")}
              className={
                "w-[290px] h-[52px] border-[#667085] text-[#232323] text-[14px] font-mardoto leading-normal rounded-[6px] px-[10px] outline-none"
              }
            />

            {index ? (
              <MinusButton
                onClick={() => handleFieldDelete(index)}
                className={`hover:bg-[#F4B405] transition duration-200 flex items-center justify-center bg-[#DC4536] rounded-[3px] w-[52px] h-[52px] cursor-pointer`}
              />
            ) : (
              <PlusButton
                className={
                  "hover:bg-[#F4B405] w-[52px] h-[52px] flex items-center justify-center bg-[#1F598E] rounded-[3px] cursor-pointer"
                }
                onClick={handleAddClick}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMediaMultiInputRenderer;
