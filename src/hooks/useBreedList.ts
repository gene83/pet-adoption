import { useEffect, useState } from "react";
import { Animal, BreedListAPIResponse } from "../APIResponseTypes";

const useBreedList = (animal: Animal) => {
  const [breeds, setBreeds] = useState<string[]>([]);

  useEffect(() => {
    fetchBreedList();

    async function fetchBreedList() {
      if (!animal) {
        setBreeds([]);
        return;
      }

      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json: BreedListAPIResponse = await res.json();
      setBreeds(json.breeds ?? []);
    }
  }, [animal]);

  return breeds;
};

export default useBreedList;
