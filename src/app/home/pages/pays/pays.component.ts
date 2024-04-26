import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CardPayComponent } from '../../../shared/components/card-pay/card-pay.component';

@Component({
  selector: 'app-pays',
  standalone: true,
  imports: [
    CommonModule,
    CardPayComponent
  ],
  templateUrl: './pays.component.html',
  styleUrl: './pays.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaysComponent {
  private router = inject(Router)


  cardCont: any = {
    img:'https://creditoacr.com/wp-content/uploads/2022/07/LOGOS-CANALES-DE-PAGO-02.png',
    title:'PSE',
    body: 'PSE es el botón de Pagos Seguros en Línea.',
    footer:'Pagar',
    onMethodAction: () => {

      this.router.navigateByUrl('/home/paypse');

    }
  }


  cardInst: any = {
    img:'https://creditoacr.com/wp-content/uploads/2023/07/6001399.png',
    title:'Binance',
    body: 'Paga seguro con Binance, líder en criptomonedas',
    footer:'Pagar',
    onMethodAction: () => {

      this.router.navigateByUrl('/home/paybinance');

    }
  }
 }
