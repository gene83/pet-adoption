import { Pet as PetType } from "./APIResponseTypes";

const Pet = ({
  images,
  name,
  animal,
  breed,
  city,
  state,
}: Omit<PetType, "description">) => {
  return (
    <div className="pet">
      <div className="image-container">
        <img src={images[0]} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>
          {animal} - {breed} - {city}, {state}
        </h2>
      </div>
    </div>
  );
};

export default Pet;
