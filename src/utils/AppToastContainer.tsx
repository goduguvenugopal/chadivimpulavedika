import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      limit={2}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnHover
      draggable={true}
      theme="colored"
      transition={Slide}
      toastClassName="rounded-lg shadow-md text-sm"
    />
  );
};

export default AppToastContainer;