# URL Hashing System

## Architecture Overview

This URL hashing and tracking system is designed to convert long URLs (with UTM parameters) into short, hashed URLs. The system uses AWS Lambda, API Gateway, DynamoDB, and S3 for serverless scalability and reliability. The generated hashed URLs will be privacy-aware, hiding sensitive tracking parameters and supporting single-use or limited-use cases.

### Components:
- **API Gateway**: Provides a REST API for shortening URLs and redirecting users.
- **Lambda Functions**: Implements core business logic for shortening URLs and redirecting based on hashed URLs.
- **DynamoDB**: Stores mappings of hashed URLs to original URLs, along with usage limits and expiration times.

### Key Features:
- **Privacy-Preserving Hashing**: The query parameters (such as UTM parameters) are not exposed in the shortened URL.
- **Click Tracking**: The system logs each click and tracks usage count.
- **Single/Multiple Use**: Supports single-use or limited-use URLs that expire after a certain number of uses or time.

---

## Instructions

1. Run `serverless deploy` to deploy the system on AWS.
2. Send a `POST` request to `/shorten-url` with the following JSON payload to shorten a URL:
```json
{
  "longUrl": "https://example.com?utm_source=newsletter",
  "usageLimit": 5,
  "expiration": "2024-12-31T23:59:59Z"
}