import styled from 'styled-components';

const Loader = styled.div`
  display: inline-block;
  width: 80px;
  height: 80px;
  position: absolute;
  right: calc(50% - 80px);
  bottom: calc(50vh - 40px);
  div {
    position: absolute;
    border: 4px solid #000;
    opacity: 1;
    border-radius: 50%;
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }
  div:nth-child(2) {
    animation-delay: -0.5s;
  }

  @keyframes lds-ripple {
    0% {
      top: 36px;
      left: 36px;
      width: 0;
      height: 0;
      opacity: 1;
    }
    100% {
      top: 0px;
      left: 0px;
      width: 72px;
      height: 72px;
      opacity: 0;
    }
  }
`;


const Spinner = () => <Loader><div></div><div></div></Loader>;

export default Spinner;