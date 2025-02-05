"use server";
import { revalidatePath } from "next/cache";
import { Product, User } from "@/types";
import ProductModel from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import { generateEmailBody } from "../nodemailer";

export async function scrapAndStoreProduct(productLink: string) {
  if (!productLink) return;

  try {
    connectToDB();
    const scrapedProduct = await scrapAmazonProduct(productLink);

    if (!scrapedProduct) return;

    let product = scrapedProduct;

    const existingProduct: Product | null = await ProductModel.findOne({
      url: scrapedProduct.url,
    });

    if (existingProduct) {
      const updatedProductPriceHistory = [
        ...existingProduct.priceHistory,
        { price: scrapedProduct.currentPrice },
      ];

      product = {
        ...scrapedProduct,
        priceHistory: updatedProductPriceHistory as any,
        lowestPrice: getLowestPrice(updatedProductPriceHistory),
        highestPrice: getHighestPrice(updatedProductPriceHistory),
        averagePrice: getAveragePrice(updatedProductPriceHistory),
      };
    }

    const newProduct = await ProductModel.findOneAndUpdate(
      {
        url: scrapedProduct?.url,
      },
      product,
      { upsert: true, new: true }
    );

    revalidatePath(`/products/${newProduct?._id}`);
  } catch (error: any) {
    throw new Error(`Failed to scrap and store product: ${error.message}`);
  }
}

export async function getProductById(productId: string) {
  try {
    connectToDB();
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) return null;
    return product;
  } catch (error: any) {
    throw new Error(`Failed to get product by id: ${error.message}`);
  }
}

export async function getAllProducts() {
  try {
    connectToDB();
    const products: Product[] = await ProductModel.find({});
    return products;
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}

export async function getAllSimilarProducts(productId: string) {
  try {
    connectToDB();
    const currentProduct = await ProductModel.findOne({ _id: productId });

    if (!currentProduct) return null;

    const similarProducts = await ProductModel.find({
      _id: { $ne: productId },
    }).limit(3);

    return similarProducts;
  } catch (error: any) {
    throw new Error(`Failed to get all similar products: ${error.message}`);
  }
}

export async function adduserEmailToProduct(email: string, productId: string) {
  try {
    connectToDB();
    const product = await ProductModel.findOne({ _id: productId });

    if (!product) return;

    const userExists = product.users.some((user: User) => user.email === email);

    if (!userExists) {
      product.users.push({ email });
      await product.save();

      const emailContent = generateEmailBody(product, "WELCOME");
    }
  } catch (error: any) {
    throw new Error(`Failed to add user email to product: ${error.message}`);
  }
}
