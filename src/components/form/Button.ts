import styled from 'styled-components';

export default styled.button`
  border: 0;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};

  &:not([disabled]) {
    cursor: pointer;
  }
`;
