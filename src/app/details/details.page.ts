import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { PokemonService } from '../services/pokemon.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonContent, 
    IonHeader, 
    IonTitle, 
    IonToolbar, 
    IonButtons,
    IonBackButton,
    CommonModule, 
    FormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DetailsPage implements OnInit {

  public pokemon: any;
  
  constructor(private pokemonService: PokemonService, private rotaAtiva: ActivatedRoute) { }

  ngOnInit() {
    const index = Number(this.rotaAtiva.snapshot.paramMap.get('id'));
    this.pokemonService.getDetails(index).subscribe(details => {
      this.pokemon = details;
    })
  }

}
