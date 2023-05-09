import { useContext, useEffect, useState } from "react";
import {
  Animal,
  BreedListAPIResponse,
  Pet,
  PetAPIResponse,
} from "./APIResponseTypes";
import Results from "./Results";
import useBreedList from "./hooks/useBreedList";
import { AdoptedPetContext } from "./petContext";
const ANIMALS: Animal[] = ["dog", "cat", "bird", "rabbit", "reptile"];

const Search = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [pets, setPets] = useState<Pet[]>([]);
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);

  useEffect(() => {
    requestPets({ location: "", animal: "", breed: "" });
  }, []);

  const requestPets = async ({
    location,
    animal,
    breed,
  }: {
    location: string;
    animal: string;
    breed: string;
  }) => {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json: PetAPIResponse = await res.json();
    setPets(json.pets);
  };

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const searchParams = {
            location: formData.get("location")?.toString() ?? "",
            animal: formData.get("animal")?.toString() ?? "",
            breed: formData.get("breed")?.toString() ?? "",
          };
          requestPets(searchParams);
        }}
      >
        {adoptedPet ? (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        ) : null}
        <label htmlFor="location">
          Location
          <input type="text" name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            name="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value as Animal)}
          >
            <option value={""} />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select name="breed">
            <option value={""} />
            {breeds.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
          <button type="submit">Search</button>
        </label>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default Search;
