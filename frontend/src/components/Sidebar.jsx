import { Link, NavLink } from "react-router-dom";

import { urlFor } from "../utils/sanity";

import { pLogo } from "../assets";

import { AiOutlineArrowRight } from "react-icons/ai";

const isNotActiveStyle =
  "flex items-center gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";
const isActiveStyle =
  "flex items-center gap-3 font-bold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

const Sidebar = ({ user, toggleSideBar, setToggleSideBar, categories }) => {
  const handleCloseSideBar = () => {
    if (toggleSideBar) {
      setToggleSideBar(false);
    }
  };

  return (
    <div className="flex flex-col px-5 justify-between h-full w-full bg-white shadow-lg overflow-y-scroll scrollbar-hide">
      <div className="flex flex-col">
        <Link
          to="/"
          onClick={handleCloseSideBar}
          className="flex my-2 pt-1 items-center"
        >
          <img alt="logo" src={pLogo} className="w-24" />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSideBar}
          >
            Home
          </NavLink>

          <h3 className="mt-2 text-base 2xl:text-xl">Discover cateogries</h3>

          {categories?.map(({ slug, image, title }) => (
            <NavLink
              to={`category/${slug}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSideBar}
              key={`category-${slug}`}
            >
              <img
                src={urlFor(image?.asset?.url).url()}
                alt={`img-${title}`}
                className="w-8 h-8 rounded-full shadow-sm object-cover"
              />
              {title}
            </NavLink>
          ))}
        </div>

        {user && (
          <Link
            to={`user-profile/${user._id}`}
            className="flex items-center gap-2 my-5 mb-5 p-2 -mx-2 shadow-lg rounded-lg bg-white"
            onClick={handleCloseSideBar}
          >
            <img src={user.image} className="w-9 h-9 rounded-full" alt="user" />
            <p>{user.userName}</p>
            <AiOutlineArrowRight />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
