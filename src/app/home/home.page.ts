import { Component, OnInit, ViewChild } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonSearchbar, IonList, IonItem, IonAvatar, IonSkeletonText, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonThumbnail, IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonInfiniteScrollContent, 
    IonInfiniteScroll, 
    IonCardContent, 
    IonCardSubtitle, 
    IonCardTitle, 
    IonCardHeader, 
    IonCard, 
    IonLabel, 
    IonSkeletonText, 
    IonAvatar, 
    IonItem, 
    IonList, 
    IonSearchbar, 
    IonImg, 
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonThumbnail,
    RouterLink,
    CommonModule
  ],
})
export class HomePage implements OnInit {

  @ViewChild(IonInfiniteScroll) infinite!: IonInfiniteScroll;
  
  private offset: number = 0;
  public pokemon: any[] = [];
  
  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.load();
  }

  public load(loadMore = false, event?: any) {
    if(loadMore) this.offset += 25;

    this.pokemonService.getAll(this.offset).subscribe(res => {
      this.pokemon = [...this.pokemon, ...res];
      if(event) event.target.complete();
      if(this.offset === 125) this.infinite.disabled = true;
    })
  }

  public onSearchChange(e: any) {
    let value = e.detail.value;
    if(value === "") {
      this.offset = 0;
      this.load();
      return;
    }

    this.pokemonService.find(value).subscribe({
      next: (res) => { this.pokemon = [res] },
      error: () => { this.pokemon = [] }
    });
  }
}
