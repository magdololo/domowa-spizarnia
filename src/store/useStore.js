import create from "zustand";

import createCategorySlice from "./createCategorySlice";
import createProductsSlice from "./createProductsSlice";

const useStore = create((set, get) => ({
    ...createCategorySlice(set, get),
    ...createProductsSlice(set, get),
}));

export default useStore;
