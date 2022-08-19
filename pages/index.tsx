import type { NextPage, GetServerSidePropsResult } from 'next';
import type { ApiCharactersPageResponse, ApiCharactersPageVariables } from 'graphQl/queries/characters';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'apolloClient';
import { GET_CHARACTERS_PAGE } from 'graphQl/queries/characters';
import { Container, Pagination, ScreenSizeLoader } from 'components/layout';
import { CharactersList, CharacterCard } from 'components/characters';

const DEFAULT_PAGE: number = 1;
const PAGE_QUERY_PARAM: string = 'page';

const Home: NextPage<ApiCharactersPageResponse> = ({ characters: defaultCharacters }) => {
  const router = useRouter();
  const [fetchCharactersPage, { loading, data }] = useLazyQuery<
    ApiCharactersPageResponse,
    ApiCharactersPageVariables
  >(GET_CHARACTERS_PAGE);

  const currentPage = router.query[PAGE_QUERY_PARAM] ? Number(router.query[PAGE_QUERY_PARAM]) : DEFAULT_PAGE;
  const isNotDefaultPage = currentPage !== DEFAULT_PAGE;

  useEffect(() => {
    if (isNotDefaultPage) {
      fetchCharactersPage({ variables: { page: currentPage } });
    }
  }, [currentPage, isNotDefaultPage]);

  const characters = isNotDefaultPage ? data?.characters : defaultCharacters;

  if (loading) {
    return <ScreenSizeLoader />;
  }

  if (!characters?.results.length) {
    return (
      <Container>
        <h2>No results found...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <CharactersList>
        {characters.results.map((character) => (
          <li key={character.id}>
            <CharacterCard {...character} />
          </li>
        ))}
      </CharactersList>

      <Pagination initialPage={DEFAULT_PAGE} queryParam={PAGE_QUERY_PARAM} {...characters.info} />
    </Container>
  );
};

export default Home;

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ApiCharactersPageResponse>> => {
  const { data } = await apolloClient.query<ApiCharactersPageResponse>({
    query: GET_CHARACTERS_PAGE,
    variables: {
      page: DEFAULT_PAGE,
    },
  });

  return {
    props: data,
  };
};
