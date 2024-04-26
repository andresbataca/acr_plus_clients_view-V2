import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CustomerTransactionsService } from '../../services/customer_transactions.service';
import { Subject, takeUntil } from 'rxjs';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    skeletonDirective
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent {
  private dataService = inject(CustomerTransactionsService)

  data=signal<any>([]);
  skeleton = signal<boolean>(true);

  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.productInicializacion()
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  productInicializacion(){
    this.skeleton.set(true)
     this.dataService.dataInicializacion()
      .pipe(takeUntil(this.destroy$))
      .subscribe((resp)=>{
        this.data.set(resp);
        this.skeleton.set(false);
        console.log(resp);
      })
  }

  // getData(){
  //   const dataclientKeyProduct = this.data().find((item: any) => item.productName === 'Credito ACR');
  //   console.log(dataclientKeyProduct);
  // }
}
