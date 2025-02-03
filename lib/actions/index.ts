"use server"

import { connectToDB } from "../mongoose";
import { scrapAmazonProduct } from "../scraper";

export async function scrapAndStoreProduct(productLink: string) {
    if(!productLink) return;

    try{
        connectToDB();
        const scrapedProduct = await scrapAmazonProduct(productLink);

        if(!scrapedProduct) return;

        const product = {
            ...scrapedProduct,
            url:productLink
        }
    }catch(error: any){
        console.log("🚀 ~ scrapAndStoreProduct ~ error:", error)
        throw new Error(`Failed to scrap and store product: ${error.message}`);
    }
}