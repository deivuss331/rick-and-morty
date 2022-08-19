import type { NextPage, GetServerSidePropsResult } from 'next';
import type { ApiCharactersPageResponse, ApiCharactersPageVariables } from 'graphQl/queries/characters';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'apolloClient';
import { GET_CHARACTERS_PAGE } from 'graphQl/queries/characters';
import { Container, Pagination, ScreenSizeLoader, SearchForm } from 'components/layout';
import { CharactersList, CharacterCard } from 'components/characters';

const DEFAULT_PAGE = 1;

const SEARCH_FORM_NAME_QUERY_PARAM = 'name';
const PAGE_QUERY_PARAM = 'page';

const Home: NextPage<ApiCharactersPageResponse> = ({ characters: defaultCharacters }) => {
  const router = useRouter();
  const [fetchCharactersPage, { loading, data }] = useLazyQuery<
    ApiCharactersPageResponse,
    ApiCharactersPageVariables
  >(GET_CHARACTERS_PAGE);

  const searchFormName = router.query[SEARCH_FORM_NAME_QUERY_PARAM] as string | undefined;
  const currentPage = router.query[PAGE_QUERY_PARAM] ? Number(router.query[PAGE_QUERY_PARAM]) : DEFAULT_PAGE;
  const isNotDefaultPage = currentPage !== DEFAULT_PAGE;
  const useDefaultData = !(searchFormName || isNotDefaultPage);

  useEffect(() => {
    if (!useDefaultData) {
      fetchCharactersPage({ variables: { page: currentPage, filter: { name: searchFormName } } });
    }
  }, [searchFormName, currentPage, isNotDefaultPage]);

  const characters = useDefaultData ? defaultCharacters : data?.characters;

  if (loading) {
    return <ScreenSizeLoader />;
  }

  if (!characters?.results.length) {
    return (
      <Container>
        <SearchForm nameQueryParam={SEARCH_FORM_NAME_QUERY_PARAM} />
        <h2>No results found...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <SearchForm nameQueryParam={SEARCH_FORM_NAME_QUERY_PARAM} />

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
