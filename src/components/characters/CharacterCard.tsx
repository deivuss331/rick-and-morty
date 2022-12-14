import type { ApiCharacterBriefResponse } from 'graphQl/queries/characters';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';
import { Card } from 'components/layout';

const StyledImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 200px;

  img {
    object-fit: cover;
  }
`;

const StyledTitle = styled.span`
  display: block;
  padding: ${({ theme }) => theme.space[2]} 0;
`;

export default function CharacterCard({ id, name, image }: ApiCharacterBriefResponse) {
  return (
    <Link href={`character/${id}`} passHref>
      <Card as="a">
        <StyledImageWrapper>
          <Image layout="fill" src={image} alt={name} />
        </StyledImageWrapper>
        <StyledTitle>{name}</StyledTitle>
      </Card>
    </Link>
  );
}
