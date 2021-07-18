import styled from 'styled-components'
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import Box from '../src/components/Box'
import MainGrid from '../src/components/MainGrid'
import CriaComunidade from '../src/components/CriaComunidade'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import {DepoimentosBox} from '../src/components/DepoimentosBox'


function ProfileRelationsBox(propriedades){
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className = "smallTitle">
        {propriedades.title} ({propriedades.items.length})
      </h2>
      <ul>
        {propriedades.items.slice(0, 6).map((itemAtual) => {
          return (
            <li key={itemAtual.id} >
              <a href={itemAtual.html_url}>
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          );
        })}
      </ul>
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


export default function Home(propriedades) {
    const githubUser = propriedades.githubUser;

    const githubImage = `https://github.com/${githubUser}.png`

    const [comunidades, setComunidades] = React.useState([]);

    const [seguindo, setSeguindo] = React.useState([]);
   
    const [seguidores, setSeguidores] = React.useState([]);

    const [depoimentos, setDepoimentos] = React.useState([]);

    const [userInfo, setUserInfo] = React.useState([]);

    
      
        React.useEffect(async () => {
          const userRes = await fetch(`https://api.github.com/users/${githubUser}`);
          const resposta = await userRes.json();
          setUserInfo(resposta);
          console.log(userInfo)
      }, []);



      React.useEffect(function () {

      const followers = `https://api.github.com/users/${githubUser}/followers`
      fetch(followers)
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function (respostaCompleta) {
          setSeguidores(respostaCompleta);
        })

      const following = `https://api.github.com/users/${githubUser}/following`
      fetch(following)
        .then(function (respostaDoServidor) {
          return respostaDoServidor.json();
        })
        .then(function (respostaCompleta) {
          setSeguindo(respostaCompleta);
        })


      // API GraphQL - Comunidades
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
            creatorSlug,
            url
          }
        }` })
      })
      .then((response) => response.json())    // Pega o retorno do JSON e já retorna
      .then((respostaCompleta) => {
        const comunidadesVindasDoDato = respostaCompleta.data.allCommunities;
        console.log(comunidadesVindasDoDato)
        setComunidades(comunidadesVindasDoDato)
      })

       // API GraphQL - Depoimentos

      fetch('https://graphql.datocms.com/', {
        method: 'POST',
        headers: {
          'Authorization': 'c5c8469d27e838eb3de77f8c53a5eb',
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ "query": `query {
          allDepoimentos{
            message,
            creatorSlug,
            profileImg
          }
        }` })
      })
      .then((response) => response.json())    // Pega o retorno do JSON e já retorna
      .then((respostaCompleta) => {
        const depoimentosVindosDoDato = respostaCompleta.data.allDepoimentos;
        console.log(depoimentosVindosDoDato)
        setDepoimentos(depoimentosVindosDoDato)
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
            Bem-vindo(a), {userInfo.name}

          </h1>
          <OrkutNostalgicIconSet/>
        </Box>

        <CriaComunidade/>
    

        <Box>
          <h2 className="subTitle">Depoimentos</h2>
          <form onSubmit={function criaDepoimento(e) {
            e.preventDefault();
            const dadosForm = new FormData(e.target);
            const depoimento = {
                message: dadosForm.get('message'),
                creatorSlug: githubUser,
                profileImg: githubImage
            }

            fetch('/api/depoimentos', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(depoimento)
            })
            .then(async (response) => {
              const dadosMsg = await response.json();
              console.log(dadosMsg.registroCriado);
              const depoimento = dadosMsg.registroCriado;
              const depoimentosAtualizados = [...depoimentos, depoimento];
              setDepoimentos(depoimentosAtualizados)
            })
          }}>


            <div>
              <input 
              placeholder="Digite aqui a sua mensagem" 
              name="message" 
              type="text"
              aria-label="Digite aqui a sua mensagem"
              />
            </div>
            
            <button>
              Publicar mensagem
            </button>
          </form>
          <br/>
          <hr/>
            <DepoimentosBox>
              {depoimentos.map((itemAtual) => {
                  return (
                    <div className = "wrapper">
                        <img src={itemAtual.profileImg} />
                        <div className="message">
                          <a href={`/communities/${itemAtual.creatorSlug}`}>@{itemAtual.creatorSlug}: </a>
                          <span>{itemAtual.message}</span>
                        </div>
                    </div>
                  )
                })}
        </DepoimentosBox>

        </Box>
      </div>


      <div className="friendsArea" style={{ gridArea: 'friends'}}>
        <ProfileRelationsBox title="Seguidores" items = {seguidores}/>      
        <ProfileRelationsBox title="Seguindo" items = {seguindo}/>

        <ProfileRelationsBoxWrapper>
        <h2 className = "smallTitle">Minhas comunidades ({comunidades.length})</h2>

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