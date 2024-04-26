import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-item',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './card-item.component.html',
  styleUrl: './card-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardItemComponent {
  cardArray = input<any>();
}
