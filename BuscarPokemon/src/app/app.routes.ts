import { Routes } from '@angular/router';
import { RegistroUsuario } from './component/registro-usuario/registro-usuario';
import { BuscadorPokemon } from './component/buscador-pokemon/buscador-pokemon';
import { Pikachu } from './component/pikachu/pikachu';
import { Bulbasaur } from './component/bulbasaur/bulbasaur';
import { Charmander } from './component/charmander/charmander';
import { Squirtle } from './component/squirtle/squirtle';
import { Arceus } from './component/arceus/arceus';
import { Eevee } from './component/eevee/eevee';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroUsuario },
  { path: 'buscador', component: BuscadorPokemon },
  { path: 'pikachu', component: Pikachu },
  { path: 'bulbasaur', component: Bulbasaur },
  { path: 'charmander', component: Charmander },
  { path: 'squirtle', component: Squirtle },
  { path: 'arceus', component: Arceus },
  { path: 'eevee', component: Eevee },
  { path: '**', redirectTo: 'registro' }
];  