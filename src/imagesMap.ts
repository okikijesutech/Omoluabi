import abc from "./assets/images/abc.jpg";
import math from "./assets/images/math.jpg";
import freefun from "./assets/images/free.fun.effective.jpg";
import stayup from "./assets/images/stayup.jpg";
import science from "./assets/images/science.jpg";
import school from "./assets/images/school.jpg";
import test from "./assets/images/test.jpg";
import pace from "./assets/images/pace.jpg";

interface ImagesMap {
  [key: string]: string;
}

const imagesMap: ImagesMap = {
  img1: freefun,
  img2: science,
  img3: stayup,
  img4: pace,
  img5: test,
  img6: school,
  img7: abc,
  img8: math,
};

export default imagesMap;
