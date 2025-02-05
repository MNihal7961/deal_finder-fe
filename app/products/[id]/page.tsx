import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import TrackModal from "@/components/TrackModal";
import { getAllSimilarProducts, getProductById } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

interface ProductDetailsProps {
  params: {
    id: string;
  };
}
const ProductDetails: React.FC<ProductDetailsProps> = async ({ params }) => {
  const product: Product = await getProductById(params.id);
  const similarProducts = await getAllSimilarProducts(params.id);

  if (!product) redirect("/");
  return (
    <div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            alt={product.title}
            src={product.image}
            width={580}
            height={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product?.url}
                target="_blank"
                className="text-base text-black opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">
              <div className="product-hearts">
                <Image
                  alt="heart"
                  src="/assets/icons/red-heart.svg"
                  height={20}
                  width={20}
                />
                <p className="text-base font-semibold text-[#D46F77]">
                  {product?.reviewsCount}
                </p>
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  alt="bookmark"
                  src={"/assets/icons/bookmark.svg"}
                  height={20}
                  width={20}
                />
              </div>
              <div className="p-2 bg-white-200 rounded-10">
                <Image
                  alt="share"
                  src={"/assets/icons/share.svg"}
                  height={20}
                  width={20}
                />
              </div>
            </div>
          </div>
          <div className="product-info">
            <div className="flex flex-col gap-2">
              <p className="text-[34px] text-secondary font-bold">
                {product?.currency} {formatNumber(product?.currentPrice)}
              </p>
              <p className="text-[21px] text-black opacity-50 line-through">
                {product?.currency} {formatNumber(product?.originalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex gap-3">
                <div className="product-stars">
                  <Image
                    alt="star"
                    src="/assets/icons/star.svg"
                    height={16}
                    width={16}
                  />
                  <p className="text-sm text-primary-orange font-semibold">
                    {product?.stars || "25"}
                  </p>
                </div>
                <div className="product-reviews">
                  <Image
                    alt="comment"
                    src={"/assets/icons/comment.svg"}
                    width={16}
                    height={16}
                  />
                  <p className="text-sm text-secondary font-semibold">
                    {product?.reviewsCount} reviews
                  </p>
                </div>
              </div>
              <p className="text-sm text-black opacity-50">
                <span className="text-primary-green font-semibold">93% </span>{" "}
                of buyers have recomented this.
              </p>
            </div>
          </div>
          <div className="my-7 flex flex-col gap-5">
            <div className="flex gap-5 flex-wrap">
              <PriceInfoCard
                title="Current Price"
                iconSrc="/assets/icons/price-tag.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.currentPrice
                )}`}
              />
              <PriceInfoCard
                title="Average Price"
                iconSrc="/assets/icons/chart.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.averagePrice
                )}`}
              />
              <PriceInfoCard
                title="Highest Price"
                iconSrc="/assets/icons/arrow-up.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.highestPrice
                )}`}
              />
              <PriceInfoCard
                title="Lowest Price"
                iconSrc="/assets/icons/arrow-down.svg"
                value={`${product?.currency} ${formatNumber(
                  product?.currentPrice
                )}`}
              />
            </div>
          </div>
          <TrackModal />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-5">
          <h3 className="text-2xl text-secondary font-semibold"></h3>
          <div className="flex flex-col gap-4">
            {product?.description?.split("/n")}
          </div>
        </div>
        <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
          <Image
            src={"/assets/icons/bag.svg"}
            alt="bag"
            width={22}
            height={22}
          />
          <Link href={"/"} className="text-base text-white">
            Buy Now
          </Link>
        </button>
      </div>
      {similarProducts && similarProducts?.length > 0 && (
        <div className="py-24  flex flex-col gap-2 w-full">
          <p className="section-text">Similar Products</p>
          <div className="flex flex-wrap gap-10 mt-7 w-full">
            {similarProducts?.map((product, index) => (
              <ProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
