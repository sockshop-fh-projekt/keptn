import * as express from 'express';
import { inject, injectable } from 'inversify';
import {
  controller,
  httpGet,
  httpPost,
  interfaces,
} from 'inversify-express-utils';
import 'reflect-metadata';
import {
  ApiOperationGet,
  ApiOperationPost,
  ApiPath,
  SwaggerDefinitionConstant,
} from 'swagger-express-ts';
import { ConfigRequestModel } from './ConfigRequestModel';
import { CredentialsService } from '../service/CredentialsService';

@ApiPath({
  name: 'Config',
  path: '/config',
  security: { apiKeyHeader: [] },
})
@controller('/config')
export class ConfigController implements interfaces.Controller {
  constructor() { }

  @ApiOperationPost({
    description: 'Set Github credentials for keptn',
    parameters: {
      body: {
        description: 'Github Credentials',
        model: 'ConfigRequestModel',
        required: true,
      },
    },
    responses: {
      200: {
      },
      400: { description: 'Parameters fail' },
    },
    summary: 'Set Github credentials for keptn',
  })
  @httpPost('/')
  public async setGithubConfig(
    request: express.Request,
    response: express.Response,
    next: express.NextFunction,
  ): Promise<void> {
    const credentialsService = CredentialsService.getInstance();
    try {
      await credentialsService.updateGithubConfig(request.body.data);
    } catch (e) {
      console.log(e);
    }
    response.send({ status: 'OK' });
  }
}