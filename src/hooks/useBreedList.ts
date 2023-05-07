import { useEffect, useState } from "react";
import { Animal, BreedListAPIResponse } from "../APIResponseTypes";
import { QueryState, QueryStatus, useQuery } from "@tanstack/react-query";
import fetchBreedList from "../queries/fetchBreedList";

const useBreedList = (animal: Animal) => {
  const results = useQuery(["breeds", animal], fetchBreedList);
  return [results?.data?.breeds ?? [], results.status] as [
    string[],
    QueryStatus
  ];
};

export default useBreedList;
