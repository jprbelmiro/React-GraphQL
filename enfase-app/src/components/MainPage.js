import React from 'react';
import '../styles/MainPage.css';

import { useQuery, useMutation } from '@apollo/react-hooks';
import { GET_QUESTOES, VIEW_QUESTAO, DELETE_QUESTAO, EDIT_QUESTAO } from "../Queries";



//Contem o formulario para atualizar a questao
//alem do hook que chama a query para atualizar o banco
const Edit = (props) => {
  let perguntaInput, altAInput, altBInput, altCInput,altDInput;
  const [updateQuestaoInfo, { data_upd }] = useMutation(EDIT_QUESTAO);
  return(
    <form
      onSubmit={e => {
              e.preventDefault();
            
              updateQuestaoInfo ({ variables: { id : parseInt(props.bd_index), 
                                     pergunta: perguntaInput.value,
                                     alternativaa: altAInput.value,
                                     alternativab: altBInput.value, 
                                     alternativac: altCInput.value,
                                     alternativad: altDInput.value} });

              props.editQuestion(props.index,
                                perguntaInput.value,
                                altAInput.value,
                                altBInput.value,
                                altCInput.value,
                                altDInput.value)
              props.updateFather();
          }}>
      <p>Insira a Pergunta:</p>
      <input
          type="text"
          className="pergunta"
          placeholder="Conteúdo da Pergunta"
              ref={node => {
                  perguntaInput = node;
              }}

      />
      <p>Insira alternativa a):</p>
      <input 
        type="text"
        className="alternativa"
        placeholder="Alternativa A"
              ref={node => {
                  altAInput = node;
              }}
      />
      <p>Insira alternativa b):</p>
      <input
          type="text"
        className="alternativa"
        placeholder="Alternativa B"
              ref={node => {
                  altBInput = node;
              }}
      />
      <p>Insira a alternativa c):</p>
      <input
          type="text"
        className="alternativa"
        placeholder="Alternativa C"
              ref={node => {
                  altCInput = node;
              }}
      />
      <p>Insira a alternativa d):</p>
      <input
          type="text"
        className="alternativa"
        placeholder="Alternativa D"
              ref={node => {
                  altDInput = node;
              }}
      />
          <button type="submit">Editar Questao</button>
    </form>
  );
}

//Componente que contem o botao para remover uma questao do
//banco de dados.
const Remove = (props) => {
  const [deleteQuestao, { data_rem }] = useMutation(DELETE_QUESTAO);
  
  return(<button
          className="collapsible-button"
          type="button" 
          onClick={() => {
            deleteQuestao({variables: {id: parseInt(props.bd_index)}});
            props.removeQuestion(props.index);
          }}
          > Deletar </button>);
}

//Componente responsavel pela apresentacao de uma pergunta
//será apresentada como um conteiner que pode expandir e contrair
class Question extends React.Component {
  constructor(props){
    super(props);
    const activeClass = props.active ? "active" : " ";
    this.state ={
      'activeEdit' : false
    }
  }

  resetState(){
    this.setState( {
      'activeEdit': false
    });
  }
  render() {
    if(this.state.activeEdit){
      return (<Edit 
        bd_index = {this.props.bd_index}
        index = {this.props.index}
        editQuestion = {(index, pergunta, alta, altb, altc, altd) =>
                         this.props.editQuestion(index, pergunta, alta,
                                                 altb, altc, altd)}
        updateFather = {() => this.resetState()}
      />);
    } else {
    
      return(
        <div className="Question">
          <button 
            type="button" 
            className={"collapsible " + this.activeClass}
            onClick={(i) => this.props.onClickExpand(this.props.index)}
          >
            {this.props.pergunta}
          </button>
          <Remove 
            bd_index = {this.props.bd_index}
            index = {this.props.index}
            removeQuestion = {(index) => this.props.removeQuestion(index)}
          />
          <button
            className="collapsible-button"
            type="button" 
            onClick={() => {
              this.setState({'activeEdit' : true});
            }}
            > Editar</button>
          {this.props.content}
      </div>
      );
    }
  }
}

//Componente que renderiza a lista de perguntas na pagina
//Principal.
class QuestionList extends React.Component {
  //Estado active é importante para verificar se a questao
  //esta em modo collapsed ou expanded para visualizacao
  constructor(props){
    super(props);
    this.state ={
      'active' : Array(props.fetch.length).fill(false),
      'data' : props.fetch
    }
  }

  //funcao para retirar uma questao da lista
  //de visualizacao
  removeQuestion(index){  
    const data = this.state.data;
    data.splice(index, 1)

    this.setState({
      'active' : this.state.active,
      'data' : data
    });
  }

  //Editar a questao na lista de visualizacao
  editQuestion(index, pergunta, alta, altb, altc, altd){
    const data = this.state.data;

    data.PERGUNTA = pergunta;
    data.ALTERNATIVAA = alta;
    data.ALTERNATIVAB = altb;
    data.ALTERNATIVAC = altc;
    data.ALTERNATIVAD= altd;


    this.setState({
      'active' : this.state.active,
      'data' : data
    });
  }
  //logica de renderizacao de uma instacia de questao
  renderQuestion(questao, index) {
    var content = null;

    //verificando se esta no estado collapsed ou expanded
    if(this.state.active[index]){
      content = (<div className="content">
                  <p>a) {questao.ALTERNATIVAA}</p>
                  <p>b) {questao.ALTERNATIVAB}</p>
                  <p>c) {questao.ALTERNATIVAC}</p>
                  <p>d) {questao.ALTERNATIVAD}</p>
                </div>);
    }

    return (
        <Question
          index = {index}
          bd_index={questao.ID}
          content={content}
          active={this.state.active[index]}
          pergunta={questao.PERGUNTA}
          onClickExpand={(i) => this.handleClick(i)}
          removeQuestion={(i) => this.removeQuestion(i)}
          editQuestion={(index, pergunta, alta, altb, altc, altd) =>
                          this.editQuestion(index, pergunta, alta, 
                                                      altb, altc, altd)}
        />
    );
  }

  //lidar com a expansao ou compressao de uma questao
  handleClick(i) {
      const active = this.state.active.slice();

      if(active[i]){
        active[i] = false;
      } else {
        active[i] = true;
      }
      this.setState({
        active: active,
      });
  }
  render() {
    const questoesArray = this.state.data;
    const questions = questoesArray.map((questao, index) => {
          return (
            this.renderQuestion(questao, index)
          );
    });
    
    return (
      <div className="Question-List"> 
         {questions}
      </div>
    );
  }
}

//Componente responsavel pela consulta das perguntas
//ele fara uma busca de todas no bancos de dados
function FetchList() {
  const {loading, error, data } = useQuery(GET_QUESTOES);
  //Esperando os dados serem carregados
  if(loading) return null;
  if(data){
    return (
      <div className="Question-List">
        <QuestionList
          fetch={data.getQuestoes}
        />
      </div>
    );
  } else {
    return <strong>Erro com acesso ao Servidor</strong>;
  }
  
}


//Componente que renderiza toda a pagina principal
//Criando as caixas que serão o esqueleto de nossa pagina
class MainPage extends React.Component {
  render() {
    return (  
      <div className="Outer-Box">
        <div className="Inner-Box">
          <FetchList />
        </div>
      </div>
    );
  }
}

export default MainPage;