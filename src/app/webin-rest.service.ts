import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class WebinRestService {

  // https://stackoverflow.com/questions/46059226/upload-image-with-httpclient

  private webinRestServiceUrl = 'https://www-test.ebi.ac.uk/ena/submit/drop-box/submit/';

  // TODO
  username: string = 'lbower@ebi.ac.uk';
  password: string = 'sausages';

  constructor(private http: HttpClient) { }

    public async submitSpreadsheet(file: File): Promise<void> {

      const headers = new HttpHeaders()
        .append('Content-Type', 'multipart/form-data')
        .append("Authorization", "Basic " + btoa(this.username + ':' + this.password))
        .append("Content-Type", "application/x-www-form-urlencoded");

      const formData: FormData = new FormData();
      formData.append('SPREADSHEET', file, file.name);

      const response: HttpResponse<any> = await this.http
        .post(this.webinRestServiceUrl, formData, { headers, observe: 'response' })
        .toPromise();

      console.log(response.status);
    }
}
