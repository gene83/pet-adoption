import { QueryFunction, QueryKey } from "@tanstack/react-query";
import { PetAPIResponse } from "./APIResponseTypes";

type SearchTypes = {
  location: string;
  animal: string;
  breed: string;
};

const fetchSearch: QueryFunction<
  PetAPIResponse,
  ["search", SearchTypes]
> = async ({ queryKey }) => {
  const { location, animal, breed } = queryKey[1];

  const res = await fetch(
    `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  );

  if (!res.ok) {
    throw new Error("Error fetching search");
  }

  return res.json();
};

export default fetchSearch;
