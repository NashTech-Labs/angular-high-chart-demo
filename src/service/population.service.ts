import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PopulationService {

  private dataUrl = '/assets/population.json';

  constructor(private http: HttpClient) { }

  getPopulationData(): Observable<any[]> {
    return this.http.get<any[]>(this.dataUrl);
  }
}
