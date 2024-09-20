const AWS = require('aws-sdk');
const crypto = require('crypto');
const { getOriginalUrl, logClick, storeUrlData } = require('./utils');

const dynamoDb = new AWS.DynamoDB.DocumentClient();

// Shorten URL Handler
module.exports.shortenUrl = async (event) => {
  const { longUrl, usageLimit, expiration } = JSON.parse(event.body);

  if (!longUrl) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'longUrl is required' }),
    };
  }

  // Generate a hash for the URL
  const hash = crypto.createHash('sha256').update(longUrl).digest('base64url').substring(0, 8);

  // Store the URL data in DynamoDB
  const urlData = {
    longUrl,
    usageLimit: usageLimit || 1, // Default to single-use
    expiration: expiration || null, // Optional expiration
    usageCount: 0,
    hash,
  };
  await storeUrlData(urlData);

  return {
    statusCode: 200,
    body: JSON.stringify({
      shortUrl: `${event.headers.Host}/${hash}`,
    }),
  };
};

// Redirect URL Handler
module.exports.redirectUrl = async (event) => {
  const { hash } = event.pathParameters;

  // Retrieve the original URL from DynamoDB
  const urlData = await getOriginalUrl(hash);
  if (!urlData || urlData.usageCount >= urlData.usageLimit || (urlData.expiration && new Date() > new Date(urlData.expiration))) {
    return {
      statusCode: 404,
      body: 'URL not found or expired',
    };
  }

  // Log the click and increment the usage count
  await logClick(hash);

  return {
    statusCode: 302,
    headers: {
      Location: urlData.longUrl,
    },
  };
};