import { VerificaEmailService } from './services/verifica-email.service';
import { empty, Observable } from 'rxjs';
import { ConsultaCepService } from './../shared/services/consulta-cep.service';
import { EstadoBr } from './../shared/models/estado-br.model';
import { DropdownService } from './../shared/services/dropdown.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { FormValidations } from '../shared/form-validations';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.css']
})
export class DataFormComponent implements OnInit {


  formulario: FormGroup;

  //estados: EstadoBr[];
  estados: Observable<EstadoBr[]>;
  cargos: any[];
  tecnologias: any[];
  newsletterOp: any[];

  frameworks = ['Angular', 'React', 'vue', 'sencha'];

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropdownService: DropdownService,
    private cepService: ConsultaCepService,
    private verificaEmailService: VerificaEmailService
  ) { }

  ngOnInit(): void {

    //this.verificaEmailService.verificarEmail('').subscribe();

    this.estados = this.dropdownService.getEstadosBr();

    this.cargos = this.dropdownService.getCargos();

    this.tecnologias = this.dropdownService.getTecnologias();

    this.newsletterOp = this.dropdownService.getNewsletter();

    // this.dropdownService.getEstadosBr().subscribe(dados => this.estados = dados);
    // this.formulario = new FormGroup({
    //   nome: new FormControl(null),
    //   email: new FormControl(null)
    // });
    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: [null, [Validators.required, Validators.email], this.validarEmail.bind(this)],
      confirmarEmail: [null, [FormValidations.equalsTo('email')]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidations.cepValidator]],
        numero: [null, Validators.required],
        logradouro: [null, Validators.required],
        complemento:[null],
        bairro: [null, Validators.required],
        cidade: [null, Validators.required],
        estado: [null, Validators.required]
      }),
      cargo: [null],
      tecnologias: [null],
      newsletter: ['s'],
      termos: [null, Validators.pattern('true')],
      frameworks: this.buildFrameworks()
    });

    this.formulario.get('endereco.cep').statusChanges.pipe(
      distinctUntilChanged(),
      tap(value => console.log('Status CEP:', value)),
      switchMap(status => status === 'VALID' ? this.cepService.consultaCEP(this.formulario.get('endereco.cep').value) : empty() )
    ).subscribe(dados => dados ? this.populaDadosForm(dados) : {});

  }

  buildFrameworks(){
    console.log(this.formulario);
    let values = this.frameworks.map(v => new FormControl(false));

    return this.formBuilder.array(values, FormValidations.requiredMinCheckbox(1));
  }

  onSubmit(){

    let valueSubmit = Object.assign({}, this.formulario.value);

    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks.map((v, i) => v ? this.frameworks[i] : null).filter(v => v !== null)
    })

    console.log(valueSubmit);

    if (this.formulario.valid) {
      this.http.post('https:/httpbin.org/post', JSON.stringify(valueSubmit)).subscribe(dados => {
        console.log(dados);
        //reseta o form
        this.resetar();
      }, (error: any) => alert('erro'));
    } else {
      this.verificaValidacoesForm(this.formulario);
    }
  }

  verificaValidacoesForm(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(campo =>{
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificaValidacoesForm(controle);
      }
    });
  }

  resetar(){
    this.formulario.reset();
  }

  verificaValidTouched(campo){
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  aplicaCssErro(campo){
    if (this.verificaValidTouched(campo)) {
      return {'form-control is-invalid': this.verificaValidTouched(campo)};
    }
    return {'form-control': !this.verificaValidTouched(campo)};
  }

  consultaCEP(){

    let cep = this.formulario.get('endereco.cep').value;
    if (cep != null && cep !== '') {
      this.cepService.consultaCEP(cep).subscribe(dados => this.populaDadosForm(dados));
    }
  }

  populaDadosForm(dados){
    this.formulario.patchValue({
      endereco: {
        cidade: dados.localidade,
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        estado: dados.uf
      }
    });

  }

  resetaDadosForm(){
    this.formulario.patchValue({
      endereco: {
        cidade: null,
        cep: null,
        lougradouro: null,
        bairro: null,
        estado: null
      }
    });
  }

  setarCargo(){
    const cargo = {nome: 'Dev', nivel: 'Pleno', desc: 'Dev Pl'};
    this.formulario.get('cargo').setValue(cargo);
  }

  compararCargos(obj1, obj2){
    return obj1 && obj2 ? (obj1.nome === obj2.nome && obj1.nivel === obj2.nivel) : obj1 === obj2;
  }

  setarTecnologias(){
    this.formulario.get('tecnologias').setValue(['java', 'php']);
  }

  validarEmail(formControl: FormControl){
    return this.verificaEmailService.verificarEmail(formControl.value).pipe(map(emailExiste => emailExiste ? {emailInvalido: true} : null));
  }

}
