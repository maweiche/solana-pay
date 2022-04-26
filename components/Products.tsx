import { useRef } from "react";
import { products } from "../lib/products"
import NumberInput from "./NumberInput";


interface Props {
  submitTarget: string;
  enabled: boolean;
}

export default function Products({ submitTarget, enabled }: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form method='get' action={submitTarget} ref={formRef}>
      <div className='flex flex-col gap-16 pb-5'>
        <div className="grid grid-cols-2 gap-8">
          {products.map(product => {
            return (
              <div className="rounded-md bg-indigo-600 shadow-md text-white bg-opacity-50 text-left p-8" key={product.id}>
                <h3 className="text-2xl text-white font-bold">{product.name}</h3>
                <p className="text-sm text-white-800">{product.description}</p>
                <p className="my-4">
                  <span className="mt-4 text-xl font-bold">{product.priceUsd} USD</span>
                  {product.unitName && <span className="text-sm text-white-800"> /{product.unitName}</span>}
                </p>
                <div className="mt-1 text-black">
                  <NumberInput name={product.id} formRef={formRef} />
                </div>
              </div>
            )
          })}

        </div>

        <button
          className="items-center px-20 rounded-md py-2 max-w-fit self-center bg-indigo-600 text-white hover:bg-indigo-900 hover:scale-110 focus:ring focus:ring-indigo-300 transition delay-100 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!enabled}
        >
          Checkout
        </button>
      </div>
    </form>
  )
}
