import { BodyContent, Header } from "../../containers";
import items from "../../data/homepagedata.json";
import items2 from "../../data/data2.json";
import "./homepage.css";

const HomePage = () => {
  return (
    <div className='conatiner'>
      <Header />
      {items.map((item, index) => (
        <BodyContent
          key={item.id}
          title={item.title}
          image={item.image}
          content={item.content}
          allowBtton={false}
          btnTitle=''
          reverse={index % 2 === 0}
          link=''
        />
      ))}
      {items2.map((item, index) => (
        <BodyContent
          key={item.id}
          title={item.title}
          image={item.image}
          content={item.content}
          allowBtton={true}
          btnTitle={item.btnTitle}
          reverse={index % 2 === 0}
          link={item.link}
        />
      ))}
    </div>
  );
};

export default HomePage;
