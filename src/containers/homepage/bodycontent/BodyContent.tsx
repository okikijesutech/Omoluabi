import { useEffect, useState } from "react";
import { BtnPrimary } from "../../../components";
import imagesMap from "../../../imagesMap";
import "./bodycontent.css";

interface BodyContentProps {
  image: string;
  title: string;
  content: string;
  allowBtton: boolean;
  btnTitle: string;
}

const BodyContent: React.FC<BodyContentProps> = ({
  image,
  title,
  content,
  allowBtton,
  btnTitle,
}) => {
  const [useBotton, setUseBottom] = useState(false);

  useEffect(() => {
    if (allowBtton) {
      setUseBottom((prev) => !prev);
    }
  }, [allowBtton]);

  return (
    <div className='bodycontentcontaier'>
      <div className='bodycontentimg'>
        <img src={imagesMap[image]} alt='' />
      </div>
      <div className='bodycontent-content'>
        <h3>{title}</h3>
        <p>{content}</p>
        {useBotton && (
          <BtnPrimary
            title={btnTitle}
            bgcolor={"white"}
            textColor={"blue"}
            shadow={"#cccccc"}
            hover={"gray"}
          />
        )}
      </div>
    </div>
  );
};

export default BodyContent;
