import { FormEvent, useState } from "react";
import { api } from "../services/api";

interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
}

interface HeaderSearchBarProps {
  githubUsers: GithubUser[];
  setGithubUsers: (githubUsers: GithubUser[]) => void;
}

export default function Header({
  githubUsers,
  setGithubUsers,
}: HeaderSearchBarProps) {
  const [inputText, setInputText] = useState("");

  async function handleAddUserToFavorites(userLogin: string) {
    let currentGithubUsers = [...githubUsers];
    let githubUserIndex = -1;

    if (currentGithubUsers.length > 0) {
      githubUserIndex = currentGithubUsers.findIndex(
        (user) => user.login.toLowerCase() === userLogin.toLowerCase()
      );
    }

    if (githubUserIndex < 0) {
      try {
        const newUser = await api
          .get(`/users/${userLogin}`)
          .then((response) => response.data);

        currentGithubUsers = [...currentGithubUsers, newUser];
        setGithubUsers(currentGithubUsers);
        localStorage.setItem(
          "GITHUB_USERS",
          JSON.stringify(currentGithubUsers)
        );
      } catch {
        console.log("user not found");
      }
    }

    setInputText("");
  }

  return (
    <>
      <div className="mb-6 flex flex-1 justify-between items-center flex-col">
        <svg
          className="w-10/12"
          viewBox="0 0 187 33"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M33.1649 18.6033C32.7221 19.031 32.5209 19.6472 32.6246 20.2516L33.2935 24.1189C33.5019 25.3228 32.5375 26.3005 31.4436 26.3005C31.1553 26.3005 30.8577 26.2323 30.5694 26.0822L27.0697 24.2562C26.7959 24.114 26.4963 24.0429 26.1956 24.0429C25.8959 24.0429 25.5962 24.114 25.3224 24.2562L21.8227 26.0822C21.5345 26.2323 21.2369 26.3005 20.9486 26.3005C19.8546 26.3005 18.8902 25.3228 19.0987 24.1189L19.7675 20.2516C19.8712 19.6472 19.67 19.031 19.2273 18.6033L16.3953 15.8648C15.2817 14.7874 15.8966 12.91 17.4354 12.6878L21.3489 12.1239C21.9607 12.036 22.4895 11.6548 22.7622 11.1047L24.5126 7.58701C24.8568 6.89472 25.5267 6.54908 26.1956 6.54908C26.8654 6.54908 27.5353 6.89472 27.8796 7.58701L29.6299 11.1047C29.9026 11.6548 30.4315 12.036 31.0433 12.1239L34.9567 12.6878C36.4956 12.91 37.1105 14.7874 35.9968 15.8648L33.1649 18.6033Z"
            fill="white"
          />
          <path
            d="M48.7556 10.9129V7.27818C48.7556 3.26088 45.4975 0 41.4791 0V3.64018C43.4869 3.64018 45.1176 5.2698 45.1176 7.27818V10.9129C45.1176 13.0992 46.1016 15.0383 47.6281 16.3726C46.1016 17.7065 45.1176 19.6428 45.1176 21.8302V25.4682C45.1176 27.4776 43.4869 29.1067 41.4774 29.1067V32.7453C45.4937 32.7453 48.7556 29.4888 48.7556 25.4682V21.8302C48.7556 19.8207 50.3863 18.1916 52.3942 18.1916V14.5515C50.3831 14.5515 48.7556 12.9218 48.7556 10.9129Z"
            fill="white"
          />
          <path
            d="M7.27873 10.9151V7.27655C7.27873 5.26708 8.90944 3.638 10.9189 3.638V0C6.90052 0 3.64018 3.25652 3.64018 7.27655L3.63855 10.9151C3.63855 12.9246 2.00947 14.5531 0 14.5531V18.1916L0.00163741 18.1933C2.01111 18.1933 3.64018 19.8223 3.64018 21.8318V25.4665C3.64018 29.4833 6.8967 32.7453 10.9167 32.7453V29.1051C8.90726 29.1051 7.27873 27.476 7.27873 25.4665V21.8318C7.27873 19.645 6.29419 17.7065 4.76826 16.3726C6.29419 15.0383 7.27873 13.1008 7.27873 10.9151Z"
            fill="white"
          />
          <path
            d="M86.6573 26.2573L86.6411 16.9967H78.2356V20.3847H82.1238L82.1076 24.644C81.9893 24.7838 81.8118 24.9182 81.5752 25.0473C81.3493 25.1656 81.0858 25.2732 80.7847 25.37C80.4835 25.4668 80.1608 25.5421 79.8167 25.5958C79.4725 25.6496 79.1229 25.6765 78.768 25.6765C78.1872 25.6657 77.6655 25.5743 77.203 25.4022C76.7513 25.2194 76.3534 24.9559 76.0092 24.6117C75.8048 24.4073 75.6166 24.1761 75.4445 23.918C75.2832 23.6491 75.138 23.3587 75.0089 23.0467C74.8045 22.509 74.6432 21.8905 74.5249 21.1914C74.4173 20.4923 74.3636 19.7179 74.3636 18.8682V15.6415C74.3636 14.9639 74.4012 14.3347 74.4765 13.7539C74.5625 13.1731 74.6808 12.646 74.8314 12.1728C75.025 11.5597 75.267 11.0273 75.5574 10.5756C75.8586 10.1238 76.192 9.75814 76.5577 9.47849C76.8374 9.27413 77.1385 9.11817 77.4612 9.01062C77.7839 8.90306 78.1173 8.84928 78.4615 8.84928C79.096 8.84928 79.6392 8.93533 80.0909 9.10742C80.5534 9.26875 80.9353 9.51613 81.2364 9.84956C81.5053 10.1507 81.715 10.5218 81.8656 10.9628C82.027 11.4038 82.1453 11.9093 82.2206 12.4793H86.6411C86.5228 11.35 86.2701 10.3336 85.8829 9.43009C85.5064 8.52661 84.9794 7.75759 84.3018 7.123C83.6242 6.49917 82.7906 6.02055 81.8011 5.68712C80.8223 5.3537 79.6715 5.18698 78.3485 5.18698C77.4881 5.18698 76.6706 5.3053 75.8962 5.54192C75.1218 5.77854 74.4066 6.1281 73.7505 6.5906C73.1912 6.99931 72.6749 7.48332 72.2017 8.04261C71.7392 8.6019 71.3305 9.23111 70.9755 9.93023C70.5991 10.7154 70.3087 11.592 70.1043 12.56C69.9 13.5172 69.7978 14.5552 69.7978 15.6737V18.8682C69.7978 20.0405 69.9 21.1269 70.1043 22.1271C70.3194 23.1274 70.6313 24.0255 71.0401 24.8214C71.395 25.5421 71.8252 26.182 72.3307 26.7413C72.847 27.3006 73.4171 27.7739 74.0409 28.1611C74.6755 28.5375 75.3692 28.8225 76.1221 29.0161C76.8858 29.2205 77.6978 29.3227 78.5583 29.3227C79.5478 29.3227 80.4728 29.2312 81.3332 29.0484C82.1937 28.8656 82.9735 28.6236 83.6726 28.3224C84.3609 28.032 84.9579 27.7039 85.4634 27.3383C85.9689 26.9726 86.3669 26.6122 86.6573 26.2573Z"
            fill="white"
          />
          <path
            d="M91.707 11.5436V15.2059H96.6762V25.3538H91.707V29H105.937V25.3538H101.21V11.5436H91.707ZM96.3535 7.0746C96.3535 7.41878 96.4126 7.74145 96.531 8.04261C96.66 8.33301 96.8375 8.58039 97.0634 8.78475C97.2892 8.99986 97.5581 9.16658 97.87 9.28489C98.1927 9.4032 98.5476 9.46236 98.9348 9.46236C99.7308 9.46236 100.36 9.24187 100.822 8.80088C101.296 8.34915 101.532 7.77372 101.532 7.0746C101.532 6.37548 101.296 5.80543 100.822 5.36445C100.36 4.91271 99.7308 4.68685 98.9348 4.68685C98.5476 4.68685 98.1927 4.746 97.87 4.86431C97.5581 4.98263 97.2892 5.14396 97.0634 5.34832C96.8375 5.56343 96.66 5.82157 96.531 6.12273C96.4126 6.41313 96.3535 6.73042 96.3535 7.0746Z"
            fill="white"
          />
          <path
            d="M118.585 7.2682H114.1V11.5436H110.115V14.8509H114.1V22.7886C114.1 23.9395 114.251 24.929 114.552 25.7572C114.853 26.5746 115.283 27.2468 115.843 27.7739C116.391 28.3116 117.053 28.7096 117.827 28.9677C118.612 29.2151 119.484 29.3388 120.441 29.3388C120.936 29.3388 121.436 29.3119 121.941 29.2581C122.457 29.2151 122.952 29.1506 123.425 29.0645C123.899 28.9785 124.345 28.8709 124.765 28.7419C125.184 28.602 125.55 28.4407 125.862 28.2579L125.426 25.1764C125.222 25.2301 124.974 25.2839 124.684 25.3377C124.404 25.3915 124.103 25.4399 123.78 25.4829C123.447 25.5367 123.097 25.5797 122.732 25.612C122.377 25.6442 122.027 25.6604 121.683 25.6604C121.21 25.6604 120.78 25.6066 120.392 25.499C120.016 25.3915 119.693 25.2086 119.424 24.9505C119.155 24.7031 118.946 24.3697 118.795 23.9502C118.655 23.52 118.585 22.9876 118.585 22.353V14.8509H125.103V11.5436H118.585V7.2682Z"
            fill="white"
          />
          <path
            d="M144.948 19.2715V15.5931H134.88V9.20422H146.206V5.50965H130.331V29H134.88V19.2715H144.948Z"
            fill="white"
          />
          <path
            d="M160.952 29H165.502V28.7257C165.276 28.2847 165.104 27.7577 164.985 27.1446C164.867 26.5316 164.808 25.7572 164.808 24.8214V17.3355C164.808 16.3245 164.62 15.4371 164.243 14.6735C163.867 13.8991 163.345 13.2591 162.678 12.7536C162.011 12.2481 161.221 11.8662 160.307 11.6081C159.403 11.35 158.424 11.2209 157.37 11.2209C156.198 11.2209 155.155 11.3715 154.24 11.6726C153.337 11.963 152.573 12.361 151.949 12.8665C151.315 13.372 150.831 13.9582 150.497 14.6251C150.175 15.2919 150.013 15.9964 150.013 16.7386H154.499C154.499 16.4266 154.542 16.1416 154.628 15.8835C154.724 15.6253 154.87 15.4049 155.063 15.222C155.278 15.0177 155.558 14.8617 155.902 14.7541C156.246 14.6358 156.655 14.5767 157.128 14.5767C157.666 14.5767 158.134 14.6466 158.532 14.7864C158.941 14.9155 159.279 15.1037 159.548 15.3511C159.806 15.5877 160 15.8727 160.129 16.2062C160.258 16.5288 160.323 16.8945 160.323 17.3032V18.3358H157.822C156.531 18.3358 155.386 18.4541 154.386 18.6907C153.396 18.9166 152.563 19.25 151.885 19.691C151.132 20.175 150.567 20.7934 150.191 21.5463C149.814 22.2885 149.626 23.1435 149.626 24.1116C149.626 24.8645 149.777 25.5636 150.078 26.2089C150.379 26.8435 150.799 27.392 151.336 27.8545C151.874 28.317 152.514 28.6773 153.256 28.9355C154.009 29.1936 154.832 29.3227 155.725 29.3227C156.273 29.3227 156.784 29.2689 157.257 29.1613C157.731 29.0645 158.166 28.9247 158.564 28.7419C158.951 28.5698 159.306 28.3654 159.629 28.1288C159.952 27.8922 160.237 27.6394 160.484 27.3705C160.538 27.6824 160.602 27.9782 160.678 28.2579C160.753 28.5375 160.844 28.7849 160.952 29ZM156.677 25.854C156.257 25.854 155.886 25.8056 155.563 25.7088C155.251 25.6012 154.988 25.4614 154.773 25.2893C154.558 25.1065 154.391 24.886 154.273 24.6278C154.165 24.3589 154.111 24.0685 154.111 23.7566C154.111 23.3587 154.187 22.993 154.337 22.6595C154.488 22.3154 154.719 22.0196 155.031 21.7722C155.343 21.5356 155.746 21.3527 156.241 21.2237C156.736 21.0838 157.333 21.0139 158.032 21.0139H160.323V24.0148C160.194 24.2406 160.016 24.4665 159.79 24.6924C159.564 24.9075 159.296 25.1011 158.984 25.2732C158.672 25.4453 158.322 25.5851 157.935 25.6926C157.548 25.8002 157.128 25.854 156.677 25.854Z"
            fill="white"
          />
          <path
            d="M175.44 29H179.651L186.282 11.5436H181.603L177.779 23.8534L177.537 25.0796L177.295 23.8534L173.455 11.5436H168.777L175.44 29Z"
            fill="white"
          />
        </svg>

        <form
          className="flex flex-1 mt-6 w-full"
          onSubmit={(event: FormEvent) => event.preventDefault()}
        >
          <input
            onChange={(event) => setInputText(event.target.value)}
            type="text"
            value={inputText}
            className="font-Roboto bg-[color:#06181C] rounded-l-xl py-2 px-4 w-10/12 text-2xl focus:brightness-150 focus:outline-none ease-in-out transition-colors"
          />
          <button
            onClick={() => handleAddUserToFavorites(inputText)}
            type="submit"
            className="flex flex-1 bg-[color:#065E7C] rounded-r-xl w-2/12 focus:outline-none"
          >
            <div className="flex flex-1 justify-center w-5 h-5 mt-[25%]">
              <svg
                width="auto"
                viewBox="0 0 23 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.5315 0C11.8564 0 12.1444 0.209195 12.2448 0.518185L14.5139 7.5H22.0315C22.3602 7.5 22.6506 7.71402 22.7479 8.02798C22.8452 8.34193 22.7268 8.68266 22.4557 8.86855L16.3611 13.0477L18.7109 20.0102C18.8153 20.3193 18.7077 20.6605 18.4449 20.854C18.1822 21.0474 17.8244 21.0488 17.5602 20.8573L11.5315 16.4887L5.50288 20.8573C5.23865 21.0488 4.88093 21.0474 4.61815 20.854C4.35537 20.6605 4.24783 20.3193 4.35218 20.0102L6.70201 13.0477L0.607404 8.86855C0.336325 8.68266 0.217864 8.34193 0.315167 8.02798C0.41247 7.71402 0.702861 7.5 1.03155 7.5H8.54918L10.8183 0.518185C10.9187 0.209195 11.2066 0 11.5315 0ZM11.5315 3.17651L9.80732 8.48181C9.7069 8.7908 9.41895 9 9.09405 9H3.45149L8.0182 12.1315C8.29499 12.3213 8.41199 12.6718 8.30467 12.9898L6.52442 18.2646L11.0915 14.9552C11.354 14.7649 11.7091 14.7649 11.9716 14.9552L16.5387 18.2646L14.7584 12.9898C14.6511 12.6718 14.7681 12.3213 15.0449 12.1315L19.6116 9H13.969C13.6441 9 13.3562 8.7908 13.2558 8.48181L11.5315 3.17651Z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="hidden">FAVORITAR</span>
          </button>
        </form>
      </div>
    </>
  );
}
