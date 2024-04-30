import { Divider, Form } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./createItem.css";

import { addProduct } from "../../../services/products.service";
import { modifyProductFormData } from "../../../utils/modifyData.util";
import { categoriesType } from "../../../components/createItem/constants/types";

import SubmitItem from "../../../components/formItems/SubmitItem";
import FormWrapper from "../../../components/shared/Form/FormWrapper";
import FormMainDatas from "../../../components/createItem/createProduct/FormMainDatas";
import FormSaleDatas from "../../../components/createItem/createProduct/Sale/FormSaleDatas";
import FormFileUpload from "../../../components/createItem/createProduct/FormFileUpload";
import FormShippingData from "../../../components/createItem/createProduct/Shipping/FormSippingData";
import FormCharacteristics from "../../../components/createItem/createProduct/Characteristics/FormCharacteristics";
import { productState } from "../../../context/product-context";
import { clearUndefinedValuesFromObject, objectToFormData } from "../../../utils/object.util";
import { removeUndefined } from "../../../utils/removeUndefined.util";

//Test data
function CreateItem() {
  const [characteristic, setCharacteristic] = useState<categoriesType[]>([]);

  const { images, videos, inputs, cardItems, latestCategories, shippingIds, shippingDatas } =
    productState();

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [window]);

  const onFinish = async (values: any) => {
    const clearedData = clearUndefinedValuesFromObject(values);

    const modData = modifyProductFormData({
      images,
      video: videos,
      shippingDatas,
      shippingIds,
      ...clearedData,
      category_id: latestCategories[latestCategories.length - 1]?.id,
      releted_products: cardItems,
      discount: inputs,

      status: form.getFieldValue("status"),
      extra_data: characteristic
    });
    const clearData = removeUndefined(modData);

    const data = objectToFormData(clearData);

    try {
      const res = await addProduct(data);
      console.log(res);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleButtonClick = (status: string) => {
    form.setFieldsValue({ status: status });
  };

  return (
    <FormWrapper onFinish={onFinish} form={form} title="Նոր ապրանք">
      <FormFileUpload />
      <Divider />
      <FormMainDatas />
      <FormCharacteristics characteristic={characteristic} setCharacteristic={setCharacteristic} />
      <FormSaleDatas />
      <FormShippingData />

      <SubmitItem
        info={
          "Figma ipsum component variant main layer. Selection content figjam overflow slice undo. Link pen effect group flatten move variant. Rectangle project blur share list line star. Selection clip team library main inspect object ipsum. Group bullet community scale font share project image. Follower font font export duplicate selection clip bold community rectangle. Italic mask list flatten polygon."
        }
        title={"Հրապարակեք ձեր ապրանքը "}
        submitText={"Հրապարակել"}
        description={
          "Figma ipsum component variant main layer. Union vector flatten rotate content selection rectangle move. Subtract community pencil pencil draft create ellipse effect font. Project overflow pixel layout follower community ellipse duplicate."
        }
        onSubmit={handleButtonClick}
      />
    </FormWrapper>
  );
}

export default CreateItem;
