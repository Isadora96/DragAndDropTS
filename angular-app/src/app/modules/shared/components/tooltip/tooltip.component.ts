import {Component, Input } from '@angular/core';
import {FormControl} from '@angular/forms';
import {TooltipPosition} from '@angular/material/tooltip';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css'],
})

export class TooltipComponent {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  favNumber: number | undefined;


  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.favoritesService.getData().subscribe((data) => (this.favNumber = data.length));
  }

}
