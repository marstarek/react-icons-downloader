import IconDownloader from "@/components/IconDownloader";
import ReactIcon from "@/components/ui/ReactIcon";
import { FaReact } from "react-icons/fa";


const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4">
      <div className=" mx-auto">
        <h1 className="text-3xl font-bold text-center my-2 flex justify-center gap-2 items-center flex-col md:flex-row">React-Icons Downloader <FaReact className="text-[#e91e63]"/> </h1>
      

      

        <div className="mt-8 items-center justify-center gap-1  flex flex-col md:flex-row  h-full w-full md:h-[80%] lg:h-[74vh]">
          <IconDownloader />

          <ReactIcon/>
        </div>
        <div className="my-4 text-center flex  items-center justify-center flex-row md:flex-col">
  
          <h2 className="text-xs font-semibold flex  items-center justify-center ">  </h2>
        </div>
      </div>
    </div>
  );
};

export default Index;
