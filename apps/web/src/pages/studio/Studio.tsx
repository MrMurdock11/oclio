import StudioLayout from "@/layouts/StudioLayout";
import Editor from "@/components/Editor";

const Studio = () => {
  return (
    <StudioLayout>
      <div className="box-border flex h-full w-full px-[1in] pt-[1in]">
        <div className="flex w-full flex-col gap-4">
          <Editor
            className="text-center text-2xl"
            content={"An Untitled Novel"}
          />

          <div className="text-center text-sm text-gray-500">by Author</div>

          <Editor
            className="mx-auto w-[400px] text-center text-sm italic text-gray-500"
            content={"A novel about a girl who is a vampire."}
          />
        </div>

        <Editor />
      </div>
    </StudioLayout>
  );
};

export default Studio;
