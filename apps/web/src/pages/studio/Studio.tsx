import { useParams } from "react-router-dom";
import StudioLayout from "@/layouts/StudioLayout";
import Editor from "@/components/Editor";

const Studio = () => {
  const { bookId } = useParams();

  return (
    <StudioLayout>
      <div>Studio {bookId}</div>
      <div className="flex h-full w-full">
        <Editor />
      </div>
    </StudioLayout>
  );
};

export default Studio;
