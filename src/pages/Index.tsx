import IconDownloader from "@/components/IconDownloader";
import ReactIcon from "@/components/ui/ReactIcon";
import { IoCodeSharp } from "react-icons/io5";
import { IoCodeSlash } from "react-icons/io5";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold text-center my-2">Icon Downloader</h1>
      

      

        <div className="mt-8 items-center justify-center gap-1 flex  h-[74vh]">
          <IconDownloader />

          <ReactIcon/>
        </div>
        <div className="my-4 text-center flex  items-center justify-center">
          <h2 className="text-lg font-semibold flex  items-center justify-center gap-1">Created by <IoCodeSharp className="text-red-600" />  Tarek Rashidy <IoCodeSlash className="text-red-600"/>  </h2>
          <img
            src="./logo2.png" // Replace with your image URL
            alt="Tarek Rashidy"
            className="rounded-full w-24 h-24 "
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
