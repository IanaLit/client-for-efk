import { CategoryService } from './categoryService';

export class AuthService {
  static login = async (body: { login:string, password: string }) => {
    console.log(body);// вывод {"login": "admin","password": "admin"}
    const response = await fetch(`${CategoryService.uri}/admin/auth/`,
      {
        method: 'POST',
        // mode: 'no-cors',
        headers: { 'content-type': 'application/json; charset=UTF-8' },
        body: JSON.stringify(body),
      });
    return response.json();
  };
}
