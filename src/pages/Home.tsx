import React, { useEffect, useState } from "react";
import {
  useLazyGetUserReposeQuery,
  useSearchUsersQuery,
} from "../store/github/github.api";
import { useDibaunce } from "../hooks/debounce";
import RepoCart from "../components/RepoCart";

const Home = () => {
  const [search, setSearch] = useState("");
  const [dropdown, setDropDown] = useState(false);
  const debounced = useDibaunce(search);
  const { isLoading, isError, data } = useSearchUsersQuery(debounced, {
    skip: debounced.length < 3,
    refetchOnFocus: true,
  });
  const [fetchRepos, { isLoading: areReposLoading, data: repos }] =
    useLazyGetUserReposeQuery();

  useEffect(() => {
    setDropDown(debounced.length >= 3 && data?.length! > 0);
  }, [debounced, data]);

  const clickHandler = (userName: string) => {
    fetchRepos(userName);
    setDropDown(false);
  };
  return (
    <div className="flex justify-center pt-10 mx-auto h-screen w-screen">
      {isError && (
        <p className="text-center text-red-600">Somethink went wrong</p>
      )}

      <div className="relative w-[560px]">
        <input
          type="text"
          className="border py-2 px-4 w-full h-[42px] mb-2"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {dropdown ? (
          <ul className="absolute top-[42px] left-0 right-0 max-h-[200px] shadow-md bg-white overflow-y-scroll">
            {isLoading && <p className="text-center">Loading...</p>}
            {data?.map((user) => (
              <li
                key={user.id}
                onClick={() => clickHandler(user.login)}
                className="py-2 px-4 hover:bg-gray-500 hover:text-white transition-colors cursor-pointer"
              >
                {user.login}
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
        <div className="container">
          {areReposLoading && <p className="text-center">Repos are loading</p>}
          {repos?.map((repo) => (
            <RepoCart repo={repo} key={repo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
