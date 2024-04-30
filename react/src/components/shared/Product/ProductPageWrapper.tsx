// import Footer from "../Footer";
import { Outlet } from "react-router-dom";

const ProductPage = () => {
  return (
    <div className="pt-[10px] bg-[#8080804D] opacity-30 h-screen">
      <div className="grid grid-cols-2 gap-6 grid-flow-row grid-">
        {/* Left Sidebar */}
        <div className=" mx-w-[193px] p-5 text-center bg-white row-start-1 row-end-3 h-full">A</div>

        {/* Right Part */}
        <Outlet />
        <div className="p-5 text-center bg-white col-start-2 col-end-4">Navbar</div>
        <div className="p-5 text-center bg-white col-start-2 col-end-4">Filters</div>
        <div className="p-5 text-center bg-white col-start-2 col-end-4">Main Table</div>
        <div className="p-5 text-center bg-white col-start-2 col-end-4">Pagination</div>
        <div className="p-5 text-center bg-opacity-0 col-start-1 col-end-6">Footer</div>
      </div>
    </div>
    // <div classNameName="bg-[#8080804D] opacity-30  justify-center items-start gap-6 inline-flex">
    //   <Footer>sdftgh</Footer>
    // </div>
  );
};

export default ProductPage;
