import { Controller, Get, Param } from "@nestjs/common";
import { PokemonService } from "./pokemon.service";

@Controller("pokemon")
export class PokemonController {
  constructor(private pokemonService: PokemonService) {}

  @Get()
  getHello(): string {
    return this.pokemonService.getHello();
  }

  @Get("list/:page")
  async listPokemon(@Param("page") page: string) {
    const offset = parseInt(page || "1") * 10 - 10;
    return this.pokemonService.listPokemon(offset);
  }

  @Get(":id")
  async getPokemonById(@Param("id") id: string) {
    return this.pokemonService.getPokemonById(id);
  }

  @Get("search/:name/:page")
  async searchPokemon(
    @Param("name") name: string,
    @Param("page") page: string
  ) {
    const list = await this.pokemonService.listAll();
    const offset = parseInt(page || "1") * 10 - 10;
    const filtered = list.results.filter((pokemon) =>
      pokemon.name.includes(name.toLowerCase())
    );
    const count = filtered.length;
    const pages = Math.ceil(count / 10).toString();
    return {
      count,
      next: page === pages ? null : "",
      previous: page === "1" ? null : "",
      results: filtered.slice(offset, offset + 10),
    };
  }
}
