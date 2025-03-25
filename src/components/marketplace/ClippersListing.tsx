
import React from 'react';
import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import ClipperCard, { ClipperData } from './ClipperCard';
import SearchFilter from './SearchFilter';

interface ClippersListingProps {
  clippers: ClipperData[];
  hasMore: boolean;
  onLoadMore: () => void;
}

const ClippersListing: React.FC<ClippersListingProps> = ({ 
  clippers, 
  hasMore, 
  onLoadMore 
}) => {
  return (
    <>
      <SearchFilter placeholder="Search by name, specialty, or platform..." />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clippers.map((clipper, index) => (
          <ClipperCard key={clipper.id} clipper={clipper} index={index} />
        ))}
      </div>

      {hasMore ? (
        <div className="mt-12 text-center">
          <Button 
            variant="outline" 
            className="mx-auto"
            onClick={onLoadMore}
          >
            Load More Clippers
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

export default ClippersListing;
