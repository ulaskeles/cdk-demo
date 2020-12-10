import { App, Stack, StackProps } from '@aws-cdk/core';
import { Code, Function, LayerVersion, Runtime } from '@aws-cdk/aws-lambda';
import { LambdaRestApi } from '@aws-cdk/aws-apigateway';
import { HitCounter } from './hitcounter';
import { TableViewer } from 'cdk-dynamo-table-viewer';

export class CdkWorkshopStack extends Stack {
  constructor(scope: App, id: string, props?: StackProps) {
    super(scope, id, props);


    // pack all external deps in layer
    const lambdaLayer = new LayerVersion(this, 'HandlerLayer', {
      // code: Code.fromAsset(resolve(__dirname, '../api/node_modules')),
      code: Code.fromAsset('./api/node_modules'),
      compatibleRuntimes: [Runtime.NODEJS_12_X],
      description: 'Api Handler Dependencies',
    });

    const hello = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_12_X,
      code: Code.fromAsset('./api', {
        // exclude: ['node_modules'],
      }),
      layers: [lambdaLayer],
      handler: 'dist/main.api'
    });

    // const hello = new Function(this, 'HelloHandler', {
    //   runtime: Runtime.NODEJS_12_X,
    //   code: Code.fromAsset('lambda'),
    //   handler: 'hello.handler'
    // });

    const helloWithCounter = new HitCounter(this, 'HelloHitCounter', {
      downstream: hello
    });

    // defines an API Gateway REST API resource backed by our "hello" function.
    new LambdaRestApi(this, 'Endpoint', {
      handler: helloWithCounter.handler
    });

    new TableViewer(this, 'ViewHitCounter', {
      title: 'Hello Hits',
      table: helloWithCounter.table
    });
  }
}