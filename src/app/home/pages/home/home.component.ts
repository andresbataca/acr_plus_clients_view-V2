import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { ApiGetService } from '../../../core/services/api-get.service';
import { CustomerTransactionsService } from '../../services/customer_transactions.service';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { Subject, takeUntil } from 'rxjs';
import { CardItemComponent } from '../../../shared/components/card-item/card-item.component';
import { AuthService } from '../../../auth/services/auth.service';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CardItemComponent,
    skeletonDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  private dataService = inject(CustomerTransactionsService)
  private auth = inject(AuthService);


  private destroy$ = new Subject<void>();

  data = signal<any>({});
  name = signal<string>('');
  skeleton = signal<boolean>(false);

  cardPs = signal<any>({
    icon:'bx bx-dock-left icon',
    coloricon:'var(--primary-color-neutro)',
    title:'Paz y salvo',
    route:'cleared',
    subtitle: 'Comprobante de Deudas Pagadas.',
  })
  cardSc = signal<any>({
    icon:'bx bx-calculator icon',
    coloricon:'rgb(181 215 124)',
    title:'Simulador',
    route:'credit-simulator',
    subtitle: 'Encuentra tu Mejor Opción Financiera.',
  })
  cardPy = signal<any>({
    icon:'bx bx-credit-card icon',
    coloricon:'#ffa534',
    title:'Pagos',
    route:'pays',
    subtitle: 'Gestiona tus Pagos con Facilidad.',
  })
  cardCont = signal<any>({
    icon:'bx bxs-contact icon',
    coloricon:'rgb(113 144 209)',
    title:'Contacto',
    route:'contact-us',
    subtitle: 'Estamos Aquí para Ayudarte.',
  })

  ngOnInit(): void {
    this.homeInicializacion()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  homeInicializacion(){
    this.skeleton.set(true)
     this.dataService.dataInicializacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp)=>{
        this.data.set(resp);
        this.skeleton.set(false)
      })

      this.name.set( this.auth.usuario.name);
  }
}


