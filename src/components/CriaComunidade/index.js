import Box from '../Box';

export default function CriaComunidade() {
  return (
      <>
        
        <Box>
          <h2 class="subTitle"> Criar uma comunidade</h2>
          <form onSubmit={(e)=>{
            e.preventDefault();
            const dadosForm = new FormData(e.target);
            const comunidade = {
                title: dadosForm.get('title'),
                imageUrl: dadosForm.get('image'),
                creatorSlug: githubUser,
                url: dadosForm.get('url'),
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
            <div>
              <input 
              placeholder="Coloque a URL da sua comunidade" 
              name="url" 
              aria-label="Coloque a URL da sua comunidade"
              />
            </div>
            <button>
              Criar comunidade
            </button>
          </form>
        </Box>



      </>
  )

}