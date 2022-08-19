import { gql } from '@apollo/client';

export const GET_CHARACTERS_PAGE = gql`
  query getCharacters($page: Int!, $filter: FilterCharacter) {
    characters(page: $page, filter: $filter) {
      results {
        id
        name
        image
      }
      info {
        pages
        count
        next
        prev
      }
    }
  }
`;

export const GET_CHARACTER_DETAILS = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      id
      image
      name
      gender
      species
      status
      location {
        name
      }
    }
  }
`;
