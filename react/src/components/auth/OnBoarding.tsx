import React, { FC } from "react";

import BackIcon from "../../assets/images/arrow-to-left-onboarding.svg";
import NextIcon from "../../assets/images/arrow-to-right-onboarding.svg";
import OnBoardingTestImage from "../../assets/images/test/on_boarding-test.png";

import { Carousel } from "@material-tailwind/react";

interface IArrowProps {
  arrowCLick?: () => void;
}

interface ICarouselProps {
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
  activeIndex: number;
  length: number;
}

interface IOnBoardingContent {
  heading: string;
  text: string;
}

const OnBoardingArrowText = "font-mardoto font-medium leading-[20px] text-[20px] text-[#1376DD]";

const onBoardingData = [
  {
    key: 1,
    heading: "Onboarding",
    text:
      "            Lorem ipsum dolor sit amet consectetur. Non mauris libero habitant consequat a\n" +
      "            ullamcorper elementum fames sapien. Integer nisl etiam rhoncus tellus mauris. Diam diam\n" +
      "            sed rhoncus volutpat nulla mauris tincidunt hac. Tristique lectus nunc fermentum\n" +
      "            vulputate."
  },
  {
    key: 2,
    heading: "Onboarding",
    text:
      "            Lorem ipsum dolor sit amet consectetur. Non mauris libero habitant consequat a\n" +
      "            ullamcorper elementum fames sapien. Integer nisl etiam rhoncus tellus mauris. Diam diam\n" +
      "            sed rhoncus volutpat nulla mauris tincidunt hac. Tristique lectus nunc fermentum\n" +
      "            vulputate."
  },
  {
    key: 3,
    heading: "Onboarding",
    text:
      "            Lorem ipsum dolor sit amet consectetur. Non mauris libero habitant consequat a\n" +
      "            ullamcorper elementum fames sapien. Integer nisl etiam rhoncus tellus mauris. Diam diam\n" +
      "            sed rhoncus volutpat nulla mauris tincidunt hac. Tristique lectus nunc fermentum\n" +
      "            vulputate."
  }
];

const PrevArrow: FC<IArrowProps> = ({ arrowCLick }) => {
  return (
    <button
      onClick={arrowCLick}
      className="!absolute !w-[102px] bottom-[-13px] left-[48px] text-[#000] mb-[48px] !overflow-visible">
      <div className={"flex !w-[102px] items-center"}>
        <img src={BackIcon} alt="backIcon" />
        <span className={`ml-[16px] ${OnBoardingArrowText}`}>Back</span>
      </div>
    </button>
  );
};

const NextArrow: FC<IArrowProps> = ({ arrowCLick }) => {
  return (
    <button
      onClick={arrowCLick}
      className="!absolute !w-[132px] border-2 border-[#1376DD] bottom-[-13px] py-[16px] text-center right-[48px] text-[#000] mb-[48px] !overflow-visible">
      <div className={"flex !w-[132px] items-center justify-center"}>
        <span className={`mr-[16px] ${OnBoardingArrowText}`}>Next</span>
        <img src={NextIcon} alt="backIcon" />
      </div>
    </button>
  );
};

const OnBoardingContent: FC<IOnBoardingContent> = ({ heading, text }) => {
  return (
    <div className={"mb-[32px]"}>
      <img src={OnBoardingTestImage} alt="alt" />
      <div className={"p-[48px]"}>
        <h1
          className={
            "text-[#101B28] text-center font-mardoto text-[32px] font-bold leading-[35px] mb-[16px]"
          }>
          {heading}
        </h1>
        <p className="text-[#101B28] text-center font-mardoto text-[18px] font-normal leading-[25px]">
          {text}
        </p>
      </div>
    </div>
  );
};

const CarouselNavigation: FC<ICarouselProps> = ({ setActiveIndex, activeIndex, length }) => {
  return (
    <div className="!absolute bottom-0 left-2/4 z-50 flex -translate-x-2/4 gap-2 mb-[48px]">
      {new Array(length).fill("").map((_, i) => (
        <span
          key={i}
          className={`w-[16px] h-[16px] mx-[4px] block cursor-pointer rounded-2xl transition-all content-[''] ${
            activeIndex === i ? "bg-[#1F598E]" : "bg-white border border-[#667085]"
          }`}
          onClick={() => setActiveIndex(i)}
        />
      ))}
    </div>
  );
};

const OnBoarding = () => {
  return (
    <Carousel
      className="max-w-[896px] rounded-[20px] border border-[#DDE1E6] pb-[48px]"
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <CarouselNavigation
          setActiveIndex={setActiveIndex}
          length={length}
          activeIndex={activeIndex}
        />
      )}
      prevArrow={({ handlePrev }) => <PrevArrow arrowCLick={handlePrev} />}
      nextArrow={({ handleNext }) => <NextArrow arrowCLick={handleNext} />}>
      {onBoardingData.map(({ key, heading, text }) => (
        <OnBoardingContent key={key} text={text} heading={heading} />
      ))}
    </Carousel>
  );
};

export default OnBoarding;
