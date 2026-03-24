export async function fetchListings(params) {
  const safeParams = {};

  Object.entries(params || {}).forEach(([key, value]) => {
    if (
      typeof key === "string" &&
      typeof value !== "symbol" &&
      value !== undefined &&
      value !== null &&
      value !== ""
    ) {
      safeParams[key] = String(value);
    }
  });

  const query = new URLSearchParams(safeParams).toString();

  const url = `http://localhost:4000/listings${query ? `?${query}` : ""}`;

  console.log("Final URL:", url);

  const res = await fetch(url, {
    cache: "no-store",
  });

  return res.json();
}

export async function fetchListingById(id) {
  const res = await fetch(`http://localhost:4000/listings/${id}`, {
    cache: "no-store",
  });
  return res.json();
}
