import { FC } from "react";

const tabs = [
  {
    id: 1,
    key: "all",
    label: "Բոլորը"
    // count: Math.floor(Math.random() * 200)
  },
  {
    id: 2,
    key: "active",
    label: "Ակտիվ"
    // count: Math.floor(Math.random() * 200)
  },
  {
    id: 3,
    key: "passive",
    label: "Պասիվ"
    // count: Math.floor(Math.random() * 200)
  },
  {
    id: 4,
    key: "draft",
    label: "Սևագիր"
    // count: Math.floor(Math.random() * 200)
  },
  {
    id: 5,
    key: "archive",
    label: "Արխիվ"
    // count: Math.floor(Math.random() * 200)
  }
];

interface IMyServiceTabsProps {
  tab: string;
  // eslint-disable-next-line no-unused-vars
  onTabChange: (tab: string) => void;
}

const MyServiceTabs: FC<IMyServiceTabsProps> = ({ tab, onTabChange }) => {
  return (
    <div className={"flex items-center gap-x-[30px]"}>
      {tabs.map((item) => (
        <div
          key={item.id}
          className={`border-b-[2px] cursor-pointer px-[10px] pb-[10px] ${
            tab === item.key ? "border-[#1F598E]" : "border-[#8A898C]"
          }`}
          onClick={() => onTabChange(item.key)}>
          <div
            className={`flex items-center font-mardoto font-bold text-[18px] leading-normal  ${
              tab === item.key ? "text-[#1F598E]" : "text-[#8A898C]"
            }`}>
            {item.label}
            {/*<span className={"font-medium text-[14px] ml-[6px]"}>({item.count})</span>*/}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyServiceTabs;
