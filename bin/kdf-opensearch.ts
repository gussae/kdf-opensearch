#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { KdfOpensearchStack } from '../lib/kdf-opensearch-stack';

const app = new cdk.App();
new KdfOpensearchStack(app, 'KdfOpensearchStack', {
 appName: "test",
 indexName: "test-kdf-opensearch",
});