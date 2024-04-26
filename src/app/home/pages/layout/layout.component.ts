import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { ThemeService } from '../../../core/services/theme-service.service';
import { ModalComponent } from '../../../shared/components/modal/modal.component';
import { RouterModule } from '@angular/router';
import { HostListener } from '@angular/core';
import { ApiGetService } from '../../../core/services/api-get.service';
import { CacheService } from '../../../core/services/cache.service';
import { LoaderComponent } from '../../../shared/components/loader/loader.component';
import { AccordionDirective } from '../../../shared/directives/accordion.directive';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    CommonModule,
    ModalComponent,
    RouterModule,
    LoaderComponent,
    AccordionDirective
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {

  isMoodDark: boolean = false;
  isClose: boolean = false;
  data!: any;
  screenWidth!: number;
  isMobile!: boolean;
  isOpen: boolean = false;

  get usuario(){
    return this.auth.usuario;
  }

  constructor(
    public themeService: ThemeService,
    private auth:AuthService
    ) {}


  ngOnInit(): void {
    this.getScreenSize();
    this.isMoodDark = this.themeService.themeInLocalStorage();
  }


  toggleTheme() {
    this.themeService.toggleTheme();
    this.isMoodDark = this.themeService.getIsDarkMode;
  }

  toggleSearch() {
    this.isClose = false;
  }

  toggleClose() {
    this.isClose = !this.isClose;
  }

  logout(){
    this.auth.logout();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.screenWidth = window.innerWidth;

    if (this.screenWidth <= 768) {
      this.isMobile = true;
    }
    else{
      this.isMobile = false;
    }
  }

  toggle(){
    this.isOpen = !this.isOpen;
  }
}
