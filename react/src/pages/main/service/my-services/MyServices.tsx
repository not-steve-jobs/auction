import ServiceContentWrapper from "../../../../components/service/ServiceContentWrapper";
import ServiceWrapper from "../../../../components/service/ServiceWrapper";
import MyServicesContent from "../../../../components/service/MyServicesContent";

const MyServices = () => {
  return (
    <ServiceWrapper>
      <ServiceContentWrapper
        title={"Իմ ծառայությունները"}
        description={
          "Figma ipsum component variant main layer. Selection content figjam overflow slice undo.\n" +
          "          Link pen effect group flatten move variant. Rectangle project blur share list line star.\n" +
          "          Selection clip team library main inspect object ipsum. Group bullet community scale font\n" +
          "          share project image. Follower font font export duplicate selection clip bold community\n" +
          "          rectangle. Italic mask list flatten polygon."
        }>
        <MyServicesContent />
      </ServiceContentWrapper>
    </ServiceWrapper>
  );
};

export default MyServices;
