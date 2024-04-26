import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-benefits',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './Benefits.component.html',
  styleUrl: './Benefits.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BenefitsComponent { }
