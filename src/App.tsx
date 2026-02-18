import "./App.css";
import AppToastContainer from "./utils/AppToastContainer";

function App({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <AppToastContainer />
    </>
  );
}

export default App;
