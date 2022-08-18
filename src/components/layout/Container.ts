import styled from 'styled-components';

export default styled.div`
  max-width: ${({ theme }) => theme.containerSize};
  padding: ${({ theme }) => theme.space[2]};
  margin: 0 auto;
`;
