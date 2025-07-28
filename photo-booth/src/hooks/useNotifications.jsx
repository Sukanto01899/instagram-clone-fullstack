import React, { useEffect } from "react";
import { useGetAllNotificationsQuery } from "../services/post/postService";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../store/slice/posts/postSlice";

const useNotifications = () => {
  const { data, isSuccess, isLoading } = useGetAllNotificationsQuery();
  const myId = useSelector((state) => state.auth.userInfo._id);
  const notifications = useSelector(state => state.post.notifications);
  const dispatch = useDispatch();


  useEffect(()=>{
    if(data && isSuccess){
        dispatch(setNotifications({myId, data}))
    }
  }, [data, myId, dispatch, isSuccess])

  return {notifications, isLoading};
};

export default useNotifications;
