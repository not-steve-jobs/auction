import { Divider, Form, UploadFile } from "antd";
import BasicData from "./BasicData";
import ImagesAndVideos from "./ImagesAndVideos";
import FormWrapper from "../../shared/Form/FormWrapper";
import CreateServiceContacts from "./CreateServiceContacts";
import ServiceDetails from "./ServiceDetails";
import SubmitItem from "../../formItems/SubmitItem";
import { createService } from "../../../services/services.service";
import { useNavigate } from "react-router-dom";
import { RcFile } from "antd/es/upload";
import { clearUndefinedValuesFromObject, objectToFormData } from "../../../utils/object.util";
import validateUtil from "../../../utils/validator.util";
import { createServiceSchema } from "../../../schemas/service.schema";
import { useEffect } from "react";

const CreateServiceForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = async (formData: any) => {
    const fieldNames = ["status", "category_id", "contacts", "images", "video", "portfolioIds"];
    const formValues = form.getFieldsValue(fieldNames);

    const filteredData = clearUndefinedValuesFromObject({ ...formData, ...formValues });

    const { isValid, errors } = await validateUtil(filteredData, createServiceSchema);

    console.log(filteredData);
    console.log(isValid);
    console.log(errors);

    const payload = objectToFormData(filteredData);

    try {
      await createService(payload);

      navigate("/service/my-services");
    } catch (error) {
      return error;
    }
  };

  const handleSubmit = (status: string) => {
    form.setFieldsValue({ status: status });
  };

  const handleCategoryChange = (id: string | number | undefined) => {
    form.setFieldsValue({ category_id: id });
  };

  const handleImageAndVideoChange = (data: {
    image: UploadFile<RcFile>[];
    video: UploadFile<RcFile>[];
  }) => {
    const { image: images, video } = data;

    form.setFieldsValue({ images, video });
  };

  const handlePortfolioIdsChange = (portfolioIds: string[]) => {
    form.setFieldsValue({ portfolioIds });
  };

  const handleContactsInfoChange = (data: any, key: string) => {
    const contacts = form.getFieldValue("contacts");

    if (!contacts) {
      form.setFieldsValue({ contacts: { [key]: data } });
    }

    const updatedContactsData = { ...contacts, [key]: data };

    form.setFieldsValue({ contacts: updatedContactsData });
  };

  useEffect(() => {
    form.setFieldsValue({ contacts: { phones: [] } });
  }, []);

  return (
    <FormWrapper
      form={form}
      onFinish={handleFinish}
      title={"Ծառայության քարտ"}
      description={
        "Figma ipsum component variant main layer. Selection content figjam overflow slice undo. Link pen effect group flatten move variant. Rectangle project blur share list line star. Selection clip team library main inspect object ipsum."
      }>
      <ImagesAndVideos onMultimediaChange={handleImageAndVideoChange} />
      <Divider className={"bg-[#8080804D]"} />
      <BasicData emitChosenCategory={handleCategoryChange} />
      <Divider className={"bg-[#8080804D]"} />
      <CreateServiceContacts onContactsInfoChange={handleContactsInfoChange} />
      <Divider className={"bg-[#8080804D]"} />
      <ServiceDetails onPortfolioIdsUpdate={handlePortfolioIdsChange} />
      <Divider className={"bg-[#8080804D]"} />
      <SubmitItem
        info={
          "Figma ipsum component variant main layer. Selection content figjam overflow slice undo. Link pen effect group flatten move variant. Rectangle project blur share list line star. Selection clip team library main inspect object ipsum. Group bullet community scale font share project image. Follower font font export duplicate selection clip bold community rectangle. Italic mask list flatten polygon."
        }
        title={"Բաժանորդագրվեք ծառայության հայտերին"}
        submitText={"Բաժանորդագրվել"}
        description={
          "Figma ipsum component variant main layer. Union vector flatten rotate content selection rectangle move. Subtract community pencil pencil draft create ellipse effect font. Project overflow pixel layout follower community ellipse duplicate."
        }
        onSubmit={handleSubmit}
      />
    </FormWrapper>
  );
};

export default CreateServiceForm;
