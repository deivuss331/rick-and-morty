import type { ApiPageable } from 'types';

export interface ApiCharactersPageResponse {
  characters: {
    results: ApiCharacterBriefResponse[];
    info: ApiPageable;
  };
}

export interface ApiCharactersPageVariables {
  page: number;
  filter?: {
    name?: string;
  };
}

export interface ApiCharacterBriefResponse {
  id: string;
  image: string;
  name: string;
}

export interface ApiCharacterDetailsResponse {
  character:
    | (ApiCharacterBriefResponse & {
        gender: string;
        species: string;
        status: string;
        location: {
          name: string;
        };
      })
    | null;
}

export interface ApiCharacterDetailsVariables {
  id: number;
}
