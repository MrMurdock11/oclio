import { useGetBooksQuery } from "@/store/api/booksApi";
import { Link } from "react-router-dom";
import { BookOpenText } from "lucide-react";
const Library = () => {
  const { data, isLoading } = useGetBooksQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {data?.map((book) => (
        <div key={book.uid}>
          <div className="flex items-center gap-2">
            <BookOpenText />
            <Link to={`/studio/books/${book.uid}`}>{book.title}</Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Library;
