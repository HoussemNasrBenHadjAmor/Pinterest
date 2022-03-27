export const usersIdQuery = (id) => {
  const query = `
    *[_type == "user" && _id == "${id}"] {
        _id
    }
    `;
  return query;
};

export const userQuery = (id) => {
  const query = `
  *[_type == 'user' && _id =='${id}'] [0]
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
    image {
      assets->{
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
      _key,
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
  *[_type=='pin' && title match '${searchTerm}' || category match '${searchTerm}' || about match '${searchTerm}']{
      image {
        assets->{
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
        _key,
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
