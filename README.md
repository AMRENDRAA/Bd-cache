
// Demostrate the in memory caching using js

//Future will use redis caching


Cache Miss

Data not found.
Need API call.
-------------------
Cache Hit
Data already exists.
Return instantly.

1. Request comes
2. Check cache first
3. If cache hit → return cached data
4. If cache miss → call external API
5. Store fresh response in cache
6. Return response to client
