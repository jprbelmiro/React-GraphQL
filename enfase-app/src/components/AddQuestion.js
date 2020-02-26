import React from 'react';
import '../styles/MainPage.css';

class QuestionForm extends React.Component {
	render(){
		return(
		  	<div>
		    	<h2>About</h2>
		  	</div>
		);
	}
}

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