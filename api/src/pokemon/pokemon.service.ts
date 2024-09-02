import { Injectable } from "@nestjs/common";

@Injectable()
export class PokemonService {
  getHello(): string {
    return "Hello Pokemon!";
  }

  async listPokemon(offset: number) {
    const resp = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${offset}`
    );
    return resp.json();
  }

  async getPokemonById(id: string) {
    const resp = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    return resp.json();
  }

  async listAll() {
    const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1302");
    return resp.json();
  }
}
