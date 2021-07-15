import styled from 'styled-components'
import React from 'react';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'


function ProfileSidebar(propriedades){
  return (
    <Box>
      <img src= {`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}}></img>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          Gabriela Di Poggio
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home() {
    const githubUser = 'gabrieladipoggio';

    const [comunidades, setComunidades] = React.useState([{
      id: '02-10-2021',
      title: 'Eu odeio acordar cedo',
      image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
    }]);
    const pessoasFavoritas = ['Llamrei', 'rafaballerini', 'omariosouto', 'peas', 'marcobrunodev', 'juunegreiros', 'randomuser'];
   
  return (
    <>
    <AlurakutMenu  githubUser = {githubUser}></AlurakutMenu>
    <MainGrid>
      <div className="profileArea" style={{ gridArea: 'profile'}}>
        <ProfileSidebar  githubUser = {githubUser}/>
      </div>
      <div className="welcomeArea" style={{ gridArea: 'welcome'}}>
        <Box>
          <h1 className="title">
            Bem-vindo(a)
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <h2 class="subTitle"> O que você deseja fazer</h2>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const dados = new FormData(e.target);
            const comunidade = {
                id: new Date().toISOString(),
                title: dados.get('title'),
                image: dados.get('image')
            }
            const comunidadesAtualizadas = [...comunidades, comunidade]
            setComunidades(comunidadesAtualizadas)
            
          }}>
            <div>
              <input 
              placeholder="Qual vai ser o nome da sua comunidade?" 
              name="title" 
              type="text"
              aria-label="Qual vai ser o nome da sua comunidade?"
              />
            </div>
            <div>
              <input 
              placeholder="Coloque uma URL para usarmos de capa" 
              name="image" 
              aria-label="Coloque uma URL para usarmos de capa"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>
      </div>
      <div className="friendsArea" style={{ gridArea: 'friends'}}>
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Amigos ({pessoasFavoritas.length})</h2>
          {
              <ul>
              {pessoasFavoritas.slice(0,6).map((itemAtual) => {
                return (
                <li key={itemAtual}>
                <a href={`/users/${itemAtual}`}>
                    <img src={`https://github.com/${itemAtual}.png`}/>
                    <span>{itemAtual}</span>
                </a>
                </li> 
                  )
              })}
              </ul>
            }
           {<a href="#" className="expandLink">Ver mais...</a>}
        </ProfileRelationsBoxWrapper>
        
        <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Minhas comunidades ({comunidades.length}) </h2>
          <ul>
             {comunidades.slice(0,6).map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={`/users/${itemAtual.title}`}>
                      <img src={itemAtual.image} />
                      <span>{itemAtual.title}</span>
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
