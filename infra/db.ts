export const aircraft = new sst.aws.Dynamo("aircraft", {
  fields: {
    id: 'string',
  },
  primaryIndex: { hashKey: 'id' }
});
