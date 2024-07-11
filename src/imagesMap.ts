import abc from "./assets/images/abc.jpg";
import math from "./assets/images/math.jpg";
import freefun from "./assets/images/free.fun.effective.jpg";
import stayup from "./assets/images/stayup.jpg";
import science from "./assets/images/science.jpg";
import school from "./assets/images/school.jpg";
import test from "./assets/images/test.jpg";
import pace from "./assets/images/pace.jpg";
import Arewa from "./assets/images/ArewaKnot.webp";
import fulani from "./assets/images/cresentmoon.jpeg";
import edo from "./assets/images/edo.jpeg";
import nupe from "./assets/images/nupe.png";
import expke from "./assets/images/ekpe.jpeg";
import tiv from "./assets/images/tiv.png";
import uli from "./assets/images/uli.jpeg";
import staff from "./assets/images/staff.jpg";
import urhobo from "./assets/images/urhobo.jpeg";

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
  tribelogo1: staff,
  tribelogo2: Arewa,
  tribelogo3: uli,
  tribelogo4: fulani,
  tribelogo5: nupe,
  tribelogo6: expke,
  tribelogo7: tiv,
  tribelogo8: nupe,
  tribelogo9: edo,
  tribelogo10: urhobo,
  tribelogo11: expke,
};

export default imagesMap;
