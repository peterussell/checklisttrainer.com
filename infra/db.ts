export const accounts = new sst.aws.Dynamo("accounts", {
  fields: {
    PK: 'string',
    SK: 'string',
  },
  primaryIndex: { hashKey: 'PK', rangeKey: 'SK' }
});

export const aircraft = new sst.aws.Dynamo("aircraft", {
  fields: {
    PK: 'string',
    SK: 'string'
  },
  primaryIndex: { hashKey: 'PK', rangeKey: 'SK' }
});
