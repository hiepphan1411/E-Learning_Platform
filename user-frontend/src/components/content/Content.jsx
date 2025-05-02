import CourseService from "./CourseService";
import IntroducePlatform from "./IntroducePlatform";
import SubcribeCourse from "./SubcribeCourse";
import JoinBanner from "./JoinBanner";
import Banner from "../banner/Banner";

function Content() {
  return (
    <div className="content-container flex flex-col w-full gap-20 mt-5 mb-10">
      <Banner />
      <CourseService />
      <IntroducePlatform />
      <SubcribeCourse />
      <JoinBanner />
    </div>
  );
}

export default Content;
