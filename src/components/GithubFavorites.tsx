import { Trash } from "phosphor-react";
import { useState } from "react";
import HeaderSearchBar from "./HeaderSearchBar";

interface GithubUser {
  login: string;
  html_url: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

export default function GithubFavorites() {
  const [githubUsers, setGithubUsers] = useState<GithubUser[]>(() => {
    const storageGithubUsers = localStorage.getItem("GITHUB_USERS");

    if (storageGithubUsers) {
      return JSON.parse(storageGithubUsers);
    }

    return [];
  });

  const handleRemoveUser = (userLogin: string) => {
    let currentGithubUsers = [...githubUsers];

    currentGithubUsers = currentGithubUsers.filter(
      (user) => user.login.toLowerCase() !== userLogin.toLowerCase()
    );

    localStorage.setItem("GITHUB_USERS", JSON.stringify(currentGithubUsers));
    setGithubUsers(currentGithubUsers);
  };

  return (
    <>
      <HeaderSearchBar
        githubUsers={githubUsers}
        setGithubUsers={setGithubUsers}
      />
      <main className="xl:relative xl:overflow-x-hidden xl:max-h-[491px] 2xl:max-h-[705px] border-[1px] rounded-md border-[color:#4A808C] xl:rounded-xl">
        <table className="border-none outline outline-[1px] rounded-md outline-[color:#4A808C] w-full table-auto xl:rounded-xl">
          <thead className="rounded-tl-md first:rounded-tl-xl">
            <tr className="bg-[color:#092D38] first:rounded-tl-md last:rounded-tr-md text-sm flex flex-1 justify-between md:text-2xl xl:text-xl xl:leading-relaxed xl:justify-between xl:first:rounded-tl-xl xl:last:rounded-tr-xl">
              <th className="py-2 w-4/12 mx-1 xl:py-4 xl:ml-10 xl:text-left xl:w-[464px] xl:mr-0">
                Usuário
              </th>
              <th className="py-2 w-3/12 truncate mx-1 xl:py-4 xl:ml-10 xl:text-left xl:w-[178px] xl:mr-0">
                Repositories
              </th>
              <th className="py-2 w-3/12 truncate mx-1 xl:py-4 xl:ml-10 xl:text-left xl:w-[180px] xl:mr-0">
                Followers
              </th>
              <th className="py-2 w-2/12 mx-1 mr-[6px] xl:py-4 xl:ml-10 xl:text-left xl:w-[138px] xl:mr-0">
                Ação
              </th>
            </tr>
          </thead>

          <tbody>
            {githubUsers.map((user) => (
              <tr
                key={user.login}
                className="flex flex-1 justify-between items-center border-b-[1px] border-[color:#4A808C] last:rounded-b-md last:border-none even:bg-[color:#06181C] even:border-[color:#284b53] md:text-2xl xl:text-xl xl:leading-relaxed xl:font-bold xl:last:rounded-b-xl"
              >
                <td className="w-4/12 text-center flex flex-1 items-center justify-center my-1 md:my-3 md:ml-3 lg:mx-8 lg:my-5 xl:mx-0 xl:my-6 xl:max-w-[504px]">
                  <a
                    href={user.html_url}
                    target="_blank"
                    className="md:flex md:flex-1 md:justify-center md:items-center group"
                  >
                    <img
                      src={user.avatar_url}
                      alt={user.login}
                      className="rounded-full w-[80px] m-1 md:w-[90px] md:m-0 lg:w-[100px] xl:w-[56px] xl:mr-4 xl:ml-10 xl:group-hover:scale-150 xl:transition xl:ease-in-out"
                    />
                    <div className="md:flex md:flex-1 md:justify-center md:items-center md:flex-col md:text-xl xl:justify-start xl:items-start">
                      <p className="font-bold truncate max-w-[85px] md:max-w-[100px] lg:max-w-[120px] xl:text-left">
                        {user.name || user.login}
                      </p>
                      <span className="truncate max-w-[85px] md:max-w-[100px] lg:max-w-[120px] xl:font-normal">
                        /{user.login}
                      </span>
                    </div>
                  </a>
                </td>
                <td className="w-3/12 text-center xl:w-[218px] xl:text-left xl:pl-10">
                  {user.public_repos}
                </td>
                <td className="w-3/12 text-center xl:w-[220px] xl:text-left xl:pl-10">
                  {user.followers}
                </td>
                <td
                  className="w-2/12 text-center items-center mr-1 xl:w-[178px] xl:mr-0 xl:text-left xl:pl-10"
                  onClick={() => handleRemoveUser(user.login)}
                >
                  <button className="mt-2">
                    <Trash
                      color="#F75A68"
                      weight="bold"
                      className="w-5 h-5 md:w-6 md:h-6 xl:hidden"
                    />
                    <span className="hidden font-Roboto text-xl leading-relaxed font-bold text-[color:#F75A68] xl:block xl:hover:underline xl:underline-offset-4">
                      Remover
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
