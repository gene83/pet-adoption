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
      setBreeds([]);
      return;
    }

    const res = await fetch(
      `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
    );
    const json = await res.json();
    setBreeds(json.breeds ?? []);
  };

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
    const json = await res.json();
    console.log(json);
  };

  return (
    <div>
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
          <button type="submit">Search</button>
        </label>
      </form>
    </div>
  );
};

export default Search;
