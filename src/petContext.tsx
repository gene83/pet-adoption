import { useState, PropsWithChildren, createContext } from "react";
import { Pet } from "./APIResponseTypes";

type AdoptedPetContextType = [
  pet: Pet | null,
  setPet: React.Dispatch<React.SetStateAction<Pet | null>>
];

export const AdoptedPetContext = createContext<AdoptedPetContextType>([
  null,
  () => {},
] as AdoptedPetContextType);

export const AdoptedPetContextProvider = ({ children }: PropsWithChildren) => {
  const adoptedPet = useState<Pet | null>(null);

  return (
    <AdoptedPetContext.Provider value={adoptedPet}>
      {children}
    </AdoptedPetContext.Provider>
  );
};


