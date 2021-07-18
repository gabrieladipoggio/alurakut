import styled from 'styled-components'
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'

function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className = "smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>

    </ProfileRelationsBoxWrapper>
  )
}

function ProfileSidebar(propriedades){
  return (
    <Box>
      <img src= {`https://github.com/${propriedades.githubUser}.png`} style={{ borderRadius: '8px'}}></img>
      <hr/>
      <p>
        <a className="boxLink" href={`https://github.com/${propriedades.githubUser}`}>
          @{propriedades.githubUser}
        </a>
      </p>
      <hr/>
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}


export default function Home(props) {
    const githubUser = props.githubUser;

    const [comunidades, setComunidades] = React.useState([]);

    const pessoasFavoritas = ['Llamrei', 'rafaballerini', 'omariosouto', 'peas', 'marcobrunodev', 'juunegreiros', 'randomuser'];
   
    const [seguidores, setSeguidores] = React.useState([]);
      React.useEffect(function() {
      fetch (`https://api.github.com/users/gabrieladipoggio/followers`)
      .then(function(respostaDoServidor) {
      return respostaDoServidor.json();
      })
      .then(function(respostaCompleta){
      setSeguidores(respostaCompleta)
      })

      // API GraphQL
      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'c5c8469d27e838eb3de77f8c53a5eb',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `query {
          allCommunities {
            id 
            title
            imageUrl
            creatorSlug
          }
        }` })
      })
      .then((response) => response.json())    // Pega o retorno do JSON e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })

    }, [])
     

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
            Bem-vindo(a), {githubUser}
          </h1>
          <OrkutNostalgicIconSet/>
        </Box>
        <Box>
          <h2 class="subTitle"> O que você deseja fazer</h2>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const dadosForm = new FormData(e.target);
            const comunidade = {
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                creatorSlug: githubUser,
            }

            fetch('/api/comunidades', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(comunidade)
            })
            .then(async (response) => {
              const dados = await response.json();
              console.log(dados.registroCriado);
              const comunidade = dados.registroCriado;
              const comunidadesAtualizadas = [...comunidades, comunidade];
              setComunidades(comunidadesAtualizadas)
            })

            
            
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
          <ProfileRelationsBox title="Seguidores" items = {seguidores}/>      
          
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
                    <a href={`/communities/${itemAtual.id}`}>
                      <img src={itemAtual.imageUrl} />
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


export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN;

  if (token === undefined){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const { isAuthenticated } = await fetch("https://alurakut-gabrieladipoggio.vercel.app/api/auth", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())
  
  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}