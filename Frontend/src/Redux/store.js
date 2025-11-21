import   {configureStore} from "@reduxjs/toolkit"
import AuthSliice from "./AuthSlice";
export const store = configureStore({
      reducer :{
          Auth :AuthSliice
      }
})
