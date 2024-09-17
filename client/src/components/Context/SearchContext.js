import { createContext, useContext, useState } from "react";
const SearchContext = createContext()
export default function SearchProvider({children}){
const[auth,setAuth]=useState({
    keyword:'',
    result:[]
})
return(
    <SearchContext.Provider value={[auth,setAuth]} >
        {children}
    </SearchContext.Provider>
)


}export const useSearch = ()=> useContext(SearchContext)