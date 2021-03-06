import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { LoginForm } from './components/loginForm/loginForm';
import { Main } from './components/main/main';
import { StarField } from './components/stars/starField';
import { GameService } from './services/gameService';
import { LoginSevice } from './services/loginService';
import { StateService } from './services/stateService';
import './styles.scss';

const header = new Header();
document.body.appendChild(header.element);
const raiting = new StarField();
StateService.raiting = raiting;
document.body.appendChild(raiting.element);
const main = new Main(document.body);
main.initState();
GameService.renderCategories();
const loginForm = new LoginForm();
LoginSevice.loginForm = loginForm;
LoginSevice.main = main;
document.body.appendChild(loginForm.element);
const footer = new Footer();
document.body.insertAdjacentElement('afterend', footer.element);
footer.setLinks();

// main.renderCategories();
