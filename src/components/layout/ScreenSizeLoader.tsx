import styled, { keyframes } from 'styled-components';

const StyledWrapper = styled.div`
  z-index: ${({ theme }) => theme.zIndex.screenSizeLoader};
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;

  &:before {
    content: '';
    display: block;
    position: absolute;
    inset: 0;
    background: ${({ theme }) => theme.color.white};
    opacity: 0.5;
  }
`;

const loadingKeyframes = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  border: 16px solid ${({ theme }) => theme.color.grey};
  border-top: 16px solid ${({ theme }) => theme.color.accent};
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: ${loadingKeyframes} 0.75s ease-in-out infinite;
`;

export default function ScreenSizeLoader() {
  return (
    <StyledWrapper>
      <StyledLoader role="status" aria-busy />
    </StyledWrapper>
  );
}
