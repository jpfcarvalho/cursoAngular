import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.css']
})
export class ErrorMsgComponent implements OnInit {

  //@Input() mostrarErro: boolean;
  //@Input() msgErro: string;
  @Input() label: string

  @Input() control: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage(){

    for (const propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }

}
