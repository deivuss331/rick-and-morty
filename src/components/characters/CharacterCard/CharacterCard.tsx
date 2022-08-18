import type { ApiCharacterBriefResponse } from 'graphQl/queries/characters';
import Image from 'next/image';
import { Card } from 'components/layout';
import { StyledImageWrapper } from './CharacterCard.styles';

export default function CharacterCard({ name, image }: ApiCharacterBriefResponse) {
  return (
    <Card>
      <StyledImageWrapper>
        <Image layout="fill" src={image} alt={name} />
      </StyledImageWrapper>
      <h2>{name}</h2>
    </Card>
  );
}
