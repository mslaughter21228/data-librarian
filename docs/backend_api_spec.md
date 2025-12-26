# Backend API Specifications

This document outlines the required API endpoints for the Data Librarian Python Backend. These endpoints support the "Head Librarian" frontend architecture.

## Global Requirements
*   **Method**: All state-changing or complex queries should use `POST` (Body) to avoid URL length limits and enhance security. Simple status checks can be `GET`.
*   **Format**: JSON Request/Response.
*   **Error Handling**: Return HTTP 4xx/5xx codes, but always include a JSON body: `{ "success": false, "error": "Description" }`.

## 1. Library Management (`/api/library`)
**Purpose**: List files and directories. STRICT Sandboxing required.

*   **Method**: `POST`
*   **Request Body**:
    ```json
    {
      "path": "relative/path/from/root"
    }
    ```
*   **Security**:
    *   Validate `path` against directory traversal (`../`).
    *   Ensure resolved path is within `DataLibrarian.server.root_path`.
*   **Response**:
    ```json
    {
      "success": true,
      "data": [
        {
          "name": "MyFolder",
          "path": "relative/path/MyFolder",
          "type": "directory",
          "created": "YYYY-MM-DD...",
          "modified": "YYYY-MM-DD..."
        },
        {
          "name": "file.txt",
          "path": "relative/path/file.txt",
          "type": "file",
          "size": "10 MB",
          "created": "...",
          "modified": "..."
        }
      ]
    }
    ```

## 2. Configuration (`/api/config`)
**Purpose**: Read and Write runtime configuration.

*   **Method**: `GET`
    *   **Response**: Full `config.json` content.
*   **Method**: `POST`
    *   **Body**: Partial or full config object to update.
    *   **Response**: `{ "success": true, "data": { ...new_config } }`

## 3. System Status (`/api/status`)
**Purpose**: Polling for module status (Weeding, Segmenting).

*   **Method**: `GET`
*   **Query Params**: `?module=weeding` or `?module=server`
*   **Response**:
    ```json
    {
      "success": true,
      "data": {
        "status": "idle|running|error",
        "progress": 45,
        "message": "Processing file 10 of 20..."
      }
    }
    ```

## 4. Module Actions (`/api/action`)
**Purpose**: Trigger commands (Start, Stop, Scan).

*   **Method**: `POST`
*   **Body**:
    ```json
    {
      "target": "weeding",
      "command": "start",
      "inputs": { "dryRun": true }
    }
    ```
*   **Response**: `{ "success": true, "message": "Module started" }`
