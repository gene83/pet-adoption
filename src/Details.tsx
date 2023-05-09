import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import fetchPet from "./queries/fetchPet";
import Carousel from "./Carousel";
import Modal from "./Modal";
import { useContext, useState } from "react";
import { AdoptedPetContext } from "./petContext";

const Details = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const navigate = useNavigate();

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
        <button onClick={() => setIsModalOpen(true)}>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
      {isModalOpen ? (
        <Modal>
          <h1>Would you like to adopt {pet.name}?</h1>
          <div className="buttons">
            <button
              onClick={() => {
                setAdoptedPet(pet);
                setIsModalOpen(false);
                navigate("/");
              }}
            >
              Yes
            </button>
            <button onClick={() => setIsModalOpen(false)}>No</button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Details;
