import { createContext, useState, useEffect } from "react";

// import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
import { getCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";

// import SHOP_DATA from "../shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: [],
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState([]);

  // 只用一次，為了把資料寫入firebase storage
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCollectionAndDocuments();
      setCategoriesMap(categoryMap);
    };

    getCategoriesMap();
  }, []);

  const value = { categoriesMap };
  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
