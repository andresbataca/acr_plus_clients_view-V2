import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-active-contests',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './active-contests.component.html',
  styleUrl: './active-contests.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActiveContestsComponent { }
