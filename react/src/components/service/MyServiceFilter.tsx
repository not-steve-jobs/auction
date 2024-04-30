import FilterIcon from "../../assets/images/filter_icon.svg";

const MyServiceFilter = () => {
  return (
    <div className={"relative"}>
      <div className={"cursor-pointer"}>
        <img src={FilterIcon} alt="filter_icon" />
      </div>
      <div></div>
    </div>
  );
};

export default MyServiceFilter;
