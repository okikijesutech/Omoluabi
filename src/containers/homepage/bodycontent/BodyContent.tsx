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
  reverse?: boolean;
  link: string;
}

const BodyContent: React.FC<BodyContentProps> = ({
  image,
  title,
  content,
  allowBtton,
  btnTitle,
  reverse,
  link,
}) => {
  const [useBotton, setUseBottom] = useState(false);

  useEffect(() => {
    if (allowBtton) {
      setUseBottom(true);
    }
  }, [allowBtton]);

  return (
    <div className={`bodycontentcontaier ${reverse ? "reverse" : ""}`}>
      <div className='bodycontentimg'>
        <img src={imagesMap[image]} alt='' />
      </div>
      <div className='bodycontent-content'>
        <div className='bodycontenttext'>
          <h3>{title}</h3>
          <p>{content}</p>
        </div>
        <div className='bodycotentbtncontanier'>
          {useBotton && (
            <BtnPrimary
              title={btnTitle}
              bgcolor={"white"}
              textColor={"#1cb0f6"}
              shadow={"#cccccc"}
              hover={"gray"}
              bordercolor={"#cccccc"}
              to={link}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
