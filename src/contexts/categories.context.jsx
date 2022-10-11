import { createContext, useState, useEffect } from "react";

import { gql, useQuery } from "@apollo/client";

const COLLECTIONS = gql`
  query {
    collections {
      id
      title
      items {
        id
        name
        price
        imageUrl
      }
    }
  }
`;

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  const { loading, data } = useQuery(COLLECTIONS);

  useEffect(() => {
    if (data) {
      const { collections } = data;
      const collectionsData = collections.reduce((acc, collection) => {
        const { title, items } = collection;
        acc[title.toLowerCase()] = items;
        return acc;
      }, {});

      setCategoriesMap(collectionsData);
    }
  }, [data]);

  const value = { categoriesMap, loading };
  console.log(categoriesMap);

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
