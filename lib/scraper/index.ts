import axios from "axios";
import * as cheerio from "cheerio";
import { extractDescription, extractPrice } from "../utils";
import { Product } from "@/types";

export const scrapAmazonProduct = async (productLink: string) => {
  if (!productLink) return;
  const userName = String(process.env.BRIGHT_DATA_USER_NAME);
  const password = String(process.env.BRIGHT_DATA_PASSWORD);
  const port = 33335;
  const session_id = (1000000 * Math.random()) | 0;
  const options = {
    auth: {
      username: `${userName}-session-${session_id}`,
      password,
    },
    host: "brd.superproxy.io",
    port,
    rejectUnAuthorized: false,
  };

  try {
    const response = await axios.get(productLink, options);
    const $ = cheerio.load(response.data);
    const title = $("#productTitle").text().trim();
    const currentPrice = extractPrice($("span.a-price-whole"));
    const originalPrice = extractPrice(
      $("#priceblock_ourprice"),
      $(".a-price.a-text-price span.a-offscreen")
    ).replace(/,/g, '');

    const outOfStock = $("#availability span").text().trim() !== "In stock";

    const images =
      $("#mgBlkFront").attr("data-a-dynamic-image") ||
      $("#landingImage").attr("data-a-dynamic-image") ||
      "{}";
    const imageUrls = Object.keys(JSON.parse(images));
    const currency = $("span.a-price-symbol")
      .text()
      .trim()
      .replace(/[^₹$]/g, "")
      .slice(0, 1);
    const discountRate = $(".savingsPercentage").text().trim().replace(/[-%]/g, "");
    const description= extractDescription($);
    const data = {
        url: productLink,
        currency: currency || '$',
        image: imageUrls[0],
        title,
        currentPrice:Number(currentPrice),
        originalPrice:Number(originalPrice),
        priceHistory: [],
        discountRate: Number(discountRate),
        category:'category',
        reviewsCount:0,
        stars:4.5,
        isOutOfStock: outOfStock,
        description,
        lowestPrice:Number(currentPrice) || Number(originalPrice),
        highestPrice:Number(currentPrice) || Number(originalPrice),
        average:Number(currentPrice) || Number(originalPrice) || 0,
    }
     return data
  } catch (error: any) {
    throw new Error(`Failed to scrap Amazon product: ${error.message}`);
  }
};
