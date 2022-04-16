import { PropsWithChildren } from "react";

const TEST_LINKS = [
    'https://ipfs.io/ipfs/Qmcp7Rs7WTdKRLaQ7X5YqEneKGhWf1M6yiQ3G2BLVQG98b?filename=gradient-bg.png',
    'https://ipfs.io/ipfs/Qmcp7Rs7WTdKRLaQ7X5YqEneKGhWf1M6yiQ3G2BLVQG98b?filename=gradient-bg.png',
];

export default function PurchasedLinks({ children }: PropsWithChildren<{}>) {

    return(
        
        <ul className="bg-white rounded-md gap-8 p-8 font-bold text-center text-md">
            Purchased Links
            {TEST_LINKS.map(link => (
                <li>
                    <a 
                    className=''
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    >{link}
                    </a>
                </li>
            ))}
        </ul>
    )
}
