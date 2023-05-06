import { useEffect, useState } from "react";
const ANIMALS: Animal[] = ["dog", "cat", "bird", "rabbit", "reptile"];

type Animal = "dog" | "cat" | "bird" | "rabbit" | "reptile";

const Search = () => {
  const [animal, setAnimal] = useState("" as Animal);
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    fetchBreedList();
  }, [animal]);

  const fetchBreedList = async () => {
    if (!animal) {
      return;
    }

    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();
    setBreeds(json.breeds ?? []);
  };

  return (
    <div>
      <form action="search">
        Location:
        <label htmlFor="location">
          <input type="text" name="location" />
        </label>
        <label htmlFor="animal">
          Animal:
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
          Breed:
          <select name="breed">
            <option value={""} />
            {breeds.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  );
};

export default Search;
