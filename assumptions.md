# Assumptions

1. The generated URL hashes are unique and the system prevents collisions.
2. Usage limits and expiration dates are optional but are recommended for better control.
3. No Personally Identifiable Information (PII) is stored in DynamoDB, ensuring privacy.
4. The DynamoDB `PAY_PER_REQUEST` mode is used to ensure that costs are only incurred when the service is accessed.
5. AWS services remain within the free tier for the initial period of deployment and usage.