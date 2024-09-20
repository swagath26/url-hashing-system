
---

### `setup.md` (Deployment and Usage Instructions)

```markdown
# Setup and Deployment

## Prerequisites

- Node.js and npm installed
- AWS account and AWS CLI configured
- Serverless Framework installed (`npm install -g serverless`)

## Steps to Deploy

1. **Install Dependencies**:
    ```bash
    npm install
    ```

2. **Deploy to AWS**:
    ```bash
    serverless deploy
    ```

3. **Testing the API**:
    You can use `curl` or Postman to test the API. Example:

    ```bash
    curl -X POST https://<API_ID>.execute-api.<region>.amazonaws.com/dev/shorten-url \
        -H "Content-Type: application/json" \
        -d '{"longUrl": "https://example.com?utm_source=test", "usageLimit": 1}'
    ```

4. **Checking Logs**:
    Use the Serverless CLI to check Lambda logs:
    ```bash
    serverless logs -f redirectUrl
    ```