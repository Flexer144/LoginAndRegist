import { useState, type ChangeEvent, type FormEvent } from 'react';
import '../style/FormLogin.css'

type FormData = {
  name: string;
  password: string;
  showPassword: boolean;
};

type FormErrors = {
  name?: string;
  password?: string;
};

function FormLogin() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    password: '',
    showPassword: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateName = (name: string): boolean => {
    const re = /^[A-Za-zА-Яа-яЁё'\s-]+$/;
    return re.test(name.trim());
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
      case 'password':
        if (!value.trim()) {
          error = 'Пароль обязателен';
        } else if (!validatePassword(value)) {
          error = 'Пароль должен быть не менее 8 символов';
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
    
    if (!formData.password) {
      newErrors.password = 'Пароль обязателен';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен быть не менее 8 символов';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert(`Добро пожаловать, ${formData.name}!`);
      setFormData({
        name: '',
        password: '',
        showPassword: false
      });
    }
    
    setIsSubmitting(false);
  };

  const deleteLoginMode = () => {
    document.body.classList.remove('login-mode');
    document.body.classList.add('registration-mode');
  };

  const isFormValid = (): boolean => {
    return (
      formData.name.trim() !== '' &&
      formData.password.trim() !== '' &&
      validateName(formData.name) &&
      validatePassword(formData.password)
    );
  };

  return (
    <form onSubmit={handleSubmit} className={`form-login_content ${status ? 'login-mode' : ''}`}>
      <div className="block">
        <h1 className="title__block">Вход</h1>

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
        </div>

        <div className="button-block">
          <button
            type="submit"
            className={`button-apply ${isSubmitting || !isFormValid() ? 'disabled' : ''}`}
            disabled={isSubmitting || !isFormValid()}
          >
            {isSubmitting ? 'Вход...' : 'Войти'}
          </button>
        </div>

        <div className="bottom">
          <p>Нет аккаунта? <span onClick={()=>deleteLoginMode()}>Зарегистрироваться</span></p>
        </div>
      </div>
    </form>
  );
}

export default FormLogin;