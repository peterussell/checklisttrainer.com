export const accounts = new sst.aws.Dynamo("accounts", {
  fields: {
    PK: 'string',
    SK: 'string',
  },
  primaryIndex: { hashKey: 'PK', rangeKey: 'SK' }
});
