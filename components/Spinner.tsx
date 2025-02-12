import { Loader } from "lucide-react";

const Spinner = () => {
    return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="w-12 h-12 text-blue-500 animate-spin" />
        </div>
    );
};

export default Spinner;
