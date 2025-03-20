import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

const extensions = [StarterKit];

type EditorProps = {
  content?: string;
  className?: string;
  onUpdate?: (content: string) => void;
};

const Editor = ({ content = "", className = "", onUpdate }: EditorProps) => {
  const editor = useEditor({
    extensions,
    content,
    editorProps: {
      attributes: {
        class: "outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onUpdate?.(editor.getText());
    },
  });

  return (
    <>
      <EditorContent className={className} editor={editor} />
    </>
  );
};

export default Editor;
