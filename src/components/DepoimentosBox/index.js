import styled from 'styled-components';
import Box from '../Box';

export const DepoimentosBox = styled(Box)`
    .wrapper {
        padding-top: 1.5em;
        display: flex;
    }

    .wrapper:first-of-type{
        padding-top:0;
    }

    .message{
        display: flex;
        flex-direction: column;
    }

  a {
    text-decoration: none;
    margin-left: 10px;
    color: #2E7BB4;
    font-weight: 600;
    font-size: 14px;
  }

  img {
    object-fit: cover;
    background-position: center center;
    width: 80px;
    height: 80px;
    position: relative;
    border-radius: 8px;
}

    span{
        margin-left: 10px;
        font-size: 14px;
        padding-top: 5px;
    }
  
`;