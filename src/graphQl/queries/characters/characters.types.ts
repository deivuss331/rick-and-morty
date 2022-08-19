import type { ApiPageable } from 'types';

export interface ApiCharacterBriefResponse {
  id: string;
  image: string;
  name: string;
}

export interface ApiCharactersPageResponse {
  characters: {
    results: ApiCharacterBriefResponse[];
    info: ApiPageable;
  };
}

export interface ApiCharactersPageVariables {
  page: number;
}
