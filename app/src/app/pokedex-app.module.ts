import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PokedexAppComponent } from './pokedex-app.component';
import { routes } from './pokedex-app.routes';
import { PokemonService } from './pokemon/pokemon.service';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  providers: [PokemonService, provideAnimationsAsync()],
  declarations: [PokedexAppComponent],
  bootstrap: [PokedexAppComponent],
})
export class PokedexAppModule {}
