export interface ApiCharacterBriefResponse {
  id: string;
  image: string;
  name: string;
}

export interface ApiCharactersPageResponse {
  characters: {
    results: ApiCharacterBriefResponse[];
    info: {
      count: number;
      next: number | null;
      prev: number | null;
      pages: number;
    };
  };
}
