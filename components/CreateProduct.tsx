import React, { useState } from "react";
// import { FileUpload } from "react-ipfs-uploader";


const CreateProduct = (props: any) => {
    const [fileUrl, setFileUrl] = useState('')
    
    if(!props.show) {
        return null
    }

    return (
        <div>
            <div className="input-container relative bg-white rounded-lg shadow dark:bg-violet-900">
                <header className='modal-header'>
                    <h1 className='text-xl font-bold text-white text-center'>Create Product</h1>
                </header>
                {/* <FileUpload setUrl={setFileUrl} />
                FileUrl : <a    
                    href={fileUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                >
                    {fileUrl}
                </a> */}
                
                <div className="modal-footer">
                <button
                    className='block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800'
                    onClick={props.onClose}
                >
                    Close
                </button>
                </div>
            </div>
        </div>
    );
}

export default CreateProduct;