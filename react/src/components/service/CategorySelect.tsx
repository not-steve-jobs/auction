import useClickAway from "../../hooks/useClickAway";
import { FC, HTMLAttributes, MouseEvent, useEffect, useRef, useState } from "react";
import ArrowDownIcon from "../../assets/images/breadcrumb-arrow.svg";
import { getServiceCategories } from "../../services/services.service";
import { getCategories } from "../../services/products.service";

interface ICategorySelectItemProps extends HTMLAttributes<HTMLDivElement> {
  data: any;
}

interface ICategorySelectProps {
  data: any;
  isProducts?: boolean;
  // eslint-disable-next-line no-unused-vars
  onCategoryChange: (category_id?: string | number) => void;
}

const CategorySelectItem: FC<ICategorySelectItemProps> = ({ data, ...attr }) => {
  return (
    <div
      {...attr}
      className={
        "flex items-center justify-between text-[#232323] font-medium text-[16px] leading-normal font-mardoto pl-[30px] py-[10px] border-b border-[#8080804D] cursor-pointer hover:bg-[#EBF3FB]"
      }>
      <p>{data.name}</p>
      {!!data.subCategories?.length && <img src={ArrowDownIcon} alt="#" />}
    </div>
  );
};

const CategorySelect: FC<ICategorySelectProps> = ({ data, onCategoryChange, isProducts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectBreadcrumbData, setSelectBreadcrumbData] = useState<any[]>([]);
  const selectTableRef = useRef<HTMLDivElement>(null);
  const selectFieldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    onComponentFirstUpdate();
  }, []);

  const onComponentFirstUpdate = async () => {
    if (data.length) {
      const value = data
        .map((item: any) => (item.name ? item.name : undefined))
        .filter((item: any) => !!item)
        .join(" / ");

      setSelectBreadcrumbData(data);
      setValue(value);
      onCategoryChange(data[data.length - 1]?.id);
      return;
    }

    //TODO props
    const categories = isProducts ? await getCategories : await getServiceCategories();

    setSelectBreadcrumbData([categories]);
  };

  const handleSelectInputClick = () => {
    setIsOpen(true);
  };

  const closeSelect = () => {
    setIsOpen(false);
  };

  const handleCategoryClick = (event: MouseEvent<HTMLDivElement>, category: any) => {
    event.stopPropagation();

    const { id, name, subCategories } = category;

    setSelectBreadcrumbData((prevState) => [...prevState, category]);
    setValue((prev) => `${prev}${prev ? " / " : ""}${name}`);

    if (!subCategories || !subCategories?.length) {
      setIsOpen(false);

      onCategoryChange(id);

      return;
    }
  };

  const breadcrumbToPrevState = () => {
    const updatedBreadcrumbData = [...selectBreadcrumbData];

    updatedBreadcrumbData.pop();

    setSelectBreadcrumbData(updatedBreadcrumbData);
  };

  const selectValueToPrevState = () => {
    const parts = value.split(" / ");

    parts.pop();

    const updatedString = parts.join(" / ");

    setValue(updatedString);
  };

  const toPrevCategory = () => {
    if (selectBreadcrumbData.length <= 1) return;

    breadcrumbToPrevState();
    selectValueToPrevState();
    onCategoryChange(undefined);
  };

  useClickAway(selectFieldRef, [selectTableRef], closeSelect);

  return (
    <div className={"relative w-full"}>
      <div
        ref={selectFieldRef}
        className={
          "flex items-center justify-between h-[52px] border border-[#667085] rounded-[6px] px-[10px] cursor-text"
        }
        onClick={handleSelectInputClick}>
        <div className={"text-[14px] font-mardoto font-bold text-[#232323]"}>
          {value || (
            <span className={"text-[#00000040] font-normal"}>
              Կատեգորիա 1 / Կատեգորիա 1.1 / Կատեգորիա 1.1.1
            </span>
          )}
        </div>
        <img className={"rotate-90 w-[24px] h-[24px]"} src={ArrowDownIcon} alt="" />
      </div>
      {isOpen && (
        <div
          ref={selectTableRef}
          className={`absolute z-[2] w-full border border-[#667085] bg-[#fff] rounded-[6px] p-[16px] mt-[10px] max-h-[500px] overflow-auto`}>
          <div
            onClick={() => {
              toPrevCategory();
            }}
            className={
              "flex items-center gap-x-[8px] text-[#1F598E] text-[18px] font-mardoto font-bold leading-normal border-b border-[#8080804D] pb-[10px]"
            }>
            {selectBreadcrumbData.length > 1 && (
              <img className={"rotate-180 cursor-pointer"} src={ArrowDownIcon} alt="#" />
            )}
            <p>
              {selectBreadcrumbData.length === 1
                ? "Կատեգորիա"
                : selectBreadcrumbData[selectBreadcrumbData.length - 1].name}
            </p>
          </div>
          <div className={"flex flex-col gap-y-[10px] mt-[10px]"}>
            {selectBreadcrumbData.length === 1
              ? selectBreadcrumbData[0].map((item: any) => (
                  <CategorySelectItem
                    key={item.id}
                    data={item}
                    onClick={(e: MouseEvent<HTMLDivElement>) => handleCategoryClick(e, item)}
                  />
                ))
              : selectBreadcrumbData[selectBreadcrumbData.length - 1]?.subCategories?.map(
                  (item: any) => (
                    <CategorySelectItem
                      key={item.id}
                      data={item}
                      onClick={(e: MouseEvent<HTMLDivElement>) => handleCategoryClick(e, item)}
                    />
                  )
                )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategorySelect;
