import create from "zustand";

import createCategorySlice from "./createCategorySlice";
import createProductsSlice from "./createProductsSlice";
import createUsersSlice from "./createUsersSlice.";

const useStore = create((set, get) => ({
    ...createCategorySlice(set, get),
    ...createProductsSlice(set, get),
    ...createUsersSlice(set, get),
}));

export default useStore;
