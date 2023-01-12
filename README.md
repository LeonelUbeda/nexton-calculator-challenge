# Project Title

Nexton Full Stack challenge

## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

The server will start at port `8000`

To change default port, use environment variable `PORT`

## Usage/Examples

To use the calculator, send a `POST` request to `/calculator` endpoint
with the following body

```json
{
  "input": "10 * (2 + 5) * 10 "
}
```

The response should look like this

```json
{
  "output": 700
}
```

In case of error:

```json
{
  "error": "Input error"
}
```
