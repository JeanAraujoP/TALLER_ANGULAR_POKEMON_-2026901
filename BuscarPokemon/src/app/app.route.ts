import { Routes } from '@angular/router'
import { RegistroUsuarioComponent } from './components/registro-usuario/registro-usuario.component';
import { BuscadorPokemonComponent } from './components/buscardor-pokemon/buscador-pokemon.component';

export const routes: Routes = [

    { path: '', redirectTo: 'registro', pathMatch: 'full' },
    { path: 'registro', component: RegistroUsuarioComponent },
    { path: 'buscador', component: BuscadorPokemonComponent },
    { path: '**', redirectTo: 'registro' }
];