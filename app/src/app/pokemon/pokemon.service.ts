import { Injectable } from '@angular/core';

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  location_area_encounters: string;
  species: {
    name: string;
    url: string;
  };
  sprites: {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
}

@Injectable()
export class PokemonService {
  async listPokemon(page: number) {
    const resp = await fetch(`http://localhost:3000/api/pokemon/list/${page}`);
    return resp.json();
  }

  async getPokemonById(id: string) {
    const resp = await fetch(`http://localhost:3000/api/pokemon/${id}`);
    return resp.json();
  }

  async search(name: string, page: number) {
    const resp = await fetch(
      `http://localhost:3000/api/pokemon/search/${name}/${page}`
    );
    return resp.json();
  }
}
