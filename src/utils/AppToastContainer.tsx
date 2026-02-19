import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      limit={3}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable={false}
      theme="colored"
      transition={Slide}
      toastClassName="!rounded-xl !shadow-lg !text-sm"
      bodyClassName="!px-4 !py-3"
    />
  );
};

export default AppToastContainer;
