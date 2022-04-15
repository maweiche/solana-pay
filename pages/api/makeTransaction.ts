import { createTransferCheckedInstruction, getAssociatedTokenAddress, getMint } from "@solana/spl-token"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { clusterApiUrl, Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from "@solana/web3.js"
import { NextApiRequest, NextApiResponse } from "next"
import { shopAddress, usdcAddress } from "../../lib/addresses"
import calculatePrice from "../../lib/calculatePrice"

export type MakeTransactionInputData = {
    account: string,
}

export type MakeTransactionOutputData = {
    transaction: string,
    message: string,
}

type ErrorOutput = {
    error: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<MakeTransactionOutputData | ErrorOutput>
) {
    try {
        // Pass selected items into the query THEN calculate expected cost
        const amount = calculatePrice(req.query)
        if (amount.toNumber() === 0) {
            res.status(400).json({ error: "Can't checkout with charge of 0" })
            return
        }

        // pass the reference to use in query
        const { reference } = req.query
        if (!reference) {
            res.status(400).json({ error: "No reference provided" })
            return
        }

        // Pass the buyer's public key in JSON body
        const { account } = req.body as MakeTransactionInputData
        if (!account) {
            res.status(400).json({ error: "No account provided" })
        }
        const buyerPublicKey = new PublicKey(account)
        const shopPublicKey = shopAddress
        
        const network = WalletAdapterNetwork.Devnet
        const endpoint = clusterApiUrl(network)
        const connection = new Connection(endpoint)

        // Get details about USDC token
        const usdcMint = await getMint(connection, usdcAddress)
        // Get buyer's USDC token account address
        const buyerUsdcAddress = await getAssociatedTokenAddress(usdcAddress, buyerPublicKey)
        // Get shop's USDC token account address
        const shopUsdcAddress = await getAssociatedTokenAddress(usdcAddress, shopPublicKey)
        

        // Get a recent blockhash to include in the transaction
        const { blockhash } = await (connection.getLatestBlockhash('finalized'))

        const transaction = new Transaction({
            recentBlockhash: blockhash,
            // BUYER pays the transaction fee (means buyer must sign txn)
            feePayer: buyerPublicKey,
        })

        //Create the instruction to send SOL from the buyer to the shop
        // const transferInstruction = SystemProgram.transfer({
        //     fromPubkey: buyerPublicKey,
        //     lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
        //     toPubkey: shopPublicKey,
        // })

        // create instruction to send USDC from the buyer to the shop
        const transferInstruction = createTransferCheckedInstruction(
            buyerUsdcAddress, //source addy
            usdcAddress, //mint token addy
            shopUsdcAddress, //destination addy
            buyerPublicKey, //owner of source addy
            amount.toNumber() * (10 ** (await usdcMint).decimals), //amount to transfer (in units of USDC token)
            usdcMint.decimals, //decimals of the USDC token
        )

        // Add the reference to the instruction as a key
        // This will mean this transaction is returned when we query for the reference
        transferInstruction.keys.push({
            pubkey: new PublicKey(reference),
            isSigner: false,
            isWritable: false,
        })

        // Add the instruction to the transaction
        transaction.add(transferInstruction)

        //Serialize the transaction and convert to base64 to return it
        const serializedTransaction = transaction.serialize({
            //We will need the buyer to sign this transaction after it's returned to them
            requireAllSignatures: false
        })
        const base64 = serializedTransaction.toString('base64')

        // Insert into database: reference, amount

        // Return the serialized transaction
        res.status(200).json({
            transaction: base64,
            message: "Thanks for your order!  🍕"
        })
    } catch (err) {
        console.error(err);

        res.status(500).json({ error: 'error creating transaction', })
        return
    }
}