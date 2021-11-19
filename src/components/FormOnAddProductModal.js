import {useParams} from "react-router-dom";
import {useEffect} from "react";
import useStore from "../store/useStore";
import * as React from "react";
import {useForm} from "react-hook-form";

const FormOnAddProductModal = () => {
    const getCategoryByPath = useStore(state => state.getCategoryByPath);
    const [category, setCategory] = React.useState("");
    const units = [
        {
            value: 'gr',

        },
        {
            value: 'ml',

        },
        {
            value: 'kg',
        },
        {
            value: 'szt',
        },
        {
            value: 'l',

        }

    ];
    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = data => {
        console.log(data)
    };
    let {categoryName} = useParams();

    useEffect(() => {
        console.log(categoryName);
        let mounted = true; //bo próba zmaiany stanu na odmontowanym komponencie
        const initialState = {loading: false, categoryName: "", category: null};
        if (categoryName) {
            getCategoryByPath(categoryName).then(category => {
                if (mounted) {
                    setCategory(category);
                }
            });
        } else {
            return initialState;
        }
        return () => mounted = false;
    }, [categoryName, selectedNewCategory, getCategoryByPath]);
    return(
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("categoryName", { required: true})} />
            <input {...register("productName", { required: true, maxLength: 20 })}/>
            <input type="number" {...register("Pojemność", {required: true})} />
            <input type="select" {...register("Pojemność", {required: true})} />
            <input type="submit">Dodaj product </input>

        </form>
    )
}
export default FormOnAddProductModal;