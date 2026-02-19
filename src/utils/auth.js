const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

export const register = (formData) => {
  const { email, password } = formData;
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Erro no registro');
  });
};

export const login = (formData) => {
  const { email, password } = formData;
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Erro no login');
  });
};

export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Token inválido');
  });
};


