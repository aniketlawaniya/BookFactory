import { createContext, useContext, useReducer } from "react";
import { ProductReducer } from "../reducer/reducer";



const FilterContext=createContext();
const FilterProvider=({children})=>{
    const [filterState, filterDispatch] = useReducer(ProductReducer, {
        search:"",
        sort:"",
        category:[],
        range:"",
        rating:""
    })

    return (
        <FilterContext.Provider value={{filterState,filterDispatch}}>
            {children}
        </FilterContext.Provider>
    )
}

const useFilter=()=>useContext(FilterContext);
export {useFilter,FilterProvider}