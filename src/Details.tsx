import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { PetAPIResponse } from "./APIResponseTypes";
import fetchPet from "./hooks/fetchPet";
import Carousel from "./Carousel";

const Details = () => {
  const { id } = useParams();

  if (!id) {
    throw new Error("no id provided to detaisl");
  }

  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results?.data?.pets[0];

  if (!pet) {
    throw new Error("pet not found");
  }

  return (
    <div className="details">
      <div>
        <Carousel images={pet.images} />
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} - {pet.breed} - {pet.city}, {pet.state}
        </h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;
