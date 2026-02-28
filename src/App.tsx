import "./App.css";
import Loader from "./components/common/Loader";
import { useAuth } from "./context/AuthProvider";
import AppToastContainer from "./utils/AppToastContainer";

function App({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {children}
      <AppToastContainer />
    </>
  );
}

export default App;
