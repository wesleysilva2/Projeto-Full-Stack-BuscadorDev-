import React, {useState, useEffect} from "react";

function DevForm({ onSubmit }) {

    // variaveis do formalario que eu poderei usar pra fazer os processo são armazenadas aqui
    const[github_username, setGithubUsername] = useState('');
    const[techs, setTechs] = useState('');
    const[latitude, setLatitude] = useState('');
    const[longitude, setLongitude] = useState('');

    // Pra pegar a geolocalização do usuario 
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            
            setLatitude(latitude);
            setLongitude(longitude);
        },
        (err) => {
            console.log(err);
        },
        {
            timeout: 30000,
        }
        )
    }, []); 
    // Utilizo aqui com colxeite vazio so executa 1 vez, 
    // se tivesse uma variavel executaria toda vez que a variavel mudasse

    async function handleSubmit(e){
        e.preventDefault(); // Previnindo o comportamento do formulario padrão dento do HTML
        
        await onSubmit({
            github_username,
            techs,
            latitude,
            longitude,
        });

        setGithubUsername('')
        setTechs('') // limpando campo
    }

    return (        
        <form onSubmit={handleSubmit}>
            <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input 
                name="github_username" 
                id="github_username" 
                required
                value={github_username}
                onChange={e => setGithubUsername(e.target.value)} 
            />
            </div>

            <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input 
                name="techs" 
                id="techs" 
                required
                value={techs}
                onChange={e => setTechs(e.target.value)} 
            />
            </div>

            <div className="input-group">
            <div className="input-block">
                <label htmlFor="latitude">Latidude</label>
                <input 
                type="number" 
                name="latitude" 
                id="latitude" 
                required value={latitude}
                onChange={e => setLatitude(e.target.value)} 
                />
            </div>

            <div className="input-block">
                <label htmlFor="longitude">Longitude</label>
                <input 
                type="number" 
                name="longitude" 
                id="longitude" 
                required value={longitude}
                onChange={e => setLongitude(e.target.value)} 
                />
            </div>
            </div>

            <button type='submit'>Salvar</button>
        </form>
    );
}

export default DevForm;