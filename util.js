const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

const TableName = process.env.DYNAMODB_TABLE;

// Store URL data in DynamoDB
module.exports.storeUrlData = async (urlData) => {
  const params = {
    TableName,
    Item: urlData,
  };

  return dynamoDb.put(params).promise();
};

// Retrieve original URL from DynamoDB
module.exports.getOriginalUrl = async (hash) => {
  const params = {
    TableName,
    Key: { hash },
  };

  const result = await dynamoDb.get(params).promise();
  return result.Item;
};

// Log the click and increment usage count
module.exports.logClick = async (hash) => {
  const params = {
    TableName,
    Key: { hash },
    UpdateExpression: 'SET usageCount = usageCount + :inc',
    ExpressionAttributeValues: {
      ':inc': 1,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  return dynamoDb.update(params).promise();
};