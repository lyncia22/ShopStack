import { products } from "@/lib/data";
import { CatalogClient } from "@/components/catalog/catalog-client";

export default function Home() {
  // In a real app, you would fetch this data from an API
  const allProducts = products;

  return <CatalogClient products={allProducts} />;
}
