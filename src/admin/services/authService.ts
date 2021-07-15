import { CategoryService } from "./categoryService";

export class AuthService{
    static login = async ( body: {login:string, password: string }) => {
      console.log(body);
        const response = await fetch(`${CategoryService.uri}/admin/auth/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          });
          //console.log(response.json());
        return response.json();
      };
}