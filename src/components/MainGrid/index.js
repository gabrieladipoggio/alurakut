import styled from 'styled-components'

const MainGrid = styled.main`
  width:100%;
  margin-left:auto;
  margin-right:auto;
  max-width: 500px;
  display: grid;
  grid-gap: 10px;
  padding: 16px;

  .profileArea{
    display:none;
    @media (min-width: 860px){
      display:block;
    }
  }

  @media(min-width: 860px){
    max-width:1110px;
    display:grid;
    grid-template-areas: "profile welcome friends";
    grid-template-columns: 160px 1fr 312px;
  }`
  
  ;

  export default MainGrid