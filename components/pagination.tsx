'use client'

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type PaginationTypes = {
  links: {
    url: string;
    label: string
    active: boolean;
    id: number;
  }[];
}

export default function Pagination({links}: PaginationTypes) {

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const {replace} = useRouter()

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);
    if (pageNumber > 1) {
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`, {scroll: false})
  }

  return (
    <PaginationComponent>
      <PaginationContent>

        <PaginationItem>
          <PaginationPrevious />
        </PaginationItem>

        {links.map((link) => {
          if (link.label.includes('Anterior') || link.label.includes('Próximo')) {
            return null;
          }

          if (link.label === '...') {
            return (
              <PaginationItem key={link.id} className='hidden md:inline-flex'>
                <PaginationEllipsis />
              </PaginationItem>
            )
          }

          return (
            <PaginationItem key={link.id} className='cursor-pointer'>
              <PaginationLink
              onClick={() => handleClickPage(Number(link.label))}
              isActive={link.active}
              dangerouslySetInnerHTML={{ __html: link.label}}>
              </PaginationLink>
            </PaginationItem>
          )
        })}

        <PaginationItem>
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </PaginationComponent>
  );
}
