import { BodyContent, Header } from "../../containers";
import items from "../../data/homepagedata.json";
import items2 from "../../data/data2.json";
import "./homepage.css";

const HomePage = () => {
  return (
    <div>
      <Header />
      {items.map((item) => (
        <BodyContent
          key={item.id}
          title={item.title}
          image={item.image}
          content={item.content}
          allowBtton={false}
          btnTitle=''
        />
      ))}
      {items2.map((item) => (
        <BodyContent
          key={item.id}
          title={item.title}
          image={item.image}
          content={item.content}
          allowBtton={true}
          btnTitle={item.btnTitle}
        />
      ))}
    </div>
  );
};

export default HomePage;
