
import './searchChar.scss';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { useState } from 'react';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Link } from 'react-router-dom';

const setContent = (process, Component) => {
    switch (process) {
        case 'waiting':
            return null;
        case 'loading':
            return <Spinner />;
        case 'erorr':
            return <ErrorMessage />;
        case 'confirmed':
            return <Component />;
        default:
            throw new Error('Unexpected process state');
    }
}


const FormSearchChar = () => {
    const [char, setChar] = useState(null);
    const { getCharacterName, clearError, process, setProcess } = useMarvelService();

    const onCharLoader = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {
        clearError();
        getCharacterName(name)
            .then(onCharLoader)
            .then((process) => setProcess('confirmed'));
    }

    const result = !char ? null : char === 'sol' ? (<div className="error">The character was not faund. Check the name and try again</div>) :
    (<div className="character">
        <p className="char">There is! Visit {char.name} page?</p>
        <Link to={`/characters/${char.id}`} className="button button__secondary">
            <div className="inner">TO PAGE</div>
        </Link>
    </div>);
    
    return (
        <div className="searchar__info">
        <Formik
            initialValues={{
                charName: ''
            }}
            validationSchema={Yup.object({
                charName: Yup.string()
                    .min(2, 'Min 2 simbols')
                    .required('This field is required')
            })}
            onSubmit={({ charName }) => {updateChar(charName); console.log(charName)}}>
                {({isSubmitting}) => (
                <Form >
                    <h3 className="searchar__comics" htmlFor="charName">Or find a character by name:</h3>
                    <div className="searchar__basics">
                        <Field
                            className="searchar__comics-item"
                            id="charName"
                            name="charName"
                            type="text"
                            as='input'
                            placeholder='Enter name' />
                        <div className="searchar__btns">
                            <button type="submit" className="button button__main">
                                <div className="inner">FIND</div>
                            </button>
                        </div>
                    </div>
                    <FormikErrorMessage component='div' className='error' name="charName"  />  
                   
                </Form>
                )}
                
        </Formik>
        {setContent(process, () => result)}
        </div>

    )
}

export default FormSearchChar;