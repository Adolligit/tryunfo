import React from 'react';

class Form extends React.Component {
	render() {
		return (
			<>
				<label> Nome : 
					<input data-testid="name-input" type="text" name="name" />
				</label>
				<label> Descrição : 
						<textarea data-testid="description-input" name="description" ></textarea>
				</label>
				<label> 1° atributo : 
					<input data-testid="attr1-input" type="number" name="fistAttribute" />
				</label>
				<label> 2° atributo : 
					<input data-testid="attr2-input" type="number" name="secondAttribute" />
				</label>
				<label> 3° atributo : 
					<input data-testid="attr3-input" type="number" name="thirdAttribute" />
				</label>
				<label> Imagem : 
					<input data-testid="image-input" type="text" name="name" />
				</label>
				<label>Raridade
					<select data-testid="rare-input" name="raridade">
						<option value="normal">normal</option>
						<option value="raro">raro</option>
						<option value="muito raro">muito raro</option>
					</select>
				</label>
				<label> Super Trunfo : 
					<input data-testid="trunfo-input" type="checkbox" name="superTrunfo" />
				</label>
				<input data-testid="save-button" type="button" name="saveButton" value="Salvar"/>
			</>
		);
	}
}

export default Form;
