import { Outlet } from "react-router-dom";
import Footer from "../../components/shared/Footer";
import constants from "../../components/auth/constants";
import { ProductContextProvider } from "../../context/product-context";
const { AUTH_FOOTER_LIST_CLASSES } = constants;

function MainLayout() {
  return (
    <>
      <ProductContextProvider>
        <main>
          <Outlet />
        </main>
      </ProductContextProvider>
      <Footer
        // eslint-disable-next-line react/no-children-prop
        children={
          <>
            <div className={"flex justify-center mt-[4px] mb-[8px]"}>
              <ul className={"list-none flex items-center"}>
                <li className={`text-[#1376DD]  ${AUTH_FOOTER_LIST_CLASSES}`}>
                  <a href={"#"}>Օգտագործման պայմաններ</a>
                </li>
                <div className="border border-[#D9D9D9] h-[18px] border-r-[transparent]"></div>
                <li className={`text-[#1376DD]  ${AUTH_FOOTER_LIST_CLASSES}`}>
                  <a href={"#"}>Գաղտնիության քաղաքականություն</a>
                </li>
              </ul>
            </div>
          </>
        }></Footer>
    </>
  );
}

export default MainLayout;
