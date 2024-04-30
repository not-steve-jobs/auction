import { FC, HTMLAttributes } from "react";

interface ICategoryCardProps extends HTMLAttributes<HTMLDivElement> {
  image: string;
  category_name: string;
  applications_received_count: number | string;
}

const CategoryCard: FC<ICategoryCardProps> = ({
  image,
  category_name,
  applications_received_count,
  ...attributes
}) => {
  return (
    <div
      className={
        "w-[260px] border border-[#B3B3B3] p-[0_16px_16px_16px] rounded-[8px] cursor-pointer"
      }
      {...attributes}>
      <div className={"w-[228px] h-[217px] object-contain flex items-center"}>
        <img src={image} alt="category_image" />
      </div>
      <div>
        <div className={"text-[18px] font-mardoto leading-normal font-bold"}>{category_name}</div>
        <div className={"text-[16px] leading-[22px] font-mardoto"}>
          Ստացված հայտեր - {applications_received_count}
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
