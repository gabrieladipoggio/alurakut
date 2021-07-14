import styled from 'styled-components'
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

const githubUser = 'gabrieladipoggio';
const pessoasFavoritas = ['Llamrei']


function ProfileSidebar(propriedades){
  return (
    <Box>
      <img src= {`https://github.com/${githubUser}.png`} style={{ borderRadius: '8px'}}></img>
    </Box>
  )
}


export default function Home() {
  return (
    <>
    <AlurakutMenu></AlurakutMenu>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profile'}}>
        <ProfileSidebar />
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcome'}}>
        <Box>
          <h1 className="title">
            Bem-vindo(a)
          </h1>
          <OrkutNostalgicIconSet/>

        </Box>
      </div>
      <div className="friendsArea" style={{ gridArea: 'friends'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Amigos ({pessoasFavoritas.length})</h2>
          
          <ul>
          {pessoasFavoritas.map((itemAtual) => {
            return (
            <li>
            <a href={`/users/${itemAtual}`} key={itemAtual}>
                <img src={`https://github.com/${itemAtual}.png`}/>
                <span>{itemAtual}</span>
            </a>
            </li>
              )
          })}
          </ul>


        </ProfileRelationsBoxWrapper>
        
      </div>
  
  </MainGrid>
  </>
    )
}
