import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { Pokemon, PokemonService } from './pokemon/pokemon.service';

@Component({
  selector: 'pokedex',
  templateUrl: './pokedex-app.component.html',
  styleUrl: './pokedex-app.component.scss',
})
export class PokedexAppComponent {
  loading: boolean = true;
  page: number = 1;
  list: {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<{
      name: string;
      url: string;
    }>;
  } | null = null;
  search: string = '';
  delayedSearch: string = '';
  timeout: any;
  dialog = inject(MatDialog);

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getList(1);
  }

  onSearchChange(event: Event) {
    if (event.target && 'value' in event.target) {
      this.search = event?.target?.value as string;
      if (this.timeout) clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.delayedSearch = this.search;
        if (this.delayedSearch) {
          this.searchPokemon(this.delayedSearch, 1);
        } else {
          this.getList(1);
        }
      }, 600);
    }
  }

  private async getList(page: number) {
    this.loading = true;
    this.page = page;
    const data = await this.pokemonService.listPokemon(page);
    this.list = data;
    this.loading = false;
  }

  private async searchPokemon(name: string, page: number) {
    this.loading = true;
    this.page = page;
    const data = await this.pokemonService.search(name, page);
    this.list = data;
    this.loading = false;
  }

  previousPage() {
    if (this.list?.previous !== null) {
      if (this.delayedSearch) {
        this.searchPokemon(this.delayedSearch, this.page - 1);
      } else {
        this.getList(this.page - 1);
      }
    }
  }

  nextPage() {
    if (this.list?.next !== null) {
      if (this.delayedSearch) {
        this.searchPokemon(this.delayedSearch, this.page + 1);
      } else {
        this.getList(this.page + 1);
      }
    }
  }

  showPokemon(url: string) {
    const id = url.split('/').filter(Boolean).pop();
    this.dialog.open(DialogPokemon, {
      data: { id },
    });
  }
}

@Component({
  selector: 'dialog-pokemon',
  templateUrl: './pokedex-dialog.html',
  styleUrl: './pokedex-dialog.scss',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatCardModule],
})
export class DialogPokemon {
  data = inject(MAT_DIALOG_DATA);
  pokemon: Pokemon | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit() {
    this.getPokemon(this.data.id);
  }

  async getPokemon(id: string) {
    const data = await this.pokemonService.getPokemonById(id);
    this.pokemon = data;
  }

  getTypes() {
    if (this.pokemon) {
      return this.pokemon.types.map((type) => type.type.name).join(', ');
    }
    return '';
  }

  getImg() {
    if (this.pokemon) {
      return this.pokemon.sprites.front_default;
    }
    return '';
  }
}
