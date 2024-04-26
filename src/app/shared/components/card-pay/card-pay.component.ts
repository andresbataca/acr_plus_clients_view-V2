import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-pay',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './card-pay.component.html',
  styleUrl: './card-pay.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardPayComponent {
  @Input() card: any;
  
 }
