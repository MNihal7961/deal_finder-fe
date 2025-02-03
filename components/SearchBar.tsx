"use client";
import { scrapAndStoreProduct } from "@/lib/actions";
import React, { useState } from "react";

const SearchBar = () => {
  const [productLink, setProductLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValidAmazonLink = (link: string) => {
    try {
      const parsedURL = new URL(link);
      const hostName = parsedURL.hostname;
      if (
        hostName.includes("amazon.in") ||
        hostName.includes("amzon.") ||
        hostName.includes("amzon")
      ) {
        return true;
      }
    } catch (error) {
      return false;
    }
    return false;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = isValidAmazonLink(productLink);

    if (!isValid) return alert("Please enter a valid amazon link");

    try {
      setIsLoading(true);
      const product = await scrapAndStoreProduct(productLink);
    } catch (error) {
      console.error("🚀 ~ handleSubmit ~ error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mt-12">
      <input
        type="text"
        placeholder="Enter product link"
        className="searchbar-input"
        value={productLink}
        onChange={(e) => setProductLink(e.target.value)}
        disabled={isLoading}
      />
      <button
        type="submit"
        className="searchbar-btn"
        disabled={isLoading || productLink === ""}
      >
        {isLoading ? "Saerching..." : "Search"}
      </button>
    </form>
  );
};

export default SearchBar;
