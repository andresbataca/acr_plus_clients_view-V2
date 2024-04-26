import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, Input, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { selectModel } from '../../../core/models/select.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() form!: FormGroup;
  @Input() arraySelect!: selectModel;
  @Input() inputControlName!: string;

  private  host = inject(ElementRef<HTMLElement>)


  ngOnInit() {
    const host = this.host.nativeElement;
    host.style.setProperty('--width', this.arraySelect.width  ?? '100%');
  }

  mostrarMensaje = false;
  tooltipTop = '0px';
  tooltipLeft = '0px';

  onMouseMove(event: MouseEvent) {
    this.mostrarMensaje = true;
    const x = event.clientX;
    const y = event.clientY;
    this.tooltipTop = (y + 15) + 'px';
    this.tooltipLeft = (x + 15) + 'px';
  }

  onMouseOut(){
    this.mostrarMensaje = false;
  }
 }
