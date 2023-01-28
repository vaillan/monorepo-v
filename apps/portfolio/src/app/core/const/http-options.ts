import { HttpHeaders, HttpParams } from "@angular/common/http";

const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'X-Requested-With': ' XMLHttpRequest' });
const params = new HttpParams();

export const Options = {
  params: params,
  reportProgress: true,
}