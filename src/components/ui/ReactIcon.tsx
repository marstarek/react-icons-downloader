import { Card } from "@/components/ui/card";
const ReactIcon = () => {
     return (
          <Card className="p-4 w-full  md:w-[60%] h-full">
              <h2 className="text-2xl font-bold mb-2 text-center">React-Icons</h2>
          <div className="flex flex-col items-center">
               <iframe
                    src="https://react-icons.github.io/react-icons/"
                    title="React Icons"
                    width="100%"
                    height="65vh"
                    className="mx-auto mt-4 border-2 border-gray-300 h-[65vh]"
               />
               
          </div>
          </Card>
     )
}

export default ReactIcon
