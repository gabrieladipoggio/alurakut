import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {
    if(request.method === 'POST') {
    const TOKEN = "ca176b97f8b3813643230030dd74e9";
    const client = new SiteClient(TOKEN);

    const registroCriado = await client.items.create({        itemType: "975888",
        ... request.body,
        // title: "Teste",
        // imageUrl: "https://picsum.photos/200",
        // creatorSlug: "gabrieladipoggio",
    })

    console.log(registroCriado);

    response.json({
        dados: 'Algum dado qualquer',
        registroCriado: registroCriado,
    })
    return;
}
    response.status(404).json({       
         message: 'Ainda não temos nada no GET'
    })

}