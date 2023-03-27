import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export default function FormularioPage() {
    const url = "https://api-aluno.vercel.app/aluno";
    const {idAluno} = useParams();
    const navigate = useNavigate();

    const [id, setId] = useState("");
    const [nome, setNome] = useState("");
    const [matricula, setMatricula] = useState("");
    const [curso, setCurso] = useState("");
    const [bimestre, setBimestre] = useState("");

    function cancelar(){
        limparform();
        navigate('/');
    };

    function limparform(){
        setId(''),
        setNome(''),
        setMatricula(''),
        setCurso(''),
        setBimestre('')
    };

    function setarDados(aluno){
        setId(aluno._id),
        setNome(aluno.nome),
        setMatricula(aluno.matricula),
        setCurso(aluno.curso),
        setBimestre(aluno.bimestre)
    };

    async function editarAluno(event){
        event.preventDefault();
        try {
            await axios.put(`${url}/${id}`,{
                id:id,
                nome:nome,
                matricula:matricula,
                curso:curso,
                bimestre:bimestre
            })
            alert(`O aluno ${nome} foi atualizado!`)
            limparform();
            navigate('/');
        } catch (error) {
            alert("Erro ao editar o aluno, tem mais tarde!")    
        }
    };

    async function adicionarAluno(event){
        event.preventDefault();

        try {
            await axios.post(url,{
                nome: nome,
                matricula: matricula,
                curso: curso,
                bimestre: bimestre 
            })
            limparform();
            navigate("/");

        } catch (error) {
            alert("Erro ao cadastrar novo aluno tente mais tarde.");
        }
    }

    async function getAlunoId(){
        
        try {
            const response = await axios.get(`${url}/${idAluno}`);
            setarDados(response.data)

            
        } catch (error) {

            alert("Erro ao carregar os dados do aluno, tente mais tarde!")
            
        }
    };

    useEffect(() => {
        if(idAluno){
            getAlunoId();
        }
    }, []);



    return(
        <div>
            <h1>Gerenciar Alunos</h1>
            <form >
                Nome: <input type="text" onChange={(event) => setNome(event.target.value)} value={nome} />
                Matricula: <input type="number" onChange={(event) => setMatricula(event.target.value)} value={matricula} />
                Curso: <input type="text" onChange={(event) => setCurso(event.target.value)} value={curso} />
                Bimestre: <input type="number" onChange={(event) => setBimestre(event.target.value)} value={bimestre} />
                <button onClick={(event) => idAluno ? editarAluno(event) : adicionarAluno(event)}>{idAluno ? "Salvar" : "Cadastrar" }</button>
                <button onClick={() => cancelar()}>Cancelar</button>
                
            </form>
        </div>
    )
}