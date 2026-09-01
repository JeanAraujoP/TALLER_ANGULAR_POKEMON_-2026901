import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';
import { Pokemon, PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  /** Término escrito en el input. */
  query = '';

  /** Resultado actual de la búsqueda. */
  pokemon: Pokemon | null = null;

  /** Estado de carga y de error para la UI. */
  loading = false;
  error: string | null = null;

  constructor(private readonly pokemonService: PokemonService) {}

  /** Ejecuta la búsqueda contra la PokeAPI. */
  search(): void {
    const term = this.query.trim();

    if (!term) {
      this.error = 'Escribe el nombre o número de un Pokémon.';
      this.pokemon = null;
      return;
    }

    this.loading = true;
    this.error = null;

    this.pokemonService
      .getPokemon(term)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (result) => {
          this.pokemon = result;
          this.error = null;
        },
        error: (err: HttpErrorResponse) => {
          this.pokemon = null;
          this.error =
            err.status === 404
              ? `No se encontró ningún Pokémon llamado "${term}".`
              : 'Ocurrió un error al conectar con la PokeAPI. Inténtalo de nuevo.';
        },
      });
  }

  /** Limpia el buscador y los resultados. */
  reset(): void {
    this.query = '';
    this.pokemon = null;
    this.error = null;
  }
}
