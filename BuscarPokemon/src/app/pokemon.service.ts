import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

/** Modelo simplificado con la información que necesita la vista. */
export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
}

/** Estructura parcial de la respuesta de la PokeAPI. */
interface PokeApiResponse {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: {
        front_default: string | null;
      };
    };
  };
  types: { type: { name: string } }[];
}

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private readonly baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private readonly http: HttpClient) {}

  /**
   * Busca un Pokémon por nombre o número.
   * La PokeAPI espera el término en minúsculas y sin espacios.
   */
  getPokemon(query: string): Observable<Pokemon> {
    const term = query.trim().toLowerCase();
    return this.http
      .get<PokeApiResponse>(`${this.baseUrl}/${encodeURIComponent(term)}`)
      .pipe(map((res) => this.toPokemon(res)));
  }

  private toPokemon(res: PokeApiResponse): Pokemon {
    const artwork = res.sprites.other?.['official-artwork']?.front_default;
    return {
      id: res.id,
      name: res.name,
      image: artwork ?? res.sprites.front_default ?? '',
      types: res.types.map((t) => t.type.name),
      height: res.height,
      weight: res.weight,
    };
  }
}
