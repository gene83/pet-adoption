import { Component } from "react";

type props = {
  images: string[];
};

class Carousel extends Component<props> {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };

  render() {
    const { active } = this.state;
    const { images } = this.props;

    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((image, idx) => (
            <img
              key={image}
              src={image}
              alt="animal thumbnail"
              className={idx === active ? "active" : ""}
              onClick={() => this.setState({ active: idx })}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;
