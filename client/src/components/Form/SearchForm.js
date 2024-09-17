import axios from "axios";
import { useSearch } from "../Context/SearchContext"
import { useNavigate } from "react-router-dom";

export default function SearchForm(){
    const [value,setValue]=useSearch();
    const navigate= useNavigate()
    //Handel Submit
    const HandelSubmit = async(e)=>{
        e.preventDefault()
        try {
           const{data}= await axios.get(`https://my-ecommerce-smoky.vercel.app/api/v1/product/search/${value.keyword}`);
           console.log(data.result);
           console.log(value);
           
           setValue({...value,result:data.result});
           navigate('/search');
        } catch (error) {
            console.log(error);
            
        }
    }
    return(

      <form className="d-flex" onSubmit={HandelSubmit} role="search">
  <input className="form-control me-2"
   type="search"
    placeholder="Search"
     aria-label="Search"
     value={value.keyword}
     onChange={(e)=>setValue({...value,keyword:e.target.value})} 
     />
  <button className="btn btn-outline-success" style={{width:"80px"}} type="submit">Search</button>
</form>

    )
}
