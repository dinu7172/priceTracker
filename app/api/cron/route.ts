import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose"
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import { getAveragePrice, getEmailNotifType, getHighestPrice, getLowestPrice } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        connectToDB();

        const products = await Product.find({});
        if(!products) throw new Error("No Product Found");

        //1. Scrape the Latest product info and put it in db
        const updatedProducts = await Promise.all(
            products.map(async (currentProduct) => {
                const scrapeProduct = await scrapeAmazonProduct(currentProduct.url)
                if(!scrapeProduct) throw new Error("No Product Found");

                const updatedPriceHistory = [
                    ...currentProduct.priceHistory,
                    { price: scrapeProduct.currentPrice }
                  ]
            
                  const product = {
                    ...scrapeProduct,
                    priceHistory: updatedPriceHistory,
                    lowestPrice: getLowestPrice(updatedPriceHistory),
                    highestPrice: getHighestPrice(updatedPriceHistory),
                    averagePrice: getAveragePrice(updatedPriceHistory),
                  }
            
                const newProduct = await Product.findOneAndUpdate(
                  { url: scrapeProduct.url },
                  product,
                  { upsert: true, new: true }
                );

                //2. Check each product status and send Email Accordingly
                const emailNotification = getEmailNotifType(scrapeProduct, currentProduct)

                if(emailNotification && newProduct.users.length > 0){
                    const productInfo = {
                        title: newProduct.title,
                        url: newProduct.url,

                    }

                    const emailContent = await generateEmailBody(productInfo, emailNotification)

                    const userEmails = newProduct.users.map((user: any) => user.email)

                    await sendEmail(emailContent, userEmails);
                }
            })
        )
        return NextResponse.json({
            message: 'Ok',
            data: updatedProducts

    })
    } catch (error) {
        throw new Error(`Error in GET: ${error}`)
    }
}