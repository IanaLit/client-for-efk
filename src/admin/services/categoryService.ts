export class CategoryService {
  static uri = 'http://localhost:3000';
  static getCategories = async () => {
    const response = await fetch(`${CategoryService.uri}/admin/categories`,
      {
        headers: { 'Access-Control-Allow-Origin': `${CategoryService.uri}` },
      });
    return response.json();
  };

  static createCategory = async ( body: {id:string, name: string; words:string[]}) => {
    const response = await fetch(`${CategoryService.uri}/admin/categories/`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    return response.json();
  };
  static deleteCategory = async (id: string) => {
    const response = await fetch(`${CategoryService.uri}/admin/categories/${id}`,
      {
        method: 'DELETE',
      });
  };
}
