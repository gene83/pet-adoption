import { useParams } from "react-router-dom";

const Details = () => {
  const { id } = useParams();

  return <div>details page: {id} </div>;
};

export default Details;
