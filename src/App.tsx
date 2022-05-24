import GithubFavorites from "./components/GithubFavorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="m-6">
      <GithubFavorites />

      <ToastContainer
        toastClassName={"bg-zinc-50"}
        pauseOnFocusLoss={false}
        autoClose={1500}
        limit={2}
      />
    </main>
  );
}

export default App;
