import { X } from "phosphor-react";
import HeaderSearchBar from "./HeaderSearchBar";

export default function GithubFavorites() {
  // const [githubUsers, setGithubUsers] = useState();

  return (
    <>
      {/* <HeaderSearchBar githubUsers={githubUsers} setGithubUsers={setGithubUsers} /> */}
      <HeaderSearchBar />
      <table className="border-none outline outline-[1px] rounded-md outline-[color:#4A808C] w-full table-auto">
        <thead className="bg-[color:#092D38] rounded-tl-md">
          <tr className="text-sm flex flex-1 justify-between">
            <th className="py-2 w-4/12 mx-1">User</th>
            <th className="py-2 w-3/12 truncate mx-1">Repositories</th>
            <th className="py-2 w-3/12 truncate mx-1">Followers</th>
            <th className="py-2 w-2/12 mx-1 mr-[6px]">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr className="flex flex-1 justify-between items-center border-b-[1px] border-[color:#4A808C]">
            <td className="w-4/12 text-center flex flex-1 items-center justify-center flex-col my-1">
              <a href="https://github.com/maykbrito" target="_blank">
                <img
                  src="https://github.com/maykbrito.png"
                  alt=""
                  className="rounded-full w-[80px] m-1"
                />
                <p className="font-bold">Mayk Brito</p>
                <span>/maykbrito</span>
              </a>
            </td>
            <td className="w-3/12 text-center">76</td>
            <td className="w-3/12 text-center">9589</td>
            <td className="w-2/12 text-center items-center mr-1">
              <button className="mt-2">
                <X color="#F75A68" weight="bold" className="w-5 h-5" />
              </button>
            </td>
          </tr>

          {/* <tr className="flex flex-1 justify-between items-center bg-[color:#06181C] border-t-[1px] border-[color:#4A808C]">
          <td className="w-4/12 text-center flex flex-1 items-center justify-center flex-col my-1">
            <a href="https://github.com/maykbrito" target="_blank">
              <img
                src="https://github.com/maykbrito.png"
                alt=""
                className="rounded-full w-[80px] m-1"
              />
              <p className="font-bold">Mayk Brito</p>
              <span>/maykbrito</span>
            </a>
          </td>
          <td className="w-3/12 text-center">76</td>
          <td className="w-3/12 text-center">9589</td>
          <td className="w-2/12 text-center items-center mr-1">
            <button className="mt-2">
              <X color="#F75A68" weight="bold" className="w-5 h-5" />
            </button>
          </td>
        </tr> */}
        </tbody>
      </table>
    </>
  );
}
