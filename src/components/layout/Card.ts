import styled from 'styled-components';

export default styled.div`
  padding: ${({ theme }) => theme.space[1]};
  border: 2px solid ${({ theme }) => theme.color.accent};
  background: ${({ theme }) => theme.color.white};
  display: block;
`;
