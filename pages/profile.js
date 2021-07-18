import React from 'react';
import { useRouter } from 'next/router';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import MainGrid from '../src/components/MainGrid'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import Box from '../src/components/Box'
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

export default function ProfileScreen(propriedades) {
    const router = useRouter();
    const githubUser = propriedades.githubUser;
    const [seguindo, setSeguindo] = React.useState([]);
    const [seguidores, setSeguidores] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState([]);

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
        }, [])


        React.useEffect(async () => {
              const userRes = await fetch(`https://api.github.com/users/${githubUser}`);
              const resposta = await userRes.json();
              setUserInfo(resposta);
              console.log(userInfo)
          }, []);

    return (
    <>
        <AlurakutMenu  githubUser = {githubUser}></AlurakutMenu>
       
        <MainGrid>
            <div className="profileArea" style={{ gridArea: 'profile'}}>
                <ProfileSidebar  githubUser = {githubUser}/>
            </div>

            <div className="friendsArea" style={{ gridArea: 'friends'}}>
                <ProfileRelationsBox title="Seguidores" items = {seguidores}/>      
                <ProfileRelationsBox title="Seguindo" items = {seguindo}/>
            </div>

            <div className="welcomeArea" style={{ gridArea: 'welcome'}}>
            <Box>
                <h2 className="title">
                     @{githubUser}
                </h2>
                <OrkutNostalgicIconSet/>
            </Box>
            <Box>
                <div>
                    <p> Nome: {userInfo.name} </p>
                    <p> Localização: {userInfo.location} </p>
                    <p> Repositórios: {userInfo.public_repos} </p>
                    <p> Empresa: {userInfo.company} </p>
                    <p> Bio: {userInfo.bio} </p>
                    <p> Twitter: {userInfo.twitter_username}</p>
                    <p> Blog: {userInfo.blog}   </p>
                </div>
            </Box>
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