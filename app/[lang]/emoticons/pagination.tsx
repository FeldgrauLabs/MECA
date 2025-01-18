'use client';

import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { usePathname, useSearchParams } from "next/navigation";

interface PaginationProps {
  currentPage: number
}

export const Pagination = ({ currentPage }: PaginationProps) => {
  const hasPrevious = currentPage > 1;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createHref = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    return `${pathname}?${params.toString()}`;
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