import styled from 'styled-components';
import Box from '../Box';

 const Perfil = styled(Box)`
    div {
        font-size: 16px;
        color: var(--textTertiaryColor);
        padding: .5em 1em;
    }

    span {
        color: var(--textPrimaryColor);
      

    }

    div:nth-child(2n){
        background: var(--backgroundSecondary);
    }
    div:nth-child(2n-1){
        background: var(--backgroundPrimary);
    }
  
`;

export default Perfil