import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import CouponBook from '../components/CouponBook'
import Products from '../components/Products'
import SiteHeading from '../components/SiteHeading'


export default function HomePage() {

  const { publicKey } = useWallet()

  return (
    <div className="flex flex-col gap-8 max-w-4xl items-stretch m-auto pt-24">
      <SiteHeading>Buildspace Pizza</SiteHeading>

      {/* solana wallet collect button */}
      <div className="basis-1/4">
        <WalletMultiButton className='!bg-indigo-600 hover:!bg-indigo-900' />
      </div>

      {/* display coupon book if there's a connected wallet */}
      {publicKey && <CouponBook />}

      {/* disable checking out without wallet connected */}
      <Products submitTarget='/buy/transaction' enabled={publicKey !== null} />
    </div>
  )
}
