import { ToastContainer, Slide } from "react-toastify";

const AppToastContainer = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={4000}
      limit={5}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" // "light" | "dark" | "colored"
      transition={Slide}
    />
  );
};

export default AppToastContainer;
