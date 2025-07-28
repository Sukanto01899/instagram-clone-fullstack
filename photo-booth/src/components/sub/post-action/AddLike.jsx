
import { FaHeart, FaRegHeart } from 'react-icons/fa';



const AddLike = ({ isLiked, handleLike }) => {

    return (

        <button onClick={handleLike} className={`like-button ${isLiked ? "text-red-500" : "text-zinc-600"}`}>
            <FaRegHeart className={`h-6 w-6 ${isLiked ? "hidden" : ""}`} />
            <FaHeart className={`h-6 w-6 ${isLiked ? "" : "hidden"}`} />
        </button>


    );
};

export default AddLike;