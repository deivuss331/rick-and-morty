import styled from 'styled-components';

export const StyledNavigation = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.space[2]};
`;
