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
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
const ANIMALS: Animal[] = ["dog", "cat", "bird", "rabbit", "reptile"];

const Search = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds] = useBreedList(animal);
  const [adoptedPet] = useContext(AdoptedPetContext);
  const [searchParams, setSearchParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const results = useQuery(["search", searchParams], fetchSearch);
  const pets = results.data?.pets ?? [];

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
          setSearchParams(searchParams);
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
