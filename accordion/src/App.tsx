import "./App.css";
import Accordian from "./components/accordian/Accordian";
import RandomColor from "./components/RandomColor/RandomColor";
import Starrating from "./components/star-rating/Starrating";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import LoadMoreData from "./components/loadmore-data/loadmore";

function App() {
  return (
    <div className="container">
      <Accordian />
      <RandomColor />
      <Starrating />
      <ImageSlider url="https://picsum.photos/v2/list" page={1} limit={10} />
      <LoadMoreData />
    </div>
  );
}

export default App;
