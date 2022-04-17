import { useState } from "react";

import { Link } from "react-router-dom";

import { urlFor, client } from "../utils/sanity";

import Cookies from "universal-cookie";

import { v4 as uuidv4 } from "uuid";

import { DownloadIcon, LinkIcon, TrashIcon } from "@heroicons/react/outline";

const Pin = ({
  pin: { image, _id, destination, postedBy, save },
  setReload,
}) => {
  const cookies = new Cookies();

  const [postHover, setPostHover] = useState(false);

  const [loading, setLoading] = useState(false);

  const userId = cookies.get("id");

  const alreadySaved = Boolean(
    save?.filter((item) => item?.postedBy?._id === userId)
  );

  const deletePost = (id) => {
    setReload(false);
    client.delete(id).then(() => setReload(true));
  };

  const savePost = (id) => {
    if (!alreadySaved) {
      setLoading(true);
      setReload(false);
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert("after", "save[-1]", [
          {
            _key: uuidv4(),
            userId,
            postedBy: {
              _type: "postedBy",
              _ref: userId,
            },
          },
        ])
        .commit()
        .then(() => {
          setLoading(false);
          setReload(true);
        });
    }
  };

  return (
    <Link
      to={`/pin-detail/${_id}`}
      className="space-y-2 space-x-2 cursor-zoom-in"
    >
      <div
        className="relative mx-2"
        onMouseEnter={() => setPostHover(true)}
        onMouseLeave={() => setPostHover(false)}
      >
        <img
          src={urlFor(image).width(250).url()}
          alt="pin"
          className="rounded-lg w-full h-full"
        />
        {postHover && (
          <div className="z-50">
            <div className="absolute top-2 right-2">
              <button
                className="flex justify-center items-center p-2 text-white px-5 bg-red-500 opacity-70 rounded-3xl outline-none hover:opacity-100 hover:shadow-md"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  savePost(_id);
                }}
              >
                {!alreadySaved && loading
                  ? "Saving"
                  : alreadySaved && !loading
                  ? `${save?.length} Saved ✓`
                  : "Save"}
              </button>
            </div>

            <div className="absolute top-2 left-2">
              <div className=" cursor-pointer flex justify-center items-center bg-gray-200 p-2 rounded-full hover:shadow-md">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <DownloadIcon className="h-5 w-5" />
                </a>
              </div>
            </div>

            {postedBy?._id === userId && (
              <div className="absolute bottom-2 right-2">
                <button
                  className="cursor-pointer flex justify-center items-center p-2 bg-gray-200 rounded-full hover:shadow-md"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    deletePost(_id);
                  }}
                >
                  <TrashIcon className="w-5 h-5 object-cover" />
                </button>
              </div>
            )}

            {destination && (
              <div className="absolute bottom-2 left-2">
                <a
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  href={destination}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer gap-1 flex justify-center items-center bg-gray-200 p-2 pr-3 rounded-full"
                >
                  <LinkIcon className="h-4 w-4" />
                  <p>
                    {destination?.length > 20
                      ? destination?.slice(8, 20) + "..."
                      : destination}
                  </p>
                </a>
              </div>
            )}
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex items-center gap-1 mx-2 pb-5"
      >
        <img
          src={postedBy?.image}
          alt="user"
          className="w-8 h-8 rounded-full object-cover"
        />
        <p className="font-semibold">
          {postedBy?.userName?.length > 20
            ? postedBy?.userName?.slice(0, 20) + "..."
            : postedBy?.userName}
        </p>
      </Link>
    </Link>
  );
};

export default Pin;
