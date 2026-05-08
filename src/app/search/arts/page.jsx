import { Suspense } from "react";
import SearchResults from "./SearchResult";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading search page...</div>}>
      <SearchResults />
    </Suspense>
  );
}
