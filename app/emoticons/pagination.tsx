import {
  Pagination as BasePagination,
  PaginationContent,
  PaginationEllipsis,
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

  return (
    <div className="py-4">
      <BasePagination>
        <PaginationContent className="gap-16">
          <PaginationItem>
            <PaginationPrevious
              className={hasPrevious ? '' : 'pointer-events-none'}
              href={`/emoticons?page=${currentPage - 1}`}
              aria-disabled={!hasPrevious}
              tabIndex={hasPrevious ? undefined : -1}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href={`/emoticons?page=${currentPage}`} isActive>{currentPage}</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href={`/emoticons?page=${currentPage + 1}`} />
          </PaginationItem>
        </PaginationContent>
      </BasePagination>
    </div>
  )
} 