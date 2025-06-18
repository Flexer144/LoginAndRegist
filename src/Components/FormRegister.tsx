import { useState, type ChangeEvent, type FormEvent } from 'react';
import '../style/FormRegister.css';

type FormData = {
  name: string;
  email: string;
  password: string;
  repassword: string;
  showPassword: boolean;
};

type FormErrors = {
  name?: string;
  email?: string;
  password?: string;
  repassword?: string;
};

function FormRegister() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    repassword: '',
    showPassword: false,
  });

  const [status, setStatus] = useState<boolean>(false)

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name: string): boolean => {
    const re = /^[A-Za-zА-Яа-яЁё'\s-]+$/;
    return re.test(name.trim());
  };

  const validateEmail = (email: string): boolean => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData({
      ...formData,
      [name]: newValue,
    });

    if (errors[name as keyof FormErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let error = '';

    switch (name) {
      case 'name':
        if (!value.trim()) {
          error = 'Имя обязательно';
        } else if (!validateName(value)) {
          error = 'Некорректное имя';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email обязателен';
        } else if (!validateEmail(value)) {
          error = 'Некорректный email';
        }
        break;
      case 'password':
        if (!value.trim()) {
          error = 'Пароль обязателен';
        } else if (!validatePassword(value)) {
          error = 'Пароль должен быть не менее 8 символов';
        }
        break;
      case 'repassword':
        if (!value.trim()) {
          error = 'Повторите пароль';
        } else if (value !== formData.password) {
          error = 'Пароли не совпадают';
        }
        break;
      default:
        break;
    }

    if (error) {
      setErrors({
        ...errors,
        [name]: error,
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newErrors: FormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно';
    } else if (!validateName(formData.name)) {
      newErrors.name = 'Некорректное имя';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Некорректный email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    }
    
    if (!formData.repassword) {
      newErrors.repassword = 'Повторите пароль';
    } else if (formData.repassword !== formData.password) {
      newErrors.repassword = 'Пароли не совпадают';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert(`Спасибо за регистрацию, ${formData.name}!`);
      formData.name = ''
      formData.email = ''
      formData.password = ''
      formData.repassword = ''
    }
    
    setIsSubmitting(false);
  };

  function loginMode(){
    setStatus(true)
    document.body.classList.add('login-mode');
    document.body.classList.remove('registration-mode');
  }

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.password.trim() !== '' &&
      formData.repassword.trim() !== '' &&
      formData.password === formData.repassword
    );
  };

  return (
    <form onSubmit={handleSubmit} className={`form-register_content ${status ? 'login-mode' : ''}`}>
      <div className="block">
        <h1 className="title__block">Регистрация</h1>

        <div className="input-container">
          <input
            id="input-name"
            name="name"
            className={`input-registr input-name ${errors.name ? 'error' : ''}`}
            type="text"
            placeholder=" "
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="input-name">Введите Имя</label>
          {errors.name && <div className="error-text">{errors.name}</div>}
        </div>

        <div className="input-container">
          <input
            id="input-email"
            name="email"
            className={`input-registr input-email ${errors.email ? 'error' : ''}`}
            type="email"
            placeholder=" "
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="input-email">Введите Email</label>
          {errors.email && <div className="error-text">{errors.email}</div>}
        </div>

        <div className="input-container">
          <input
            id="input-password"
            name="password"
            className={`input-registr input-password ${errors.password ? 'error' : ''}`}
            type={formData.showPassword ? 'text' : 'password'}
            placeholder=" "
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="input-password">Введите пароль</label>
          {errors.password && <div className="error-text">{errors.password}</div>}
        </div>

        <div className="input-container">
          <input
            id="input-repassword"
            name="repassword"
            className={`input-registr input-repassword ${errors.repassword ? 'error' : ''}`}
            type={formData.showPassword ? 'text' : 'password'}
            placeholder=" "
            value={formData.repassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor="input-repassword">Повторите пароль</label>
          {errors.repassword && <div className="error-text">{errors.repassword}</div>}
        </div>

        <div className="checkbox">
          <div className="show-password">
            <input
              name="showPassword"
              id="check-box"
              type="checkbox"
              checked={formData.showPassword}
              onChange={handleChange}
            />
            <label htmlFor="check-box">Показать пароль</label>
          </div>
          {/* <p>Forget Password?</p> */}
        </div>

        <div className="button-block">
          <button
            type="submit"
            className={`button-apply ${isSubmitting || !isFormValid() ? 'disabled' : ''}`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? 'Обработка...' : 'Signup'}
          </button>
        </div>

        <div className="bottom">
          <p>У вас уже есть учетная запись?<span onClick={()=>loginMode()}>Войти</span></p>
        </div>
      </div>
    </form>
  );
}

export default FormRegister;