import { Trash } from "phosphor-react";
import { useState } from "react";
import HeaderSearchBar from "./HeaderSearchBar";

interface GithubUser {
  login: string;
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
          {githubUsers.map((user) => (
            <tr
              key={user.login}
              className="flex flex-1 justify-between items-center border-b-[1px] border-[color:#4A808C] even:bg-[color:#06181C] even:border-[color:#284b53]"
            >
              <td className="w-4/12 text-center flex flex-1 items-center justify-center flex-col my-1">
                <a href="https://github.com/maykbrito" target="_blank">
                  <img
                    src={user.avatar_url}
                    alt={user.login}
                    className="rounded-full w-[80px] m-1"
                  />
                  <p className="font-bold truncate max-w-[85px]">{user.name || user.login}</p>
                  <span>/{user.login}</span>
                </a>
              </td>
              <td className="w-3/12 text-center">{user.public_repos}</td>
              <td className="w-3/12 text-center">{user.followers}</td>
              <td
                className="w-2/12 text-center items-center mr-1"
                onClick={() => handleRemoveUser(user.login)}
              >
                <button className="mt-2">
                  <Trash color="#F75A68" weight="bold" className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
