import type { NextPage, GetServerSidePropsResult } from 'next';
import type { ApiCharactersPageResponse } from 'graphQl/queries/characters';
import apolloClient from 'apolloClient';
import { GET_CHARACTERS_PAGE } from 'graphQl/queries/characters';
import { Container } from 'components/layout';
import { CharactersList, CharacterCard } from 'components/characters';

const Home: NextPage<ApiCharactersPageResponse> = ({ characters }) => {
  return (
    <Container>
      <CharactersList>
        {characters.results.map((character) => (
          <li key={character.id}>
            <CharacterCard {...character} />
          </li>
        ))}
      </CharactersList>
    </Container>
  );
};

export default Home;

export const getServerSideProps = async (): Promise<GetServerSidePropsResult<ApiCharactersPageResponse>> => {
  const { data } = await apolloClient.query<ApiCharactersPageResponse>({
    query: GET_CHARACTERS_PAGE,
    variables: {
      page: 1,
    },
  });

  return {
    props: data,
  };
};
