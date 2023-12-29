import { useState } from 'react';
import _ from './Form.module.css';

export const Form = () => {

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [checkErrorForm, setcheckErrorForm] = useState(false);
  const [save, setSave] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const validEmail = (value) => {
    setEmailError(/^.+@.+\..+$/.test(value));
  }

  const validPassword = (value) => {
    setPasswordError(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/.test(value))
  }
  
  const handleEmail = ({target}) => {
    setEmail(target.value);
    validEmail(target.value)
  };

  const handlePassword = ({target}) => {
    setPassword(target.value);
    validPassword(target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!emailError || !passwordError) {
      setcheckErrorForm(true);
      return;
    }
    setIsPending(true);
    console.log({
      email,
      password,
      save
    });
  }

  const handleSave = ({target}) => {
    setSave(target.checked)
  }

  return (
    <form className={_.form} onSubmit={handleSubmit}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>Email</label>
        <input
          className={_.input}
          id='email'
          name='email'
          type='text'
          value={email}
          onChange={handleEmail}
          onBlur={() => {setEmailDirty(true)}}
          disabled={isPending}
        />
        {!emailError && emailDirty && <p className={_.error}>Сообщение об ошибки</p>}
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>Пароль</label>
        <input
          className={_.input}
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={handlePassword}
          onBlur={() => {setPasswordDirty(true)}}
          disabled={isPending}
        />
        {!passwordError && passwordDirty && <p className={_.error}>Сообщение об ошибки</p>}
      </div>

      <div className={_.wrapCheckbox}>
        <input 
          className={_.checkbox}
          id='save'
          name='save'
          type='checkbox'
          onChange={handleSave}
          checked={save}
          disabled={isPending}
        />
        <label className={_.labelСheckbox} htmlFor='save' >Сохранить пароль</label>
      </div>

      {isPending ? (
        <p className={_.pending}>Отправка</p>
        ) : (
          <button className={_.submit} type='submit'>Войти</button>
        )}
      {checkErrorForm && (!passwordError || !emailError) && (
        <p className={_.errorSubmit}>Сообщение об ошибке</p>
      )}
    </form>
  )
}