import React, { useEffect, useRef, useState } from "react";
import SinglePost from "./SinglePost";
import { useGetAllPostsQuery } from "../../../services/post/postService";
import { useDispatch, useSelector } from "react-redux";
import { appendPosts, clearPosts } from "../../../store/slice/posts/postSlice";
import LoaderItem from "../../Loader/post-loader/LoaderItem";
import PostsLoading from "../../Loader/post-loader/PostsLoading";

const AllPosts = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [hasMore, setHasMore] = useState(true);
    const { data: postsData, isFetching, isLoading, isSuccess } = useGetAllPostsQuery({ page, limit });
    const posts = useSelector((state) => state.post.posts);
    const dispatch = useDispatch();
    const loadingRef = useRef(null);

    useEffect(() => {
        dispatch(clearPosts())
        setPage(1)
        setHasMore(true)
    }, [dispatch]);

    useEffect(() => {
        const setDataOnObserve = () => {
            if (postsData && postsData.length === 0) {
                setHasMore(false);
                return;
            }
            if (!isFetching && hasMore) {
                setPage((prevPage) => prevPage + 1);
                dispatch(appendPosts(postsData));
            }
        };

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setDataOnObserve()
            }
        });

        if (observer && loadingRef.current) {
            observer.observe(loadingRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, [isFetching, hasMore, postsData, dispatch]);

    return (
        <div className="max-w-6xl mx-auto w-full py-10  ">
            {/* <!-- Posts Feed --> */}
            <div>
                {/* Render all posts */}

                {
                    isLoading && <PostsLoading/>
                }

                {(!isLoading || isSuccess) && posts?.map((post) => (
                    <SinglePost key={post?._id} post={post} />
                ))}


                {hasMore && (
                    <h1 ref={loadingRef} className="text-center">
                        Loading...
                    </h1>
                )}
            </div>
        </div>
    );
};

export default AllPosts;
