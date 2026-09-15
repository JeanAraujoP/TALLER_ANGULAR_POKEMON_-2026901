import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClient } from "@angular/common/http";
import { timeout, catchError } from "rxjs/operators";
import { of } from "rxjs";

@Component({
  selector: "app-bulbasaur",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./bulbasaur.html",
  styleUrl: "./bulbasaur.css"
})
export class Bulbasaur {
  nombre = "Bulbasaur";
  mostrarNombre = false;
  datos: any = null;
  cargando = false;
  errorDatos = false;
  errorImagen = false;

  constructor(private http: HttpClient) {}

  onClick(): void {
    this.mostrarNombre = true;

    if (!this.datos && !this.cargando) {
      this.cargando = true;
      this.errorDatos = false;

      this.http.get<any>(`https://pokeapi.co/api/v2/pokemon/${this.nombre.toLowerCase()}`)
        .pipe(
          timeout(10000),
          catchError((err) => {
            console.error("Error consultando la PokeAPI para " + this.nombre, err);
            return of(null);
          })
        )
        .subscribe((respuesta) => {
          this.cargando = false;
          if (respuesta) {
            this.datos = respuesta;
          } else {
            this.errorDatos = true;
          }
        });
    }
  }

  onImageError(): void {
    this.errorImagen = true;
  }

  obtenerImagen(): string {
    if (!this.datos) {
      return "";
    }
    return this.datos.sprites?.other?.["official-artwork"]?.front_default
      || this.datos.sprites?.front_default
      || "";
  }

  obtenerAltura(): number {
    return this.datos ? this.datos.height / 10 : 0;
  }

  obtenerPeso(): number {
    return this.datos ? this.datos.weight / 10 : 0;
  }
}
