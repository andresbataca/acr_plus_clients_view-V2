import { Injectable, inject, signal } from '@angular/core';
import { Subscription, retry, tap, map, catchError, of } from 'rxjs';
import { environments } from '../../../environments/environments.develoment';
import { AuthService } from '../../auth/services/auth.service';
import { ApiPostService } from '../../core/services/api-post.service';
import { UtilitiesService } from '../../core/services/utilities.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerTransactionsService {

  private auth = inject(AuthService);
  private apiPost = inject(ApiPostService);
  private utilities = inject(UtilitiesService);

  private baseUrl: string = environments.baseUrl;

  type_identification!: string;
  identification!: string;
  token!: string;

  dataInicializacion() {

    this.type_identification = this.auth.usuario.checkId;
    this.identification = this.auth.usuario.ID;
    this.token = this.auth.usuario.tokenUser;

    const paramsBody = {
      type_identification: this.type_identification,
      identification: this.identification,
    };

    const UrlApi = `${this.baseUrl}/api/app/home`;

    return this.apiPost.getDebtInfo(UrlApi, paramsBody).pipe(
      retry(2),
      map((resp) => {
        // const data = {
        //   totalQuota: this.utilities.formatearNumero(resp.data[0].availableQuota),
        //   mora: resp.data[0].arrearValue,
        //   limitDateToPay: resp.data[0].limitDateToPay,
        //   minimalPayment: resp.data[0].minimalPayment,
        //   totalPayment: resp.data[0].totalPayment,
        //   arrayMovements: resp.data[0].movements,
        //   collectionExpenses: resp.data[0].collectionExpenses,
        //   approved: this.utilities.formatearNumero(resp.data[0].totalQuota),
        //   productName: resp.data[0].productName
        // };

        return resp.data;
      }),
      catchError((err) => of(err.error))
    );
  }
}
