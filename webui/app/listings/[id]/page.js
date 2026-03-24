import { fetchListingById } from "../../lib/api";
import PropertyDetail from "../../components/PropertyDetail";

export default async function ListingDetail({ params }) {
  const resolvedParams = await params;

  if (!resolvedParams.id || isNaN(Number(resolvedParams.id))) {
    return <p>Invalid Property ID</p>;
  }

  const listing = await fetchListingById(resolvedParams.id);

  return <PropertyDetail listing={listing} />;
}
