import styled from 'styled-components';

export default styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: ${({ theme }) => theme.space[2]};
  margin: ${({ theme }) => theme.space[2]} 0;
`;
