import React from 'react';
import { useRouter } from 'next/router';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '/src/lib/AlurakutCommons';
import MainGrid from '/src/components/MainGrid';
import Perfil from '/src/components/Perfil';
import {ProfileRelationsBoxWrapper} from '/src/components/ProfileRelations'
import Box from '/src/components/Box'

function verMais(qtdItems, id){
  if(qtdItems >= 6){
    var element = document.getElementById(id).style.visibility = "visible";
  }
}

function ProfileRelationsBox(propriedades){
  const qtdItems = propriedades.items.length;
  const id = propriedades.id;

    return (
      <ProfileRelationsBoxWrapper >
        <h2 className = "smallTitle">
          {propriedades.title} ({qtdItems})
        </h2>
        <ul>
          {propriedades.items.slice(0, 6).map((itemAtual) => {
            return (
              <li key={itemAtual.id} >
                <a href={`/usuarios/${itemAtual.login}`}>
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <a id={`${id}`} href="" style={{ fontWeight:'600', fontSize:'14px', color:'#2E7BB4', marginTop:'1em', visibility: 'hidden'}}>Ver todos...</a>
        {verMais(qtdItems, id)}
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
        <AlurakutProfileSidebarMenuDefault  githubUser = {propriedades.githubUser} />
      </Box>
    )
  }

 

export default function UserPage(props) {
    const [githubUser, setGithubUser] = React.useState(props.githubUser);
     React.useEffect(() => setGithubUser(props.githubUser), [])

    const router = useRouter();
    const [seguindo, setSeguindo] = React.useState([]);
    const [seguidores, setSeguidores] = React.useState([]);
    const [userInfo, setUserInfo] = React.useState([]);
    const [userName, setUserName] = React.useState([]);

    const location = userInfo.location;
    const repos = userInfo.public_repos;
    const name = userInfo.name;
    const company = userInfo.company;
    const bio = userInfo.bio;
    const twitter = userInfo.twitter_username;
    const blog = userInfo.blog;


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
              setUserName(userInfo.login);
              console.log(userName);
          }, []);

    return (
    <>
        <AlurakutMenu  githubUser = {githubUser}></AlurakutMenu>
       
        <MainGrid>
            <div className="profileArea" style={{ gridArea: 'profile'}}>
                <ProfileSidebar  githubUser = {githubUser}/>
            </div>

            <div className="friendsArea" style={{ gridArea: 'friends'}}>
                <ProfileRelationsBox title="Seguidores" items = {seguidores} id="followers"/>      
                <ProfileRelationsBox title="Seguindo" items = {seguindo} id="following"/>
            </div>

            <div className="welcomeArea" style={{ gridArea: 'welcome'}}>
            <Box>
                <h2 className="title">
                     @{userInfo.login}
                </h2>
                <OrkutNostalgicIconSet/>
            </Box>
            
              <Perfil>
                <section>
                  <h2 className="smallTitle">Sobre mim:</h2>
                    <div> Nome: <span>{name}</span></div>
                    <div> Localização: {location} </div>
                    <div> Repositórios: {repos} </div>
                    <div> Empresa: {company} </div>
                    <div> Bio: {bio} </div>
                    <div> Twitter: {twitter}</div>
                    <div> Blog: {blog}   </div>
                </section>
              </Perfil>
         
            </div>

        </MainGrid>
    </>
    )

}



export async function getServerSideProps(context) {

  const githubUser = context.query.login;

  return {
    props: {
      githubUser,
    }, // will be passed to the page component as props
  };
}