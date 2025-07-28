import React, {  useRef, useState } from 'react';

const LeftImagePreview = ({ file, setFile }) => {
    const fileRef = useRef(null);
    const [viewFile, setViewFile] = useState(null);

    // Handle file selection and update the preview
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];

        if (selectedFile) {
            setViewFile(URL.createObjectURL(selectedFile));
            setFile(selectedFile);
        }
    };

    // Populate the file input when the user clicks on the image preview
    const handleClick = () => {
        if (fileRef.current) {
            fileRef.current.value = null; // Reset the input value
        }
        fileRef.current.click();
    }
    return (
        <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center relative">
            <img src={viewFile} alt="Upload preview" className={`${file ? 'opacity-100' : 'opacity-0'}  image-preview`} />

            {/* <!-- Tag People Button --> */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
                <button  onClick={handleClick} className="bg-black cursor-pointer bg-opacity-75 text-white text-sm py-1 px-3 rounded-md">
                    Click photo to Upload
                </button>

                <input onChange={handleFileChange} className='hidden' ref={fileRef} type="file" max={1} accept='image/jpg,image/jpeg,image/png'/>
            </div>
        </div>
    );
};

export default LeftImagePreview;