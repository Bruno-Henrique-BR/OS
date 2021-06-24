import { ClienteService } from '../../../services/cliente.service';
import { TecnicoService } from '../../../services/tecnico.service';
import { MessageService } from '../../../services/message.service';
import { OsService } from '../../../services/os.service';
import { Os } from './../../../models/os';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-os-list',
  templateUrl: './os-list.component.html',
  styleUrls: ['./os-list.component.css']
})
export class OsListComponent implements OnInit {

  oss: Os[] = [];

  os: Os

  displayedColumns: string[] = ['id', 'titulo', 'cliente', 'dataAbertura', 'prioridade', 'status', 'actions'];
  
  dataSource = new MatTableDataSource<Os>(this.oss);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service: OsService,
    private message: MessageService,
  ) { }

  ngOnInit(): void {
    this.findAll();
  }

  public findAll(): void {
    this.service.findAll().subscribe(response => {

      this.oss = response;
      this.dataSource = new MatTableDataSource<Os>(this.oss);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.message.message(err.error.error);
    })
  }

  prioridade(x : String) {
    if(x == '0')
      return 'BAIXA'
    else if (x =='1')
      return 'MÉDIA'
    else
      return 'ALTA'
  }

  status(x : String) {
    if(x == '0')
      return 'ABERTO'
    else if (x =='1')
      return 'ANDAMENTO'
    else
      return 'ENCERRADO'
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
