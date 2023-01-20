import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { KdfOpensearchStack } from '../lib/kdf-opensearch-stack';

//rudimentary test to ensure the stack is created
describe('Stack', () => {
  test('creates an OpenSearch domain and a Kinesis Data Firehose delivery stream with the correct outputs', () => {
    // Create the stack
    const app = new App();
    let appName = 'test-app';
    let indexName = 'test-index';
    let kdfDeliveryStreamOutputName = `${appName}-kdf-delivery-stream`;
    let opensearchDomainName = `${appName}-opensearch-domain`;

    const stack = new KdfOpensearchStack(app, 'KdfOpensearchStack', {
      appName,
      indexName,
    });
    const template = Template.fromStack(stack);
    console.log(template.toJSON());

    // Verify that delivery stream and domain are created
    template.hasResourceProperties('AWS::OpenSearchService::Domain', {
      DomainName: `${appName}-opensearch-domain`,
    });

    template.hasResourceProperties('AWS::KinesisFirehose::DeliveryStream', {
      AmazonopensearchserviceDestinationConfiguration: {
        IndexName: indexName,
      },
    });

    //test outputs are created
    [
      `${kdfDeliveryStreamOutputName}Name`,
      `${kdfDeliveryStreamOutputName}Arn`,
      `${opensearchDomainName}Name`,
      `${opensearchDomainName}Arn`,
      `${opensearchDomainName}Endpoint`,
    ]
      .map((x) => x.replace(/-/g, ''))
      .map((x) => template.hasOutput(x, {}));
  });
});
