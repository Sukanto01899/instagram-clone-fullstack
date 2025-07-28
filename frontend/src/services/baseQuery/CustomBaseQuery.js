import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearState } from "../../store/slice/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
});

export const CustomBaseQuery = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if(result.error && result.error.status === 401) {

    // Attempt to refresh the access token
    const refreshResult = await baseQuery({
        url: '/auth/refresh-token',
        method: 'POST',
      }, api, extraOptions);

      if(refreshResult?.data) {
        result = await baseQuery(args, api, extraOptions);
      }else{
        // If refresh failed, log out the user
        const res = await baseQuery({
          url: '/auth/logout',
          method: 'POST',
        }, api, extraOptions);

        if(res?.data) {
          api.dispatch(clearState());
        }
      }
    }

    
  return result;
};
