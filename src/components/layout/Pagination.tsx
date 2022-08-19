import type { ApiPageable } from 'types';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Button } from 'components/form';

const StyledNavigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;

interface PaginationProps extends ApiPageable {
  initialPage: number;
  queryParam: string;
}

export default function Pagination({ initialPage, queryParam, pages, prev, next }: PaginationProps) {
  const router = useRouter();

  const currentPage = router.query[queryParam] ? Number(router.query[queryParam]) : initialPage;

  const handlePageChange = (newPage: ApiPageable['prev'] | ApiPageable['next']) => () => {
    if (newPage != null) {
      router.push({
        query: {
          ...router.query,
          [queryParam]: newPage,
        },
      });
    }
  };

  return (
    <StyledNavigation>
      {prev != null ? (
        <Button type="button" onClick={handlePageChange(prev)}>
          Previous page
        </Button>
      ) : null}

      <span>
        Page {currentPage} of {pages}
      </span>

      {next != null ? (
        <Button type="button" onClick={handlePageChange(next)}>
          Next page
        </Button>
      ) : null}
    </StyledNavigation>
  );
}
