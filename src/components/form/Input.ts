import styled from 'styled-components';

export default styled.input`
  background: ${({ theme }) => theme.color.white};
  border: 1px solid ${({ theme }) => theme.color.black};
  padding: ${({ theme }) => theme.space[1]} ${({ theme }) => theme.space[2]};
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.color.grey};
  }
`;
