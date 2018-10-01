
import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database'
import { Route } from './route.model';

@Injectable()
export class RouteProvider {

  routeList: AngularFireList<any>;
  routeList2: AngularFireList<any>;
  selectedRoute: Route = new Route();
  constructor(private firebase :AngularFireDatabase ) { }
 
  getData(){
    this.routeList = this.firebase.list('route');
    return this.routeList;
  }
  getDatabyKey(key: string){
    this.routeList = this.firebase.list('route/'+key);
    return this.routeList;
  }
 
 
 updateTrue(key : string){
    this.firebase.list('route').update(key,
      {
      isDelivered : true
      });
  }
 updateFalse(key : string){
    this.routeList.update(key,
      {
      isDelivered : false
      });
  }
 

}
