import { Pet as PetType } from "./APIResponseTypes";
import Pet from "./Pet";

const Results = ({ pets }: { pets: PetType[] }) => {
  return (
    <div className="search">
      {!pets.length ? (
        <h1>No pets Found</h1>
      ) : (
        pets.map((pet) => {
          return (
            <Pet
              key={pet.id}
              id={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={pet.breed}
              city={pet.city}
              state={pet.state}
              images={pet.images}
            />
          );
        })
      )}
    </div>
  );
};

export default Results;
