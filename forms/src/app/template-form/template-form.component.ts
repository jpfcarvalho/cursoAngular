import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  usuario: any = {
    nome: null,
    email: null
  }

  onSubmit(form){
    console.log(form);
    this.http.post('https://httpbin.org/post', JSON.stringify(form.value)).subscribe(dados => console.log(dados));
  }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  verificaValidTouched(campo){
    return !campo.valid && campo.touched;
  }
  aplicaCssErro(campo){
    if (this.verificaValidTouched(campo)) {
      return {'form-control is-invalid': this.verificaValidTouched(campo)};
    }
    return {'form-control': !this.verificaValidTouched(campo)};
  }

  consultaCEP(cep, form){
    cep = cep.replace(/\D/g, '');
    if (cep != "") {
      var validarcep = /^[0-9]{8}$/;
      if (validarcep.test(cep)) {
        this.resetaDadosForm(form);
        this.http.get(`//viacep.com.br/ws/${cep}/json/`).subscribe(dados => this.populaDadosForm(dados, form));
      }
    }
  }

  populaDadosForm(dados, form){
    // form.setValue({
    //   nome: form.value.nome,
    //   email: form.value.email,
    //   endereco: {
    //     cidade: dados.localidade,
    //     cep: dados.cep,
    //     numero: '',
    //     complemento: '',
    //     lougradouro: dados.logradouro,
    //     bairro: dados.bairro,
    //     estado: dados.uf
    //   }
    // });
    form.form.patchValue({
      endereco: {
        cidade: dados.localidade,
        cep: dados.cep,
        lougradouro: dados.logradouro,
        bairro: dados.bairro,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm(form){
    form.form.patchValue({
      endereco: {
        cidade: null,
        cep: null,
        lougradouro: null,
        bairro: null,
        estado: null
      }
    });
  }

}
