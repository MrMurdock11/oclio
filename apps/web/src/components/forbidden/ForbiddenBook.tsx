import { FileLock2 } from "lucide-react";

const ForbiddenBook = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4 text-center">
        <h1 className="text-2xl font-bold">Forbidden</h1>
        <p className="flex flex-col items-center gap-2 text-gray-500">
          <FileLock2 className="h-10 w-10" />
          <span className="font-bold">Oops!</span>
          <span>You do not have access to this book.</span>
        </p>
      </div>
    </div>
  );
};

export default ForbiddenBook;
