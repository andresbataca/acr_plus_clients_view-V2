import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, effect, inject, signal } from '@angular/core';
import { Subject, Subscription, debounceTime, pipe, takeUntil, tap } from 'rxjs';
import { environments } from '../../../../environments/environments.develoment';
import { ApiPostService } from '../../../core/services/api-post.service';
import { UtilitiesService } from '../../../core/services/utilities.service';
import { LoaderService } from '../../../shared/components/loader/loader.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { inputModel } from '../../../core/models/input.model';
import { InputComponent } from '../../../shared/components/input/input.component';
import { selectModel } from '../../../core/models/select.model';
import { SelectComponent } from '../../../shared/components/select/select.component';
import { skeletonDirective } from '../../../shared/directives/skeleton.directive';
import { CustomNumberPipe } from '../../../shared/pipes/custom-number.pipe';
import { CreditSimulatorApiService } from './creditSimulatorApi.service';

@Component({
  selector: 'app-credit-simulator',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputComponent,
    SelectComponent,
    skeletonDirective,
    CustomNumberPipe
  ],
  templateUrl: './credit-simulator.component.html',
  styleUrl: './credit-simulator.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreditSimulatorComponent {

  private fb = inject(FormBuilder);
  private credictSimulatorApi = inject(CreditSimulatorApiService);

  private unsubscribe$ = new Subject();

  skeleton = signal<boolean>(false);

  simulation = signal<any>({
    monto: 0,
    cuotas: 0,
    interes: 0,
    seguro: 0,
    cuota: 0,
    cuotaMes: 0,
  });

  arrayInput1: inputModel = {
    tooltip:false,
    labelExists: true,
    iconExists: false,
    width: '100%',
    decimal: true,
    name: '¿Cuánto necesitas?',
    placeholder: 'Monto',
    icon: 'fa-solid fa-envelope',
    controlName: 'monto',
    type: 'text',
    isEyeChange: false,
    errorIcon:false,
    validationSpecial: false,
    validations:[]
  };

  arrayEmpleadoSelect1: selectModel = {
    icon: 'fa-solid fa-file-contract',
    labelExists: true,
    iconExists: false,
    width: '100%',
    name: '¿En cuántas cuotas?',
    placeholder: 'Selecciona la cuota',
    controlName: 'cuota',
    selects: [
      {
        value: 1,
        name: '1',
      },
      {
        value: 2,
        name: '2',
      },
      {
        value: 3,
        name: '3',
      },
      {
        value: 4,
        name: '4',
      },
      {
        value: 5,
        name: '5',
      },
      {
        value: 6,
        name: '6',
      },
      {
        value: 7,
        name: '7',
      },
      {
        value: 8,
        name: '8',
      },
      {
        value: 9,
        name: '9',
      },
    ],
  };


  simulatorForm: FormGroup = this.fb.group({
    cuota: ['', [Validators.required]],
    monto: ['', [Validators.required]],
    slide: ['1', [Validators.required]],
  });

  ngOnInit(): void {
    this.updateSimulator();
    this.changeSlide();
    this.changeCuota();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  updateSimulator(){
    this.simulatorForm.valueChanges
    .pipe(
      tap(data => {
        const montoSimulador = data.monto;
        let cuotaSimulador = data.cuota

        if (montoSimulador && cuotaSimulador) {
          this.skeleton.set(true);
          this.simulator(montoSimulador,cuotaSimulador)
        }
      }),
      debounceTime(500),
      takeUntil(this.unsubscribe$)
    )
    .subscribe();
  }

  changeSlide(){
    this.simulatorForm.get('slide')!.valueChanges
    .pipe(
      tap(value => {
        this.simulatorForm.patchValue({
          cuota: value
        }, { emitEvent: false })
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe();
  }

  changeCuota(){
    this.simulatorForm.get('cuota')!.valueChanges
    .pipe(
      tap(value => {
        this.simulatorForm.patchValue({
          slide: value
        }, { emitEvent: false })
      }),
      takeUntil(this.unsubscribe$)
    )
    .subscribe();
  }

  getSimulation(){}

  simulator(monto: any, cuota: any) {
    this.credictSimulatorApi.getSimulator(monto, cuota)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(({data}) => {
        this.skeleton.set(false);
        this.simulation.set({
          monto: data.amount,
          cuotas: data.contributions,
          interes: data.interest,
          seguro: data.insurance,
          cuota: data.share_value,
          cuotaMes: data.total_fee,
        })
      })
  }

  // formatNumberWithPipe(number:number){
  //     let numberPipe = new CustomNumberPipe()
  //     return number != 0? numberPipe.transform(number):'...'
  // }

}
