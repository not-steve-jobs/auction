import ServiceCategory from "../../../../components/service/ServiceCategory";
import ServiceContentWrapper from "../../../../components/service/ServiceContentWrapper";
import ServiceBreadcrumb from "../../../../components/service/ServiceBreadcrumb";
import ServiceWrapper from "../../../../components/service/ServiceWrapper";

const ServiceCategories = () => {
  return (
    <ServiceWrapper>
      <ServiceContentWrapper
        title={"Ընտրեք կատեգորիան"}
        description={
          "Figma ipsum component variant main layer. Selection content figjam overflow slice undo.\n" +
          "    Link pen effect group flatten move variant. Rectangle project blur share list line star.\n" +
          "    Selection clip team library main inspect object ipsum. Group bullet community scale font\n" +
          "    share project image. Follower font font export duplicate selection clip bold community\n" +
          "    rectangle. Italic mask list flatten polygon."
        }>
        <ServiceBreadcrumb />
        <ServiceCategory />
      </ServiceContentWrapper>
    </ServiceWrapper>
  );
};

export default ServiceCategories;
