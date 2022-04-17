export const usersIdQuery = (id) => {
  const query = `
    *[_type == "user" && profileID == "${id}"] {
        profileID
    }
    `;
  return query;
};

export const userQuery = (id) => {
  const query = `
  *[_type == 'user' && profileID =='${id}'] [0]
  `;
  return query;
};

export const categoryQuery = () => {
  const query = `*[_type == "category" ] {
    slug,
    title,
    image {
    asset -> {
    url
  }
  }
  }`;
  return query;
};

export const feedQuery = () => {
  const query = `
  *[_type =="pin" ] |order(_createdAt desc){
    _id,
    image {
      asset->{
        url
      }
    },
    postedBy ->{
      _id,
      userName,
      image
    },
    destination,
    save[]{
      postedBy ->{
        _id,
        userName,
        image
      }
    },
  }
  `;
  return query;
};

export const searchQuery = (searchTerm) => {
  const query = `
  *[_type=='pin' && title match '${searchTerm}*' || category->title match '${searchTerm}*' || about match '${searchTerm}*']{
     _id, 
    image {
        asset->{
          url
        }
      },
      postedBy ->{
        _id,
        userName,
        image
      },
      destination,
      save[]{
        postedBy ->{
          _id,
          userName,
          image
        }
      },
  } 
  `;
  return query;
};
