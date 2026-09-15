import { Routes } from '@angular/router';
import { RegistroUsuario } from './component/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './component/buscador-pokemon/buscador-pokemon';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroUsuario },
  { path: 'buscador', component: BuscadorPokemon },
  { path: '**', redirectTo: 'registro' }
];  