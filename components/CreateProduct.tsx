import React, { useState } from "react";
import { create } from "ipfs-http-client";

const client = create({ url: "https://ipfs.infura.io:5001/api/v0" });

type ProductFile = {
  name: string,
  url: string;
}

let ProductArr: any[] = [];

const CreateProduct = (props: any) => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        desc: "",
      });
      const [file, setFile] = useState({});
      const [uploading, setUploading] = useState(false)
      
      async function onChange(e: any) {
        setUploading(true);
        const files = e.target.files;
        try {
          console.log("these are the files",files[0]);
          const added = await client.add(files[0]);
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          setFile({ name: files[0].name, url: url, price: files[0].price, desc: files[0].desc });
        } catch (error) {
          console.log("Error uploading file: ", error);
        }
        setUploading(false);
  } 
  let ProductFile = Object.values(file);
  let ProductUrl = Object.values(file)[1];
  // let obj = JSON.parse(ProductFile)


  if(!props.show) {
    return null
  }
    return (
        <div>
            <div className="input-container relative bg-white rounded-lg shadow dark:bg-violet-900">
                <header className='modal-header'>
                    <h1 className='text-xl font-bold text-white text-center'>Create Product</h1>
                </header>
                <input
          type="file"
          accept=".zip,.rar,.7zip,.jpg,.pdf,.png"
          placeholder="Test"
          onChange={onChange}
        />
        {/* {file != null && <p className="file-name">{file}</p>} */}
        <div className="flex-row">
          <input
            type="text"
            placeholder="Product Name"
            onChange={(e) => {
              setNewProduct({ ...newProduct, name: e.target.value });
            }}
          />
          <input
            type="text"
            placeholder="0.015 Eth"
            onChange={(e) => {
              setNewProduct({ ...newProduct, price: e.target.value });
            }}
          />
        </div>

        <textarea
          placeholder="Description here..."
          onChange={(e) => {
            setNewProduct({ ...newProduct, desc: e.target.value });
          }}
        />

        <button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
                //file returns keys, need to access keys, then just target the url in index
                console.log("this is the product file ->",ProductFile);
                console.log("this is product url ->", ProductUrl);
                // push file names into productDisplay for mapping
                ProductArr.push(newProduct)
                console.log("this is ProductArr ->", ProductArr);
            }}
        >
          Create Product
        </button>
                
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