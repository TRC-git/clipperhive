
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import BrandCard, { BrandData } from './BrandCard';
import SearchFilter from './SearchFilter';

interface BrandsListingProps {
  brands: BrandData[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const BrandsListing: React.FC<BrandsListingProps> = ({ 
  brands, 
  hasMore, 
  onLoadMore 
}) => {
  return (
    <>
      <SearchFilter placeholder="Search by brand name or industry..." />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand, index) => (
          <BrandCard key={brand.id} brand={brand} index={index} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="mx-auto"
            onClick={onLoadMore}
          >
            Load More Brands
          </Button>
        </div>
      ) : (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
};

export default BrandsListing;
