import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services/message.service';
import { OsService } from 'src/app/services/os.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { Validators, FormControl } from '@angular/forms';
import { ClienteService } from '../../../services/cliente.service';
import { Os } from 'src/app/models/os';
import { Cliente } from 'src/app/models/cliente';
import { Component, OnInit } from '@angular/core';
import { Tecnico } from 'src/app/models/tecnico';

@Component({
  selector: 'app-os-read',
  templateUrl: './os-read.component.html',
  styleUrls: ['./os-read.component.css']
})
export class OsReadComponent implements OnInit {

  clientes: Cliente[] = [];
  tecnicos: Tecnico[] = [];

  os: Os = {
    prioridade:  '',
    status:      '',
    titulo:      '',
    descricao:   '',
    tecnico:     '',
    cliente:     '',
    nomeCliente: '',
    nomeTecnico: '',
  }

  constructor(
    private clienteService: ClienteService,
    private tecnicoService: TecnicoService,
    private service:        OsService,
    private messageService: MessageService,
    private route:          ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.listarClientes();
    this.listarTecnicos();
    this.findById();
  }

  findById() {
    this.os.id = this.route.snapshot.paramMap.get('id');
    this.service.findById(this.os.id).subscribe(resposta => {
      this.os = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarClientes() {
    this.clienteService.findAll().subscribe(resposta => {
      this.clientes = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  listarTecnicos() {
    this.tecnicoService.findAll().subscribe(resposta => {
      this.tecnicos = resposta;
    }, err => {
      this.messageService.message(err.error.error);
    })
  }

  retornaStatus() {
    if(this.os.status == 0) {
      return 'ABERTO'
    }

    if(this.os.status == 1) {
      return 'ANDAMENTO'
    }
    return 'ENCERRADO'
  }

  retornaPrioridade() {
    if(this.os.prioridade == 0) {
      return 'BAIXA'
    }
    
    if(this.os.prioridade == 1) {
      return 'MÉDIA'
    }
    return 'ALTA'
  }

}
