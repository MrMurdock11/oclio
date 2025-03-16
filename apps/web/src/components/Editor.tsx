import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

type EditorProps = {
  content?: string;
  className?: string;
};

const Editor = ({ content = "", className = "" }: EditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
  });

  return (
    <>
      <EditorContent className={className} editor={editor} />
    </>
  );
};

export default Editor;
