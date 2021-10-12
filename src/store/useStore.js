import create from "zustand";

import createCategorySlice from "./createCategorySlice";
import createProductsSlice from "./createProductsSlice";
import createImagesSlice from "./createImagesSlice";

const useStore = create((set, get) => ({
    ...createCategorySlice(set, get),
    ...createProductsSlice(set, get),
    ...createImagesSlice(set, get),

}));

export default useStore;
