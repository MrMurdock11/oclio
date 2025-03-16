import { useParams } from "react-router-dom";

const Studio = () => {
  const { bookId } = useParams();

  return <div>Studio {bookId}</div>;
};

export default Studio;
