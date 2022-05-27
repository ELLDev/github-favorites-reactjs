import GithubFavorites from "./components/GithubFavorites";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <main className="m-6 md:m-12 xl:max-w-[1120px] xl:m-0">
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
