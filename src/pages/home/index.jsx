import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage(){
    const url = "https://api-aluno.vercel.app/aluno";
    
    const [aluno, setAluno] = useState([]);
    const navigate = useNavigate();
    
    async function getAlunos(){
        const response = await axios.get(url);
        setAluno(response.data); 
        console.log(response.data)       
    };

    async function deletar(aluno){
        try {
            if(confirm(`Tem certeza que deseja deletar o Aluno ${aluno.nome}`)){
                await axios.delete(`${url}/${aluno._id}`);
                getAlunos();
            }
        } catch (error) {
            alert(`Nao foi possivel deletar o Aluno ${aluno.nome} tente mais tarde.`)
        }
    };

    useEffect(() =>{
        getAlunos();
    }, []);

    return(
        <div>
            <h1>Alunos</h1>

            <button onClick={() => navigate(`/formulario`)}>Novo Aluno</button>
            <ul>
                {aluno.map((aluno) =>(
                    <li key={aluno._id}
                    style={{ border: "1px solid #999", marginBottom: 5}}>
                        <h3>Nome: {aluno.nome}</h3>
                        <p>Matricula: {aluno.matricula}</p>
                        <p>Curso: {aluno.curso}</p>
                        <p>Bimestre: {aluno.bimestre}</p>
                        <button onClick={() => navigate(`/formulario/${aluno._id}`)}>Editar</button>
                        <button id="apagar" onClick={() => deletar(aluno)}>Apagar</button>
                    </li>
                ))}

            </ul>
        </div>
    )

}

