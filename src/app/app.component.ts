import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  public themeService = inject(ThemeService)
  title = 'acr_plus_clients_view';

  ngOnInit(): void {
    this.themeService.themeLoadInAppComponent();
  }
}
