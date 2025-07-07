import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TarjetaService } from '../services/tarjetas.service';

@Component({
  selector: 'app-tarjetas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tarjetas.components.html',
  styleUrls: ['./tarjetas.components.scss']
})
export class TarjetasComponent implements OnInit {
  tarjetas: any[] = [];
  form: any = { title: '', description: '' };
  editing = false;
  editId: number | null = null;

  constructor(private tarjetaService: TarjetaService) {}

ngOnInit(): void {
  console.log("El componente Tarjetas se ha cargado");
  this.loadTarjetas();
}


  loadTarjetas() {
  this.tarjetaService.getTarjetas().subscribe({
    next: (res: any) => {
      console.log("Tarjetas recibidas desde el backend:", res);
      this.tarjetas = res;
    },
    error: (err) => {
      console.error("Error al cargar tarjetas:", err);
    }
  });
}

  save() {
    if (this.editing) {
      this.tarjetaService.updateTarjeta(this.editId!, this.form).subscribe(() => {
        this.reset();
        this.loadTarjetas();
      });
    } else {
      this.tarjetaService.createTarjeta(this.form).subscribe(() => {
        this.reset();
        this.loadTarjetas();
      });
    }
  }

  edit(tarjeta: any) {
    this.form = { title: tarjeta.title, description: tarjeta.description };
    this.editing = true;
    this.editId = tarjeta.id;
  }

  delete(id: number) {
    this.tarjetaService.deleteTarjeta(id).subscribe(() => this.loadTarjetas());
  }

  reset() {
    this.form = { title: '', description: '' };
    this.editing = false;
    this.editId = null;
  }

  
}
