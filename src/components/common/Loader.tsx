import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center  justify-center bg-[url('/bg-image.png')] bg-cover bg-center bg-no-repeat">
      <div className="flex justify-center items-center py-10 gap-3">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full"
        />
        <span className="font-semibold text-gray-600 text-2xl">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
