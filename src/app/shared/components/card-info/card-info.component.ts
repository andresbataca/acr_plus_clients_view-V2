import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-card-info',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card-info.component.html',
  styleUrl: './card-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardInfoComponent {
  @Input() card: any;
  // card = input<any>();
 }
