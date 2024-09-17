import { createContext,useContext,useEffect,useState } from "react";
const AuthContext = createContext();
export default function AuthProvider({ children }) {
    const [auth, setAuth] = useState({
        user: null, // Holds user information if authenticated
    });
console.log(auth);

    const getDatafromLocal=()=>{
        const data = localStorage.getItem("user");
        if (data) {
            const parsedData = JSON.parse(data);
            if (parsedData) {

                setAuth((prevAuth) => ({
                    ...prevAuth,
                    user: parsedData,
 }));
 }   }
    }
    useEffect(() => {
        getDatafromLocal()
    }, []); // Removed `auth` from dependency array to avoid infinite loop

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
           );
}
export const useAuth = () => useContext(AuthContext);
