import _ from './Form.module.css';
import {useForm} from 'react-hook-form';

export const Form = () => {
  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <form className={_.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={_.wrap}>
        <label className={_.label} htmlFor='email'>Email</label>
        <input
          className={_.input}
          id='email'
          type='text'
          {...register('email', {
            required: {
              value: true,
              message: 'Поле не должно быть пустым',
            },
            pattern: {
              value: /^.+@.+\..+$/,
              message: 'Неверный email',
            }
          })}
          aria-invalid={!!errors.email}
        />
        {errors.email && <p className={_.error}>{errors.email.message}</p>}
      </div>

      <div className={_.wrap}>
        <label className={_.label} htmlFor='password'>Пароль</label>
        <input
          className={_.input}
          id='password'
          type='password'
          {...register('password', {
            required: {
              value: true,
              message: 'Поле не должно быть пустым',
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/,
              message: 'Не безопасный пароль',
            }
          })}
          aria-invalid={!!errors.password}
        />
        {errors.password && <p className={_.error}>{errors.password.message}</p>}
      </div>

      <div className={_.wrapCheckbox}>
        <input 
          className={_.checkbox}
          id='save'
          type='checkbox'
          {...register('save')}
        />
        <label className={_.labelСheckbox} htmlFor='save' >Сохранить пароль</label>
      </div>
      <button className={_.submit} type='submit'>Войти</button>
      <p className={_.errorSubmit}>Сообщение об ошибке</p>
    </form>
  )
}