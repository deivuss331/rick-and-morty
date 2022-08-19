import type { NextPage, GetServerSideProps, GetServerSidePropsResult } from 'next';
import type { ApiCharactersPageResponse, ApiCharactersPageVariables } from 'graphQl/queries/characters';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useLazyQuery } from '@apollo/client';
import apolloClient from 'apolloClient';
import { GET_CHARACTERS_PAGE } from 'graphQl/queries/characters';
import { SearchForm } from 'components/form';
import { Container, Pagination, ScreenSizeLoader } from 'components/layout';
import { CharactersList, CharacterCard } from 'components/characters';

const DEFAULT_PAGE = 1;
const SEARCH_PARAMS = {
  PAGE: 'page',
  SEARCH_FORM: {
    NAME: 'name',
  },
};

const Home: NextPage<ApiCharactersPageResponse> = ({ characters: defaultCharacters }) => {
  const router = useRouter();
  const [fetchCharactersPage, { data, loading: isLoading }] = useLazyQuery<
    ApiCharactersPageResponse,
    ApiCharactersPageVariables
  >(GET_CHARACTERS_PAGE);

  const searchFormNameValue = router.query[SEARCH_PARAMS.SEARCH_FORM.NAME] as string | undefined;
  const currentPage = router.query[SEARCH_PARAMS.PAGE]
    ? Number(router.query[SEARCH_PARAMS.PAGE])
    : DEFAULT_PAGE;

  const isNotDefaultPage = currentPage !== DEFAULT_PAGE;
  const useDefaultData = !(searchFormNameValue || isNotDefaultPage);

  useEffect(() => {
    if (!useDefaultData) {
      fetchCharactersPage({
        variables: {
          page: currentPage,
          filter: {
            name: searchFormNameValue,
          },
        },
      });
    }
  }, [searchFormNameValue, currentPage, useDefaultData]);

  const characters = useDefaultData ? defaultCharacters : data?.characters;

  if (isLoading) {
    return <ScreenSizeLoader />;
  }

  if (!characters?.results.length) {
    return (
      <Container>
        <SearchForm nameQueryParam={SEARCH_PARAMS.SEARCH_FORM.NAME} />
        <h2>No results found...</h2>
      </Container>
    );
  }

  return (
    <Container>
      <SearchForm nameQueryParam={SEARCH_PARAMS.SEARCH_FORM.NAME} />

      <CharactersList>
        {characters.results.map((character) => (
          <li key={character.id}>
            <CharacterCard {...character} />
          </li>
        ))}
      </CharactersList>

      <Pagination initialPage={DEFAULT_PAGE} queryParam={SEARCH_PARAMS.PAGE} {...characters.info} />
    </Container>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (): Promise<
  GetServerSidePropsResult<ApiCharactersPageResponse>
> => {
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
