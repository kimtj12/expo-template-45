import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
