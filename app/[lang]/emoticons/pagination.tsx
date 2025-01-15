'use client';

import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationProps {
  currentPage: number
}

export const Pagination = ({ currentPage }: PaginationProps) => {
  const hasPrevious = currentPage > 1;

  const createHref = (page: number) => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', page.toString());

    return url.toString();
  }

  return (
    <div className="py-4">
      <BasePagination>
        <PaginationContent className="gap-16">
          <PaginationItem>
            <PaginationPrevious
              className={hasPrevious ? '' : 'pointer-events-none'}
              href={createHref(currentPage - 1)}
              aria-disabled={!hasPrevious}
              tabIndex={hasPrevious ? undefined : -1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={createHref(currentPage)} isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={createHref(currentPage + 1)} />
          </PaginationItem>
        </PaginationContent>
      </BasePagination>
    </div>
  )
} 