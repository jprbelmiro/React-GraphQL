import React from 'react';
import '../styles/AddQuestion.css';


import { useMutation } from '@apollo/react-hooks';
import { ADD_QUESTAO } from "../Queries";


//Componente que contem o formulario e o hook com a query
//para adicionar uma pergunta no banco de dados
function QuestionForm() {
    let perguntaInput, altAInput, altBInput, altCInput,altDInput;
    //hook de mutation
    const [createQuestao, { data }] = useMutation(ADD_QUESTAO);

    
	return (
        <div>
    		<form 
                onSubmit={e => {
                    e.preventDefault();
                    //envio da mutation
                    createQuestao({ variables: { pergunta: perguntaInput.value,
                                           alternativaa: altAInput.value,
                                           alternativab: altBInput.value, 
                                           alternativac: altCInput.value,
                                           alternativad: altDInput.value} });
                    perguntaInput.value = '';
                    altAInput.value = '';
                    altBInput.value = '';
                    altCInput.value = '';
                    altDInput.value = '';

                    alert("pergunta enviada!");
                }}>
        		<h1>Adicionar Questão</h1>
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
                <button type="submit">Adicionar Questao</button>
      		</form>
        </div>
	);

}

//Contem o esqueleto externo da página
class AddQuestion extends React.Component {
	render() {
		return(
			<div className="Outer-Box">
	        	<div className="Inner-Box">
	        		<QuestionForm />
	        	</div>
	    	</div>
    	);
	}
}
export default AddQuestion;