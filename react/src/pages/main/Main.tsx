import OnBoarding from "../../components/auth/OnBoarding";
import CreateItemModal from "../../components/createItem/CreateItemModal/CreateItemModal";

import "../../components/service/createService/createService.css";

function Main() {
  return (
    <div className={"flex flex-col items-center justify-center  "}>
      <div className={"font-mardoto text-[#101B28] text-[40px] space-x-0.5 font-normal mb-[65px]"}>
        Գլխավոր էջ
      </div>
      <CreateItemModal />
      <OnBoarding />
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="middle none center rounded-lg py-3 px-6 font-sans text-xl mt-28 font-bold uppercase text-[#1f598e] transition-all hover:bg-[#1f598e57] active:bg-[#1f598e57] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
        Auth
      </button>
    </div>
  );
}

export default Main;
