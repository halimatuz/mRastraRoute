
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Gudang } from './gudang.model';
/*
  Generated class for the GudangProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GudangProvider {

  gudangList: AngularFireList<any>;
  selectedGudang: Gudang = new Gudang();
  

  constructor(private firebase :AngularFireDatabase ) {
   
   }

  getData(){
    this.gudangList = this.firebase.list('gudang');
    return this.gudangList;
  }
 
  insertEmployee(employee : Gudang)
  {
    if(!this.gudangList){
      this.gudangList = this.getData();
    }
    this.gudangList.push({
      namaGudang: employee.namaGudang,
      kapasitas: employee.kapasitas,
      stok: employee.stok
    });
  }
  updateEmployee(employee : Gudang){
    this.gudangList.update(employee.$key,
      {
      kapasitas: employee.kapasitas,
      stok: employee.stok
      });
  }
 
  deleteEmployee($key : string){
    this.gudangList.remove($key);
  }
 
  

}
