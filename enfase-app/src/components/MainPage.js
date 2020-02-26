import React from 'react';
import '../styles/MainPage.css';


//Componente responsavel pela apresentacao de uma pergunta
//será apresentada como um conteiner que pode expandir e contrair
class Question extends React.Component {
  render() {
      const activeClass = this.props.active ? "active" : " ";

      return(
        <div className="Question">
          <button 
            type="button" 
            className={"collapsible " + activeClass}
            onClick={(i) => this.props.onClick(i)}
          >
            Open Collapsible
          </button>
        {this.props.content}
      </div>
      );
  }
}

//Componente responsavel pela listagem das perguntas
class QuestionList extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          questions: [0,1],
          active: Array(2).fill(false),
          content: Array(2).fill(null),
      }
    }

  handleClick(i) {
    const content = this.state.content.slice();
    const active = this.state.active.slice();

    if(active[i]){
      active[i] = false;
      content[i] = " ";
    } else {
      active[i] = true;
      content[i] = (<div className="content">
                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>);
    }

     this.setState(function(prevState, props){
          return {questions: prevState.questions,
              active: active,
              content: content,}
      })  ;

    this.setState({
      questions: this.state.questions,
      active: active,
      content: content,
    })

    }

    renderQuestion(i) {
      return (
          <Question
            content={this.state.content[i]}
            active={this.state.active[i]}
            onClick={(i) => this.handleClick(i)}
          />
      );
    }


  render() {
    const questions = this.state.questions.map((step, index) => {
          return (
            this.renderQuestion(step)
            );
        });

    return (
      <div className="Question-List">
        {questions}
      </div>
    );
  }
}


//Componente que renderiza toda a pagina principal
class MainPage extends React.Component {
  render() {
    return (  
      <div className="Outer-Box">
        <div className="Inner-Box">
          <QuestionList />
        </div>
      </div>
    );
  }
}

export default MainPage;