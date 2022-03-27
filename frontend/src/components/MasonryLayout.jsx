import Masonry from "react-masonry-css";

import { Pin } from "./";

const MasonryLayout = ({ pins }) => {
  const breakpointColumnsObj = {
    default: 4,
    3000: 6,
    2000: 5,
    1200: 3,
    1000: 2,
    500: 1,
  };

  return (
    <Masonry className="flex" breakpointCols={breakpointColumnsObj}>
      {pins?.map((pin) => (
        <Pin pin={pin} key={`pin-${pin._id}`} />
      ))}
    </Masonry>
  );
};

export default MasonryLayout;
