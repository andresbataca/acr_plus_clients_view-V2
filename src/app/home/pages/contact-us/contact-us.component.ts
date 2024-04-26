import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { environments } from '../../../../environments/environments.develoment';
import { AuthService } from '../../../auth/services/auth.service';
import { inputModel } from '../../../core/models/input.model';
import { modalModel } from '../../../core/models/modal.model';
import { selectModel } from '../../../core/models/select.model';
import { ApiPostService } from '../../../core/services/api-post.service';
import { ModalService } from '../../../shared/components/modal/modal.service';
import { CardInfoComponent } from '../../../shared/components/card-info/card-info.component';
import { InputComponent } from '../../../shared/components/input/input.component';
import { SelectComponent } from '../../../shared/components/select/select.component';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    CommonModule,
    CardInfoComponent,
    InputComponent,
    SelectComponent,
    ReactiveFormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {
  private fb = inject(FormBuilder);
  private apiPost = inject(ApiPostService);
  private modalService = inject(ModalService);

  private baseUrl: string = environments.baseUrl;
  private unsubscribe$ = new Subject();

  contactForm!: FormGroup;

  cardCont: any = {
    icon: 'fa-brands fa-whatsapp',
    coloricon: 'rgb(181, 215, 124)',
    title: 'Whatsapp',
    body: ' Lun - Vie: 8:00am 5:pm Sabado 9:00am - 12:00am',
    footer: 'Contactanos',
    onMethodAction: () => {
      const googleMapsUrl = `https://api.whatsapp.com/send?phone=573207889090`;
      window.open(googleMapsUrl, "_blank");
    }
  }

  cardEmail: any = {
    icon: 'fa-regular fa-envelope',
    coloricon: 'rgb(255, 165, 52)',
    title: 'Correo',
    body: 'Escríbenos, el área de servicio al cliente estará lista para ti.',
    footer: 'Escribe',
    onMethodAction: () => {

    }
  }

  cardTel: any = {
    icon: 'fa-solid fa-square-phone',
    coloricon: 'rgb(113, 144, 209)',
    title: 'Teléfono',
    body: 'Tenemos un grupo humano presto a ayudarte',
    footer: 'Llamanos',
    onMethodAction: () => {
      const googleMapsUrl = `https://creditoacr.com/contacto/#oculto1`;
      window.open(googleMapsUrl, "_blank");
    }
  }

  cardInst: any = {
    icon: 'fa-solid fa-house-laptop',
    coloricon: 'var(--primary-color-neutro)',
    title: 'Instalaciones',
    body: 'Visítanos en nuestra sede, será un gusto atenderte',
    footer: 'Visitanos',
    onMethodAction: () => {
      const direccion = "Carrera 31 NO. 29-77 Palmira, Valle";
      const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}`;
      window.open(googleMapsUrl, "_blank");
    }
  }


  arraySelect1: selectModel = {
    tooltip: false,
    iconExists: false,
    icon: 'fa-solid fa-file-circle-question',
    labelExists: false,
    name: 'PQRS',
    placeholder: 'PQRS',
    controlName: 'PQRS',
    selects: [
      {
        value: 1,
        name: 'Petición',
      },
      {
        value: 2,
        name: 'Quejas',
      },
      {
        value: 3,
        name: 'Reclamos',
      },
      {
        value: 4,
        name: 'Solicitudes',
      },
      {
        value: 5,
        name: 'Felicitaciones',
      },
    ],
  };

  arrayInput1: inputModel = {
    tooltip: false,
    labelExists: false,
    decimal: false,
    name: 'Nombre',
    placeholder: 'Nombre',
    icon: 'fa-solid fa-user',
    controlName: 'name',
    type: 'text',
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  arrayInput3: inputModel = {
    tooltip: false,
    labelExists: false,
    decimal: false,
    name: 'Correo',
    placeholder: 'Correo',
    icon: 'fa-solid fa-envelope',
    controlName: 'correo',
    type: 'text',
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  arrayInput4: inputModel = {
    tooltip: false,
    labelExists: false,
    decimal: false,
    name: 'Numero de contacto',
    placeholder: 'Número de contacto',
    icon: 'fa-solid fa-square-phone',
    controlName: 'contact',
    type: 'text',
    iconExists: false,
    width: '',
    isEyeChange: false,
    errorIcon: false,
    validationSpecial: false,
    validations: []
  };

  contactFormInit(): FormGroup {
    return this.fb.group({
      PQRS: ['', [Validators.required],],
      name: ['', [Validators.required],],
      correo: ['', [Validators.required]],
      contact: ['', [Validators.required]],
      msg: ['', [Validators.required]],
    });
  }


  ngOnInit(): void {
    this.contactForm = this.contactFormInit();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  getSubmit() {
    const formData = this.contactForm.getRawValue();
    const UrlApi = `${this.baseUrl}/api/app/contact_us`;

    const paramsBody = {
      name: formData.name,
      mobile: formData.contact,
      email: formData.correo,
      description: formData.msg,
      id_type_description: formData.PQRS
    };

    this.apiPost.getDebtInfo(UrlApi, paramsBody)
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next:(resp)=>{
            const newModalData: modalModel = {
              viewModal: true,
              clickOutside: true,
              title: 'Atención',
              colorIcon: 'green',
              icon: 'fa-solid fa-triangle-exclamation',
              message: 'Muchas gracias por contactarte con nosotros. Estaremos revisando tu mensaje y en breve nos pondremos en contacto contigo.',
              onMethod: () => {
                newModalData.viewModal = false;
              },
              isThereaButton2: false,
              onMethodAction: () => {
              },
              loader: false,
              buttonText: 'Cerrar',
            };

            this.modalService.setArray(newModalData);
        }
      })

  }

}
