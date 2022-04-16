import { useEffect, useState } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import BackLink from '../components/BackLink';
import Confirmed from '../components/Confirmed';
import PageHeading from '../components/PageHeading';
import PurchasedLinks from '../components/PurchasedLinks';

export default function ConfirmedPage() {
    return (
        <div className='flex flex-col p-0 gap-8 items-center'>
            <BackLink href='/'>Home</BackLink>

            <div className='text-white bg-gray-600 bg-opacity-70 rounded-lg'><PageHeading>Thank you for the biz!</PageHeading></div>

            <div className='h-80 w-80'><Confirmed /></div>

            {/* insert ipfs links */}
            <div>
                <PurchasedLinks>
                    
                </PurchasedLinks>
            </div>
        </div>
    )
}