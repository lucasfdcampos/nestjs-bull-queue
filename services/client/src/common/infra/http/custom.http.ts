import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig } from 'axios';
import { HttpException, Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
@Injectable()
export class CustomHttp {
  constructor(private readonly httpService: HttpService) {}
  /**
   * @description
   * This method is used to make http requests externally and between services,
   *  and takes an AxiosRequestConfig object as a parameter. 
   * Some fields of this object are required, as shown in the example below.
   * 
   * 
   * 
   * @example
   * const data = await this.customHttp.request({
      method: 'POST', //required [POST, GET, PUT, DELETE, PATCH]
      url: 'http://url/api/endpoint', //required
      data: {
        email: 'email@email.com',
        name: 'First LastName',
      }, //optional
    });
   
   * @returns A promise with the endpoint return
   */

  async request(config: AxiosRequestConfig): Promise<any> {
    if (!config.url) {
      throw new Error('Url is required');
    }
    if (!config.method) {
      throw new Error('HTTP method is required');
    }

    try {
      const response = await firstValueFrom(this.httpService.request(config));
      return response;
    } catch (error) {
      if (error.response && error.response.data && error.response.data.errors) {
        throw new HttpException(
          error.response.data.errors.title,
          error.response.status,
        );
      } else {
        throw new Error(error);
      }
    }
  }
}
