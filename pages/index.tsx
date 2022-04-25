import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import CouponBook from '../components/CouponBook'
import CreateProduct from '../components/CreateProduct'
import Products from '../components/Products'
import SiteHeading from '../components/SiteHeading'
import React, { useState } from 'react'


export default function HomePage() {
  const [ show, setShow ] = useState(false)
  const { publicKey } = useWallet()

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>Buildspace Pizza</SiteHeading>
      {publicKey && <button 
          className='block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          onClick={() => setShow(true) }
        >
          Create Product
        </button>}
        <CreateProduct onClose={() => setShow(false)} show={show} />
      {/* solana wallet collect button */}
      <div className="basis-1/4">
        <WalletMultiButton className='!bg-indigo-600 hover:!bg-indigo-900 hover:scale-110 focus:ring focus:ring-violet-300 transition delay-100' />
      </div>

      {/* display coupon book if there's a connected wallet */}
      {publicKey && <CouponBook />}

      {/* disable checking out without wallet connected */}
      <Products submitTarget='/checkout' enabled={publicKey !== null} />
    </div>
  )
}
