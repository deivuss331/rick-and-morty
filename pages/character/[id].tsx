import type { NextPage, GetServerSideProps, GetServerSidePropsResult } from 'next';
import type { ApiCharacterDetailsResponse, ApiCharacterDetailsVariables } from 'graphQl/queries/characters';
import Image from 'next/image';
import styled from 'styled-components';
import apolloClient from 'apolloClient';
import { GET_CHARACTER_DETAILS } from 'graphQl/queries/characters';
import { Card, Container } from 'components/layout';

const StyledGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.space[2]};

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 40% 1fr;
  }
`;

const StyledImageWrapper = styled(Card)`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 300px;
`;

const StyledCharacterDetails = styled(Card)`
  p,
  strong {
    min-width: 0;
    overflow-wrap: break-word;
  }
`;

const CharacterPage: NextPage<ApiCharacterDetailsResponse> = ({ character }) => {
  if (character == null) {
    return (
      <Container>
        <h1>Sorry but this character doesn't exist...</h1>
      </Container>
    );
  }

  const { image, name, gender, species, status, location } = character;

  return (
    <Container>
      <StyledGrid>
        <StyledImageWrapper>
          <Image layout="fill" src={image} alt={name} />
        </StyledImageWrapper>

        <StyledCharacterDetails as="address">
          {[
            { label: 'Name', value: name },
            { label: 'Gender', value: gender },
            { label: 'Species', value: species },
            { label: 'Status', value: status },
            { label: 'Location', value: location.name },
          ].map(({ label, value }) => (
            <p key={label}>
              <strong>{label}: </strong>
              <span>{value}</span>
            </p>
          ))}
        </StyledCharacterDetails>
      </StyledGrid>
    </Container>
  );
};

export default CharacterPage;

export const getServerSideProps: GetServerSideProps = async (
  context,
): Promise<GetServerSidePropsResult<ApiCharacterDetailsResponse>> => {
  try {
    const { id } = context.query;
    const { data } = await apolloClient.query<ApiCharacterDetailsResponse, ApiCharacterDetailsVariables>({
      query: GET_CHARACTER_DETAILS,
      variables: {
        id: Number(id),
      },
    });

    return {
      props: data,
    };
  } catch (err) {
    return {
      props: { character: null },
    };
  }
};
