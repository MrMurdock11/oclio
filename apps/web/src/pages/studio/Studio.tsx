import StudioLayout from "@/layouts/StudioLayout";
import Editor from "@/components/Editor";
import debounce from "@/shared/utils/debounce";
import { useUpdateTitleMutation } from "@/store/api/booksApi";
import { useUpdateDescriptionMutation } from "@/store/api/booksApi";
import { useParams } from "react-router-dom";
import { useGetBookQuery } from "@/store/api/booksApi";
import { Loader2 } from "lucide-react";

const Studio = () => {
  const { uid } = useParams();

  const { data: book, isLoading } = useGetBookQuery({ uid: uid as string });
  const [updateTitle] = useUpdateTitleMutation();
  const [updateDescription] = useUpdateDescriptionMutation();

  const handleTitleUpdate = debounce((content: string) => {
    updateTitle({ uid: uid as string, title: content });
  }, 1000);

  const handleDescriptionUpdate = debounce((content: string) => {
    updateDescription({ uid: uid as string, description: content });
  }, 1000);

  return (
    <StudioLayout>
      {isLoading ? (
        <div className="flex h-full w-full items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin" />
        </div>
      ) : (
        <div className="box-border flex h-full w-full px-[1in] pt-[1in]">
          <div className="flex w-full flex-col gap-4">
            <Editor
              className="text-center text-2xl"
              content={book?.title}
              onUpdate={handleTitleUpdate}
            />

            <div className="text-center text-sm text-gray-500">
              by {book?.author.fullName}
            </div>

            <Editor
              className="mx-auto w-[400px] text-center text-sm italic text-gray-500"
              content={book?.description}
              onUpdate={handleDescriptionUpdate}
            />
          </div>
        </div>
      )}
    </StudioLayout>
  );
};

export default Studio;
