import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UtilitiesService } from '../../../core/services/utilities.service';
import { inputModel } from '../../../core/models/input.model';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() form!: FormGroup;
  @Input() arrayInput!: inputModel;
  puntoAgregadoPorFuncion: boolean = false;

  private  host = inject(ElementRef<HTMLElement>)

  constructor(private utilities: UtilitiesService){}

  ngOnInit(): void {
    const host = this.host.nativeElement;
    host.style.setProperty('--width', this.arrayInput.width  ?? '100%');
  }

  formatoNumerico(event: any) {
    // Obtener el valor actual del input
    let numero = event.target.value;

     // Validar que solo contenga números y el punto decimal
     const numerosYDecimalValidos = /^[0-9.]*$/;
     if (!numerosYDecimalValidos.test(numero)) {
       // Si no contiene números o el punto decimal, elimina el contenido no válido
       this.form.get(this.arrayInput.controlName)?.patchValue(numero.replace(/[^0-9.]/g, ''));
       return;
     }

    // Aplicar el formato de miles y millones
    let numeroFormateado = this.utilities.formatoMilesMillones(numero);

    this.form.get(this.arrayInput.controlName)?.patchValue(numeroFormateado);

  }

  onlyNumbers(event: any){
    // Obtener el valor actual del input
    let numero = event.target.value;

    //Validar que solo contenga números, el punto decimal, espacios y paréntesis
    const numerosYDecimalValidos = /^[0-9 .()+]*$/;
    if (!numerosYDecimalValidos.test(numero)) {
      // Si no contiene números o el punto decimal, elimina el contenido no válido
      this.form.get(this.arrayInput.controlName)?.patchValue(numero.replace(/[^0-9 .()+]/g, ''));
      return
    }

  }

  mostrarMensaje = false;

  onMouseMove() {
    this.mostrarMensaje = true;
  }

  onMouseOut(){
    this.mostrarMensaje = false;
  }

  eyeChange(){
    this.arrayInput.isEyeChange = !this.arrayInput.isEyeChange;
  }

  dataFormValids() {
    const control = this.form.get(this.arrayInput.controlName);
    if (!control) return false;

    return this.arrayInput.validations.some(validation => {
      const errorKey = validation.validErrors;
      return control.dirty && control.errors?.[errorKey];
    });
  }
 }
