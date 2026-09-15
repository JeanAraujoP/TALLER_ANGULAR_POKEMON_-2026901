import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', pathMatch: 'full' },
  {
    path: 'registro',
    loadComponent: () =>
      import('./component/registro-usuario/registro-usuario.component').then(
        ({ RegistroUsuarioComponent }) => RegistroUsuarioComponent
      )
  },
  {
    path: 'buscador',
    loadComponent: () =>
      import('./component/buscador-pokemon/buscador-pokemon.component').then(
        ({ BuscadorPokemonComponent }) => BuscadorPokemonComponent
      )
  }
];